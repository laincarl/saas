import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Select, Modal,
} from 'choerodon-ui';
import { Content } from 'choerodon-front-boot';
import { createUser } from '@/api/IamApi';

const FormItem = Form.Item;
const { Sidebar } = Modal;
const { Option } = Select;

const defaultProps = {

};

const propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
};

@Form.create()
class CreateUser extends Component {
  handleOk = () => {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          type, name, email, password, mobile,
        } = values;

        const userObj = {
          type: Number(type), 
          name,
          email,
          password,
          mobile,

        };
        this.handleCreateUser(userObj);
      }
    });
  }

  handleCreateUser = (userObj) => {
    const { onCreate } = this.props;
    createUser(userObj).then((res) => {
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
        title="注册用户"
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
          title="在项目中注册用户"
        >
          <Form>
            <FormItem>
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请选择用户类型',
                }],
              })(
                <Select label="用户类型" style={{ width: 500 }}>
                  <Option value="0">开发人员</Option>
                  <Option value="1">管理员</Option>
                  <Option value="2">平台所有者</Option>
                  <Option value="3">经理</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入用户名',
                }],
              })(
                <Input style={{ width: 500 }} maxLength={30} label="用户名" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '请输入正确的邮箱',
                }, {
                  required: true, message: '请输入邮箱',
                }],
              })(
                <Input style={{ width: 500 }} label="邮箱" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('mobile', {
                rules: [{
                  required: true, message: '请输入电话',
                }, {
                  pattern: /^1[34578]\d{9}$/, message: '请输入正确的电话',
                }],
              })(
                <Input style={{ width: 500 }} label="电话" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码',
                }, {
                  pattern: /^(?=.*\d)[\da-zA-Z!@#$%^&*()]{8,16}$/, message: '密码为8-16位，且包含数字',
                }],
              })(
                <Input style={{ width: 500 }} label="密码" />,
              )}
            </FormItem>
          </Form>
        </Content>
      </Sidebar>
    );
  }
}

CreateUser.propTypes = propTypes;
CreateUser.defaultProps = defaultProps;


export default CreateUser;
