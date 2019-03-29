import React, { Component } from 'react';
import { Button, Tooltip, Icon } from 'choerodon-ui';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import User from './User';
import './Header.less';
import './style';

@withRouter
@inject('AppState', 'MenuStore')
@observer
class Header extends Component {
  handleMenuClick = () => {
    const { AppState } = this.props;
    AppState.setMenuExpanded(!AppState.getMenuExpanded);
  };

  render() {
    const imgUrl = 'https://minio.choerodon.com.cn/iam-service/file_48f666513b6c4640abbdbf34b9cf9bd3_%3F%3Fd46401601152fed0ba0939ef9f5623dc.jpg';
    return (
      <div className="global-header">        
        <Button shape="circle" icon="menu" className="global-header-menu-icon" onClick={this.handleMenuClick} />
        <div>
          <User imgUrl={imgUrl} />
        </div>
        
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
