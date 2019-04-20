import React, { Component } from 'react';
import './StatusTag.scss';
import { STATUS } from '../../common/Constant';

class StatusTag extends Component {
  render() {
    const {
      status, style,
    } = this.props;
    const data = STATUS[status];
    const { colour, name } = data || {};
    return (
      <div
        className="c7n-statusTag"
        style={{
          background: colour,
          ...style,
        }}
      >
        { name || (data && data.name) || '' }
      </div>
    );
  }
}
export default StatusTag;
