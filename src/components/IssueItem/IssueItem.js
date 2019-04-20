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
              type={0}
            />
            <div className="c7n-backlog-IssueCard-left-summaryContainer">
              <div className="c7n-backlog-IssueCard-left-issueNum" style={{ textDecoration: data.statusMapDTO && data.statusMapDTO.code === 'complete' ? 'line-through' : 'none' }}>
                {`${data.name}`}
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
              <div className="c7n-backlog-IssueCard-right-status">
                <StatusTag
                  status={data.statusId}
                />
              </div>        
              <Tooltip title={`优先级: ${data.priority ? data.priority.name : ''}`}>
                <PriorityTag priority={data.priorityId} />
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
