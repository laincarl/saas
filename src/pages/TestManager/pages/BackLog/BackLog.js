import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Spin, message, Icon,
} from 'choerodon-ui';
import Page from 'components/Page';
import CreateIssue from 'components/CreateIssue';
import IssueSide from 'components/IssueSide';
import { IssueList } from './components';
import { getIssues } from '@/api/TestManagerApi';

const { Header, Content } = Page;
const propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,  
};

class BackLog extends Component {
  state = {
    data: [],
    createIssueVisible: false,
    selectedIssue: {},
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  }

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = (pagination = this.state.pagination) => {
    this.setState({
      loading: true,
    });
    const { type } = this.props;
    const { current, pageSize } = pagination;  
    getIssues(type, current - 1, pageSize).then((res) => {
      const {
        content, number, totalElements, size,
      } = res;
      this.setState({
        loading: false,
        data: content,
        pagination: {
          current: number + 1,
          total: totalElements,
          pageSize: size,
        },
      });
    });
  }

  handlePaginationChange = (current, size) => {

  }

  handleIssueSelect = (issue) => {
    this.setState({
      selectedIssue: issue,
    });
  }

  handleCreateIssueClick=() => {
    this.setState({
      createIssueVisible: true,
    });
  }

  handleCreateIssueCancel=() => {
    this.setState({
      createIssueVisible: false,
    });
  }

  handleCreateIssue=() => {
    this.setState({
      createIssueVisible: false,
    });
    this.loadIssues();
  }

  handleIssueDelete=() => {
    this.loadIssues();
  }

  render() {
    const {
      data, selectedIssue, pagination, loading, createIssueVisible,
    } = this.state;
    const { title } = this.props;
    return (
      <Page>
        <Header title={title}>
          <Button icon="playlist_add" onClick={this.handleCreateIssueClick}>
            创建问题
          </Button>          
          <Button icon="refresh" onClick={() => { this.loadIssues(); }}>
            刷新
          </Button>
        </Header>
        <Content style={{ padding: 0, display: 'flex' }}>
          <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
            <IssueList
              loading={loading}
              dataSource={data}
              pagination={pagination}
              selectedIssue={selectedIssue}
              onSelect={this.handleIssueSelect}
              onChange={this.handlePaginationChange}
            />
          </div>
          {selectedIssue.id && (
            <IssueSide
              issueId={selectedIssue.id}
              key={selectedIssue.id}
              onDelete={this.handleIssueDelete}
            />
          )}
          <CreateIssue 
            visible={createIssueVisible}
            onCancel={this.handleCreateIssueCancel}
            onCreate={this.handleCreateIssue}
          />
        </Content>
      </Page>
    );
  }
}

BackLog.propTypes = propTypes;

export default BackLog;
