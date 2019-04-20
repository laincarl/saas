import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Spin } from 'choerodon-ui';
import IssueItem from 'components/IssueItem';
import './IssueList.scss';

const IssueList = ({
  dataSource,
  pagination: {
    current,
    pageSize,
    total,
  },
  loading,
  selectedIssue,
  onSelect,
  onChange,
}) => (
  <div className="IssueList">
    <Spin spinning={loading}>
      {dataSource.map(issue => (
        <IssueItem
          data={issue} 
          onClick={onSelect}
          selected={selectedIssue && selectedIssue.id === issue.id}
        />
      ))}
    </Spin>
    <div className="IssueList-Pagination">
      <Pagination current={current} pageSize={pageSize} total={total} onChange={onChange} />
    </div>
  </div>
);

IssueList.propTypes = {

};

export default IssueList;
