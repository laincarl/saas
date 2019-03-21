import React, { Component } from 'react';
import { Button, Tooltip, Icon } from 'choerodon-ui';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './Header.less';

@withRouter
@inject('AppState', 'MenuStore')
@observer
class Header extends Component {
  handleMenuClick = () => {
    const { AppState } = this.props;
    AppState.setMenuExpanded(!AppState.getMenuExpanded);
  };

  render() {
    return (
      <div className="global-header">        
        <Button shape="circle" icon="menu" className="global-header-menu-icon" onClick={this.handleMenuClick} />
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
