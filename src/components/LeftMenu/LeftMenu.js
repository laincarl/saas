import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Menu, Icon } from 'choerodon-ui';
import { withRouter } from 'react-router';
// import Icon from 'Icon';
import './LeftMenu.less';

const { SubMenu } = Menu;

const LeftMenu = ({
  onClick,
  collapsed,
  onCollapse,
  ...restProps
}) => (
  <div className={`left-menu ${collapsed && 'collapsed'}`}>
    <div className="left-menu-header">
      <Icon type="agile" />
        敏捷管理
    </div>
    <Menu
      onClick={onClick}
      style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        // width: collapsed ? 50 : 250,
      }}
      defaultOpenKeys={['sub1']}
      inlineCollapsed={collapsed}
      mode="inline"
      {...restProps}
    >
      <Menu.Item key="/agile">
        <Icon type="table_chart" />
        <span>问题管理</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="desktop" />
        <span>Option 2</span>
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="inbox" />
        <span>Option 3</span>
      </Menu.Item>
      <SubMenu
        key="sub1"
        title={(
          <span>
            <Icon type="mail" />
            <span>Navigation One</span>
          </span>
          )}
      >
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={(
          <span>
            <Icon type="appstore" />
            <span>Navigation Two</span>
          </span>
          )}
      >
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </SubMenu>
    </Menu>
    <div role="none" className="left-menu-footer" onClick={onCollapse}>
      <Icon type={collapsed ? 'last_page' : 'first_page'} />
    </div>
  </div>
);

@inject('AppState')
@observer
class LeftMenuContainer extends Component {
  handleClick=({ key }) => {
    const {
      AppState, match, history, menus, 
    } = this.props;
    const currentMenu = AppState.currentLocation.pathname;
    // console.log(key);
    if (currentMenu !== key) {
      history.push(key);
    }
  }

  render() {
    const {
      AppState, match,
    } = this.props;
    let currentMenu = AppState.currentLocation.pathname;
    const { collapsed, onCollapse } = AppState;
    // console.log(match.url);
    // 匹配当前级别路由地址
    const pathReg = new RegExp(`${match.url}/[^/]*?((?=/)|$)`);
    if (currentMenu.match(pathReg)) {
      [currentMenu] = currentMenu.match(pathReg);
    }
    return (
      <div style={{ borderRight: '1px solid rgb(211, 211, 211)', background: 'white' }}>
        <LeftMenu 
          selectedKeys={[currentMenu]}
          onClick={this.handleClick} 
          onCollapse={onCollapse}
          collapsed={collapsed}
        />       
      </div>
    );
  }
}
export default withRouter(LeftMenuContainer);
