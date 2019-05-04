import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page, Header, Content } from 'choerodon-front-boot';
import { Button, Spin } from 'choerodon-ui';
import { getIssues, deleteIssue } from '@/api/AgileApi';
import IssueSide from 'components/IssueSide';
import CreateIssue from 'components/CreateIssue';
import { IssueTable } from './components';

class IssueManage extends Component {
  state = {
    createIssueVisible: false,
    selectedIssue: {},
    loading: false,
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  }

  componentDidMount() {
    this.loadIssues();
  }

  handleRefresh = () => {
    this.loadIssues();
  }

  loadIssues = (pagination = this.state.pagination) => {
    this.setState({
      loading: true,
    });
    const { current, pageSize } = pagination;
    getIssues('all', current - 1, pageSize).then((res) => {
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

  handleDeleteOk = (record) => {
    const { id } = record;
    this.setState({
      loading: true,
    });
    deleteIssue(id).then((res) => {
      this.loadIssues();
    });
  }

  handleChange = (pagination) => {

  }

  handleRow = record => ({
    onClick: (event) => { this.handleIssueSelect(record); },
  })

  handleIssueSelect = (issue) => {
    this.setState({
      selectedIssue: issue,
    });
  }

  handleCreateIssueClick = () => {
    this.setState({
      createIssueVisible: true,
    });
  }

  handleCreateIssueCancel = () => {
    this.setState({
      createIssueVisible: false,
    });
  }

  handleCreateIssue = () => {
    this.setState({
      createIssueVisible: false,
    });
    this.loadIssues();
  }

  handleIssueDelete = () => {
    this.loadIssues();
  }

  render() {
    const {
      data, pagination, loading, selectedIssue, createIssueVisible,
    } = this.state;
    return (
      <Page>
        <Header title="问题管理">
          <Button icon="playlist_add" onClick={this.handleCreateIssueClick}>
            创建问题
          </Button>
          <Button icon="refresh" onClick={this.handleRefresh}>
            刷新
          </Button>
        </Header>
        <Content style={{ paddingTop: 0, display: 'flex' }}>
          <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
            <IssueTable
              loading={loading}
              dataSource={data}
              pagination={pagination}
              onChange={this.handleChange}
              onRow={this.handleRow}
              onDeleteOk={this.handleDeleteOk}
            />
          </div>
          {selectedIssue.id && (
            <IssueSide
              issueId={selectedIssue.id}
              key={selectedIssue.id}
              onDelete={this.handleIssueDelete}
              onUpdate={this.loadIssues}
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

IssueManage.propTypes = {

};

export default IssueManage;
