import React, { Component } from 'react';
import { Button, Tooltip, Icon } from 'choerodon-ui';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { PREFIX_CLS } from '../../common/constants';
import User from './User';
import Logo from './Logo';
import MenuType from './MenuType';
import './style';

const prefixCls = `${PREFIX_CLS}-boot-header`;
@withRouter
@inject('AppState', 'MenuStore')
@observer
class Header extends Component {
  render() {
    return (
      <div className={`${prefixCls}-wrap`}>
        <div className={`${prefixCls}-left`}>
          <Logo history={history} />
        </div>           
        <ul className={`${prefixCls}-center`}>
          <li>
            <MenuType />
          </li>
          {/* {
            getSiteMenuData.length > 0 && (
              <li>
                <Setting />
              </li>
            )
          } */}
        </ul>
        <ul className={`${prefixCls}-right`}>
          <li style={{ marginLeft: 20 }}>
            <User />
          </li>
        </ul>
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
