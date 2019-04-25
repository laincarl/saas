import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Spin, Table } from 'choerodon-ui';
import IssueItem from 'components/IssueItem';
import './IssueList.scss';

class IssueList extends PureComponent {
  components = {
    table: () => {
      const {
        dataSource, selectedIssue,
        onSelect,  
      } = this.props;
      return (
        <Fragment>
          {dataSource.map(issue => (
            <IssueItem
              data={issue}
              onClick={onSelect}
              selected={selectedIssue && selectedIssue.id === issue.id}
            />
          ))}
        </Fragment>
      );
    },
  };

  render() {
    const {
      dataSource,
      pagination,
      loading,      
      onChange,
    } = this.props;
    return (
      <div className="IssueList">
        <Table
          loading={loading}
          pagination={pagination}
          onChange={onChange}          
          dataSource={dataSource}
          components={this.components}
        />
      </div>
    );
  }
}
IssueList.propTypes = {

};

export default IssueList;
