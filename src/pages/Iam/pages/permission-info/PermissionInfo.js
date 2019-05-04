import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Content, Page, Header } from 'choerodon-front-boot';
import { Table, Tooltip, Button } from 'choerodon-ui';
import { getRepositoryList } from '@/api/DevopsApi';
import { USER_TYPE } from '@/common/Constant';
import './PermissionInfo.scss';


@withRouter
@inject('AppState')
@observer
class PermissionInfo extends Component {
  state = {
    loading: false,
    repos: [],
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    getRepositoryList().then((repos) => {
      this.setState({
        repos,
        loading: false,
      });
    });
  }

  handleClick=() => {
    this.props.history.push('/agile/issue');
  }

  getTableColumns = () => [{
    title: '名称',
    dataIndex: 'name',
  }, {
    title: '角色',   
    dataIndex: 'description',
    render: () => (USER_TYPE[this.props.AppState.userInfo.type]),
  }, {
    title: '',  
    align: 'right',
    render: () => (
      <Tooltip title="跳转到问题管理">
        <Button icon="exit_to_app" shape="circle" onClick={this.handleClick} />
      </Tooltip>
    ),
  }]

  render() {    
    const {
      repos, loading,
    } = this.state;


    return (
      <Page>
        <Header title="权限信息" />
        <Content              
          title={`用户“${this.props.AppState.userInfo.name || ''}”的权限信息`}
          description="您可以在这里查看您的项目权限信息"       
        >
        
          <Table dataSource={repos} columns={this.getTableColumns()} loading={loading} pagination={false} />
        </Content>
      </Page>
    );
  }
}
export default PermissionInfo;
