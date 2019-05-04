import React, { Component } from 'react';
import _ from 'lodash';
import {
  Modal, Form, Input, Select, Icon,
} from 'choerodon-ui';
import { stores, Content, axios } from 'choerodon-front-boot';
import {
  getRepositoryList, getBranchs, createBranch, getTags, 
} from '@/api/DevopsApi';
import {
  updateStatus, updateIssue,
  deleteIssue, loadStatus, cloneIssue,
} from '@/api/agileApi';
import './CreateBranch.scss';
import './commom.scss';

const { AppState } = stores;
const { Sidebar } = Modal;
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
const MAP = {
  bug: 'bugfix',
  task: 'feature',
  story: 'feature',
  issue_epic: 'feature',
  sub_task: 'feature',
};

class CreateBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: 'feature',
      // value: '',
      confirmLoading: false,
      selectLoading: true,
      branchLoading: true,
      originApps: [],
      branchs: [],
      // branchsShowMore: false,
      branchsInput: '',
      branchsSize: 5,
      branchsObj: {},
      tags: [],
      // tagsShowMore: false,
      tagsSize: 5,
      tagsObj: {},
    };
  }

  handleOk = (e) => {
    e.preventDefault();
    const { form, issue, onOk } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {        
        this.setState({
          confirmLoading: true,
        });
        updateIssue({
          ...issue,
          branchId: values.branch,
        }).then((res) => {
          this.setState({
            confirmLoading: false,
          });
          onOk();
        })
          .catch((error) => {
            this.setState({
              confirmLoading: false,
            });
          });
      }
    });
  };

  checkName =(rule, value, callback) => {
    // eslint-disable-next-line no-useless-escape
    const endWith = /(\/|\.|\.lock)$/;
    const contain = /(\s|~|\^|:|\?|\*|\[|\\|\.\.|@\{|\/{2,}){1}/;
    const single = /^@+$/;
    if (endWith.test(value)) {
      callback('不能以"/"、"."、".lock"结尾');
    } else if (contain.test(value) || single.test(value)) {
      callback('只能包含字母、数字、\'——\'、\'_\'');
    } else {
      callback();
    }
  };

  onApplicationNameChange = () => {
    // this.setState({ selectLoading: true });
    getRepositoryList().then((res) => {
      this.setState({
        originApps: res,
        selectLoading: false,
        branchLoading: true,
      });
    });
  };

  render() {
    const {
      visible, store, form, form: { getFieldDecorator },
      onCancel, issue: { name }, 
    } = this.props;
    const {
      confirmLoading, selectLoading, branchLoading,
      originApps, branchs, branchsObj, branchsSize,
      branchsInput, tags, tagsObj, tagsSize,
    } = this.state;
    return (
      <Sidebar
        className="c7n-createBranch"
        title="关联分支"
        visible={visible}
        onOk={this.handleOk}
        onCancel={onCancel}
        okText="关联"
        cancelText="取消"
        confirmLoading={confirmLoading}
      >
        <Content
          style={{
            padding: 0,
            width: 512,
          }}
          title={`对问题“${name}”关联分支`}
          description="您可以在此选择仓库、分支来源，即可为该问题创建关联的分支。"
          link="http://v0-10.choerodon.io/zh/docs/user-guide/agile/issue/manage-branch/"
        >
          <Form layout="vertical" className="c7n-sidebar-form">
            <div className="branch-formItem-icon">
              <span className="icon icon-widgets" />
            </div>
            <FormItem className="branch-formItem">
              {getFieldDecorator('app', {
                rules: [{ required: true, message: '请选择仓库' }],
              })(
                <Select
                  label="仓库名称"
                  allowClear
                  onFocus={this.onApplicationNameChange}
                  filter
                  optionFilterProp="children"
                  filterOption={
                    (input, option) => option.props.children.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  loading={selectLoading}
                >
                  {originApps.map(app => (
                    <Option value={app.id} key={app.id}>{app.name}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <div className="branch-formItem-icon">
              <span className="icon icon-wrap_text" />
            </div>
            <FormItem className="branch-formItem">
              {getFieldDecorator('branch', {
                rules: [{ required: true, message: '请选择分支' }],
              })(
                <Select
                  label="分支来源"
                  allowClear
                  disabled={!form.getFieldValue('app')}
                  filter
                  filterOption={false}            
                  loading={branchLoading}
                  onFilterChange={(input) => {
                    this.setState({
                      branchsInput: input,
                    });                    
                    getBranchs(form.getFieldValue('app')).then((res) => {
                      this.setState({
                        branchs: res,                     
                        branchLoading: false,
                      });
                    });
                    getTags(form.getFieldValue('app')).then((res) => {
                      this.setState({
                        tags: res,
                      });
                    });
                  }}
                >
                  <OptGroup label="分支" key="branchGroup">
                    {branchs.map(s => (
                      <Option value={s.id}>
                        <Icon type="branch" />
                        {s.name}
                      </Option>
                    ))}
                  </OptGroup>
                  <OptGroup label="tag" key="tagGroup">
                    {tags.map(s => (
                      <Option value={s.id}>
                        <Icon type="local_offer" />
                        {s.name}
                      </Option>
                    ))}
                  </OptGroup>
                </Select>,
              )}
            </FormItem>
            {/* 
            <div className="branch-formItem-icon">
              <span className="icon icon-branch" />
            </div>
            <FormItem className="c7n-formItem_180">
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择分支类型' }],
                initialValue: MAP[typeCode || 'task'],
              })(
                <Select
                  allowClear
                  label="分支类型"
                >
                  {['feature', 'bugfix', 'release', 'hotfix', 'custom'].map(s => (
                    <Option value={s} key={s}>
                      <span className={`c7n-branch-icon icon-${s === 'bugfix' ? 'develop' : s}`}>
                        {s.slice(0, 1).toUpperCase()}
                      </span>
                      <span>{s}</span>
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem className="c7n-formItem_281">
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: '请输入分支名称',
                }, {
                  validator: this.checkName,
                }],
                initialValue: issueNum,
              })(
                <Input
                  label="分支名称"
                  prefix={form.getFieldValue('type') === 'custom' || !form.getFieldValue('type') ? '' : `${form.getFieldValue('type')}-`}
                  maxLength={30}
                />,
              )}
            </FormItem> */}
          </Form>
        </Content>
      </Sidebar>
    );
  }
}
export default Form.create({})(CreateBranch);
