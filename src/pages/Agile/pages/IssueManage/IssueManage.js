import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page, Header, Content } from 'choerodon-front-boot';
import { Button, Spin } from 'choerodon-ui';
import { getIssues } from '@/api/AgileApi';
import { IssueTable } from './components';

class IssueManage extends Component {
  state = {
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

  handleRefresh=() => {
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

  handleChange = (pagination) => {

  }

  handleDeleteIssue=() => {
    
  }

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Page>
        <Header title="问题管理">
          <Button icon="playlist_add">
            创建问题
          </Button>         
          <Button icon="refresh" onClick={this.handleRefresh}>
            刷新
          </Button>
        </Header>
        <Spin spinning={loading}>
          <Content style={{ paddingTop: 0 }}>
            <IssueTable 
              dataSource={data}
              pagination={pagination}
              onChange={this.handleChange}
              onDeleteOk={this.handleDeleteIssue}
            />
          </Content>
        </Spin>
      </Page>     
    );
  }
}

IssueManage.propTypes = {

};

export default IssueManage;
