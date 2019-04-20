import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Select, Modal, Radio, Button, Icon,
} from 'choerodon-ui';
import { Content, stores } from 'choerodon-front-boot';
import { find } from 'lodash';
import SelectFocusLoad from '../SelectFocusLoad';
// import WYSIWYGEditor from '../WYSIWYGEditor';
// import FullEditor from '../FullEditor';
// import UploadControl from '../UploadControl';
import SelectNumber from '../SelectNumber';
import {
  createIssue, getPrioritys,
} from '@/api/AgileApi';
// import { handleFileUpload, getProjectId, beforeTextUpload } from '../../common/utils';

const FormItem = Form.Item;
const { Sidebar } = Modal;
const { Option } = Select;
const RadioGroup = Radio.Group;
const defaultProps = {

};

const propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
};
const { AppState } = stores;
@Form.create()
class CreateIssue extends Component {
  handleOk = () => {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          type, name, priorityId, statusId, handlerId,
        } = values;
       
        const issueObj = {          
          type,     
          name,
          priorityId,
          statusId,
          handlerId,
          reporterId: AppState.userInfo.id,
        }; 
        this.handleCreateIssue(issueObj);        
      }
    });
  }

  handleCreateIssue = (issueObj) => {
    const { onCreate } = this.props;
    createIssue(issueObj).then((res) => {        
      if (onCreate) {
        onCreate();
      }
    }).catch((error) => {
      console.log(error);     
    });
  }

  handleTypesLoaded=(issueTypes) => {
    const { form } = this.props;
    const defaultType = find(issueTypes, { typeCode: 'feature' }).id;
    form.setFieldsValue({ issueTypeId: defaultType });
  }

  render() {
    const {
      visible, onCancel, loading, form, 
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Sidebar
        title="创建问题"
        visible={visible}
        onOk={this.handleOk}
        onCancel={onCancel}
        confirmLoading={loading}
        destroyOnClose
      >
        <Content
          style={{
            padding: '0 0 10px 0',
          }}
          title="在项目中创建问题"
          description="请在下面输入问题的详细信息，包含详细描述等等。您可以通过丰富的问题描述帮助相关人员更快更全面的理解任务，同时更好的把控问题进度。"
        >
          <Form>
            <FormItem>
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请选择类型',
                }],
              })(
                <Select label="类型" style={{ width: 500 }}>
                  <Option value={0}>敏捷</Option>
                  <Option value={1}>测试</Option>                 
                </Select>,
              )}
            </FormItem>         
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请选择名称',
                }],
              })(
                <Input style={{ width: 500 }} maxLength={30} label="名称" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('priorityId', {                
                rules: [{
                  required: true, message: '请选择优先级!',
                }],
                initialValue: 2,
              })(
                <Select label="优先级" style={{ width: 500 }}>
                  <Option value={1}>低</Option>
                  <Option value={2}>中</Option>
                  <Option value={3}>高</Option>
                </Select>,
              )}
            </FormItem>    
            <FormItem>
              {getFieldDecorator('statusId', {                
                rules: [{
                  required: true, message: '请选择状态!',
                }],
                initialValue: 1,
              })(
                <Select label="状态" style={{ width: 500 }}>
                  <Option value={1}>待处理</Option>
                  <Option value={2}>执行中</Option>
                  <Option value={3}>已完成</Option>
                  <Option value={4}>失败</Option>
                </Select>,
              )}
            </FormItem> 
            <FormItem>
              {getFieldDecorator('handlerId', {})(
                <SelectFocusLoad label="指定人" type="user" style={{ width: 500 }} />,
              )}
            </FormItem> 
          </Form>
        </Content>
      </Sidebar>
    );
  }
}

CreateIssue.propTypes = propTypes;
CreateIssue.defaultProps = defaultProps;


export default CreateIssue;
