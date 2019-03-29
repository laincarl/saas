import React, { Component } from 'react';
import { Tooltip } from 'choerodon-ui';
import classnames from 'classnames';
import _ from 'lodash';
import TypeTag from '../TypeTag';
import UserHead from '../UserHead';
import StatusTag from '../StatusTag';
import PriorityTag from '../PriorityTag';
import './IssueItem.scss';

class IssueItem extends Component {
  handleClick=() => {
    const { onClick, data } = this.props;
    onClick(data);
  }

  render() {
    const { data, selected } = this.props;
    return (
      <div    
        className={classnames('c7n-backlog-sprintIssueItem', {
          'issue-selected': selected,
        })}      
        label="sprintIssue"
        onClick={this.handleClick}
        role="none"
      >
        <div className={classnames('c7n-backlog-IssueCard')}>
          <div
            label="sprintIssue"
            className={classnames('c7n-backlog-IssueCard-left')}
          >
            <TypeTag
              data={data.issueTypeDTO}
            />
            <div className="c7n-backlog-IssueCard-left-summaryContainer">
              <div className="c7n-backlog-IssueCard-left-issueNum" style={{ textDecoration: data.statusMapDTO && data.statusMapDTO.code === 'complete' ? 'line-through' : 'none' }}>
                {`${data.issueNum}`}
              </div>
              <Tooltip title={data.summary} placement="topLeft">
                <div className="c7n-backlog-IssueCard-left-issueSummary">{data.summary}</div>
              </Tooltip>
            </div>
          </div>
          <div
            className={classnames('c7n-backlog-IssueCard-right')}
          >
            <div className={classnames('line-two-left')}>
              {!_.isNull(data.epicName) ? (
                <Tooltip title={`史诗: ${data.epicName}`}>
                  <span
                    label="sprintIssue"
                    className="c7n-backlog-IssueCard-right-epic container"
                    style={{
                      color: data.color || data.epicColor,
                      border: `1px solid ${data.color || data.epicColor}`,
                    }}
                  >
                    {data.epicName}
                  </span>
                </Tooltip>
              ) : ''}
              {data.assigneeId && (
              <UserHead
                user={{
                  id: data.assigneeId,
                  loginName: '',
                  realName: data.assigneeName,
                  avatar: data.imageUrl,
                }}
              />
              )}
            </div>
            <div className={classnames('line-two-right')}>
              <Tooltip title={`状态: ${data.statusMapDTO ? data.statusMapDTO.name : ''}`}>
                <div className="c7n-backlog-IssueCard-right-status">
                  <StatusTag
                    data={data.statusMapDTO}
                  />
                </div>
              </Tooltip>
              <Tooltip title={`优先级: ${data.priorityDTO ? data.priorityDTO.name : ''}`}>
                <PriorityTag priority={data.priorityDTO} />
              </Tooltip>
              <Tooltip title={`故事点: ${data.storyPoints}`}>
                <div
                  label="sprintIssue"
                  className={classnames('c7n-backlog-IssueCard-right-storyPoint', {
                    visible: data.storyPoints && data.issueTypeDTO && data.issueTypeDTO.typeCode === 'story',
                  })}
                >
                  {data.storyPoints}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IssueItem;
