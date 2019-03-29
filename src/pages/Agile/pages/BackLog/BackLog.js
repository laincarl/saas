import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Spin, message, Icon,
} from 'choerodon-ui';
import Page from 'components/Page';
import IssueItem from 'components/IssueItem';
import { loadIssues } from '@/api/AgileApi';

const { Header, Content } = Page;
class BackLog extends Component {
  state={
    data: [],
    selectedIssue: null,
  }

  componentDidMount() {
    loadIssues().then((res) => {
      this.setState({
        data: res.content,
      });
      console.log(res);
    });
  }

  handleIssueClick=(issue) => {
    this.setState({
      selectedIssue: issue,
    });
  }

  render() {
    const { data, selectedIssue } = this.state;
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
            {data.map(issue => <IssueItem data={issue} onClick={this.handleIssueClick} selected={selectedIssue && selectedIssue.issueId === issue.issueId} />)}
          </div>
        </Content>
      </Page>
    );
  }
}

BackLog.propTypes = {

};

export default BackLog;
