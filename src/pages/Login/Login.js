import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'choerodon-ui';
import { login } from 'api/IamApi';
import { getParams } from '@/common/utils';
import { setAccessToken, removeAccessToken } from '@/common/accessToken';
import './Login.scss';

@withRouter
class Login extends React.Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    removeAccessToken();
  }
  
  login = (data) => {
    const { history } = this.props;   
    
    login(data).then((res) => {
      const { access_token, expires_in, token_type } = res;
      if (access_token) {
        setAccessToken(access_token, 'bearer', expires_in);
        if (getParams().redirect_uri) {
          window.location = getParams().redirect_uri;
        } else {
          history.replace('/');
        }
      }
      this.setState({
        loading: false,
      });
    }).catch((err) => {
      console.log(err);
      Choerodon.prompt('登录失败');
      this.setState({
        loading: false,
      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { name, password, isRememberMe } = values;
        this.login({
          name,
          password,
          isRememberMe,
        });
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="login-title">登录</div>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入登录账号!' }],
            })(
              <Input label="登录账号" placeholder="登录账号" />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input label="密码" type="password" placeholder="密码" />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isRememberMe', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>,
            )}
            <Button
              loading={loading}
              type="primary"
              funcType="raised"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(Login);


Login.propTypes = {

};

export default WrappedLoginForm;
