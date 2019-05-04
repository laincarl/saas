import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

@inject('AppState')
@observer
class Permission extends Component {
  render() { 
    const {
      AppState, children, type, 
    } = this.props;
    const noAccessChildren = this.props.noAccessChildren || null;
    const permissions = type || [1, 2, 3];
    const hasPermission = permissions.includes(AppState.userInfo.type);
    return hasPermission ? children : noAccessChildren;
  }
}

Permission.propTypes = {

};

export default Permission;
