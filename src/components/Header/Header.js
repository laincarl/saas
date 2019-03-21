import React, { Component } from 'react';
import { Button, Tooltip, Icon } from 'choerodon-ui';
import PropTypes from 'prop-types';
import './Header.less';

class Header extends Component {
  render() {
    return (
      <div className="global-header">        
        <Icon type="arrow_back" />    
        header
        arrow-left
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
