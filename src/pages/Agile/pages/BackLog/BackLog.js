import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Spin, message, Icon,
} from 'choerodon-ui';
import Page from 'components/Page';
import { IssueList } from './components';
import { getIssues } from '@/api/AgileApi';

const { Header, Content } = Page;
class BackLog extends Component {
  state = {
    data: [],
    selectedIssue: null,
    pagination: {
      page: 0,
      size: 10,
      total: 0,
    },
  }

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = () => {
    getIssues().then((res) => {
      const {
        content, number, totalElements, size,
      } = res;
      this.setState({
        data: content,
        pagination: {
          current: number + 1,
          total: totalElements,
          pageSize: size,
        },
      });
      console.log(res);
    });
  }

  handlePaginationChange = (current, size) => {

  }

  handleIssueSelect = (issue) => {
    this.setState({
      selectedIssue: issue,
    });
  }

  render() {
    const { data, selectedIssue, pagination } = this.state;
    return (
      <Page>
        <Header title="待办事项">
          <Button icon="playlist_add">
            创建问题
          </Button>
          <Button icon="queue">
            创建冲刺
          </Button>
          <Button icon="refresh">
            刷新
          </Button>
        </Header>
        <Content style={{ padding: 0 }}>
          <div>
            <IssueList
              dataSource={data}
              pagination={pagination}
              selectedIssue={selectedIssue}
              onSelect={this.handleIssueSelect}
              onChange={this.handlePaginationChange}
            />

          </div>
        </Content>
      </Page>
    );
  }
}

BackLog.propTypes = {

};

export default BackLog;
