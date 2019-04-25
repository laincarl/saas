import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

@inject('AppState')
class Permission extends Component {
  render() {
    const permissions = [1, 2, 3];
    const { AppState, children } = this.props;
    const hasPermission = permissions.includes(AppState.userInfo.type);
    return hasPermission ? children : null;
  }
}

Permission.propTypes = {

};

export default Permission;
