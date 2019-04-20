import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Spin, message, Icon,
} from 'choerodon-ui';
import Page from 'components/Page';
import CreateIssue from 'components/CreateIssue';
import { IssueList, IssueSide } from './components';
import { getIssues } from '@/api/AgileApi';

const { Header, Content } = Page;
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
    const { current, pageSize } = pagination;  
    getIssues(current - 1, pageSize).then((res) => {
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
    this.loadIssues();
  }

  render() {
    const {
      data, selectedIssue, pagination, loading, createIssueVisible,
    } = this.state;
    return (
      <Page>
        <Header title="待办事项">
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

BackLog.propTypes = {

};

export default BackLog;
