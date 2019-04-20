import React, { Component } from 'react';
import './PriorityTag.scss';

const PRIORITY_MAP = {
  2: {
    color: '#3575df',
    bgColor: 'rgba(77, 144, 254, 0.2)',
    name: '中',
  },
  3: {
    color: '#f44336',
    bgColor: 'rgba(244, 67, 54, 0.2)',
    name: '高',
  },
  1: {
    color: 'rgba(0, 0, 0, 0.36)',
    bgColor: 'rgba(0, 0, 0, 0.08)',
    name: '低',
  },
  default: {
    color: 'transparent',
    bgColor: 'transparent',
    name: '',
  },
};

class PriorityTag extends Component {
  render() {
    const { priority, style } = this.props;
    const data = PRIORITY_MAP[priority];
    return (
      <div
        style={style}
        className="c7n-priorityTag-container"
      >
        <div
          className="c7n-priorityTag"
          style={{
            background: data ? data.bgColor : '#FFFFFF',
            color: data ? data.color : '#FFFFFF',
          }}
        >
          {data ? data.name : ''}
        </div>
      </div>
    );
  }
}

export default PriorityTag;
