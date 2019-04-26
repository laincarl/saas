import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Select, Modal, Radio, Button, Icon,
} from 'choerodon-ui';
import { Content, stores } from 'choerodon-front-boot';

import { createRepository } from '@/api/DevopsApi';

const FormItem = Form.Item;
const { Sidebar } = Modal;

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
class CreateRepository extends Component {
  handleOk = () => {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          project_name, gitlab_project_name,
        } = values;
       
        const repoObj = {          
          project_name, 
          gitlab_project_name,
          user_id: AppState.userInfo.id,
        }; 
        this.handleCreateRepository(repoObj);        
      }
    });
  }

  handleCreateRepository = (repoObj) => {
    const { onCreate } = this.props;
    createRepository(repoObj).then((res) => {        
      if (onCreate) {
        onCreate();
      }
    }).catch((error) => {
      console.log(error);     
    });
  }


  render() {
    const {
      visible, onCancel, loading, form, 
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Sidebar
        title="创建仓库"
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
          title="创建仓库"          
        >
          <Form>            
            <FormItem>
              {getFieldDecorator('project_name', {
                rules: [{
                  required: true, message: '请输入项目名称',
                }],
              })(
                <Input label="项目名称" style={{ width: 500 }} maxLength={30} />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('gitlab_project_name', {
                rules: [{
                  required: true, message: '请输入仓库名称',
                }],
              })(
                <Input label="仓库名称" style={{ width: 500 }} maxLength={30} />,
              )}
            </FormItem>
          </Form>
        </Content>
      </Sidebar>
    );
  }
}

CreateRepository.propTypes = propTypes;
CreateRepository.defaultProps = defaultProps;


export default CreateRepository;
