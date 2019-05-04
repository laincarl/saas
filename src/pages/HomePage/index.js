import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import { Icon } from 'choerodon-ui';
import { observer } from 'mobx-react';

import UserInfoStore from '@/stores/UserInfoStore';
import './index.scss';

const { Header, Content } = Page;
@observer
class HomePage extends Component {
  render() {
    const { mobile, name, email } = UserInfoStore.getUserInfo;
    return (
      <Page>
        <Header title={(
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Icon type="home" style={{ marginRight: 15 }} />
            首页
          </span>
        )}
        />
        <Content style={{ padding: 0, display: 'flex' }}>
          <div
            className="c7n-boot-dashboard-card"
            style={{ 
              width: 369,
              height: 380, 
              position: 'absolute',
              transition: 'all 0.2s ease-out 0s',
              zIndex: 2,
              transform: 'translate3d(20px, 20px, 0px)',
              background: 'rgb(255, 255, 255)',
              overflow: 'hidden',
            }}
          >
            <header className="c7n-boot-dashboard-card-title">
              <h1>
                <i className="icon icon-person" />
                <span>我的信息</span>
              </h1>
            </header>
            <div style={{ pointerEvents: 'all', height: '100%' }}>
              <div className="c7n-iam-dashboard-user-info">
                <dl>
                  <dt><span>用户名</span></dt>
                  <dd>{name}</dd>                  
                  <dt><span>邮箱</span></dt>
                  <dd>{email}</dd>
                  <dt><span>电话</span></dt>
                  <dd><span>{mobile}</span></dd>                  
                </dl>
                <nav className="c7n-boot-dashboard-navbar">
                  <i className="icon icon-arrow_forward" />
                  <a href="#/iam/user-info?type=site"><span>转至个人信息</span></a>
                </nav>
              </div>
            </div>
          </div>
        </Content>
      </Page>
    );
  }
}

HomePage.propTypes = {

};

export default HomePage;
