import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Content, Permission, Page, Header, NoPermission,
} from 'choerodon-front-boot';
import { Table, Select, Button } from 'choerodon-ui';
import './TokenManager.scss';
import { getUsers, updateUser } from '@/api/IamApi';
import TextEditToggle from 'components/TextEditToggle';
import { USER_TYPE } from '@/common/Constant';
import CreateUser from './conponents/CreateUser';

const { Option } = Select;
const { Text, Edit } = TextEditToggle;
class TokenManager extends Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    users: [],
    loading: false,
    createUserVisible: false,
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = (pagination = this.state.pagination) => {
    this.setState({
      loading: true,
    });
    const { current, pageSize } = pagination;
    getUsers({
      page: current - 1,
      size: pageSize,
    }).then((data) => {
      const {
        content, number, totalElements, size,
      } = data;
      this.setState({
        loading: false,
        users: content,
        pagination: {
          current: number + 1,
          total: totalElements,
          pageSize: size,
        },
      });
    });
  }


  handlePaginationChange = (pagination) => {
    this.loadUsers(pagination);
  }

  handleSubmit=(record, type) => {
    console.log(record, type);
    updateUser({
      ...record,
      type,
    }).then((res) => {
      this.loadUsers();
    });
  }

  getTableColumns = () => [{
    title: '编号',
    dataIndex: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
  }, {
    title: '权限名',
    dataIndex: 'type',
    width: 200,
    render: (type, record) => (
      <TextEditToggle formKey="type" originData={type} onSubmit={this.handleSubmit.bind(this, record)}>
        <Text>
          {value => USER_TYPE[value] || value}
        </Text>
        <Edit>
          <Select>
            <Option value={0}>开发人员</Option>
            <Option value={1}>管理员</Option>
            <Option value={2}>平台所有者</Option>
            <Option value={3}>经理</Option>
          </Select>
        </Edit>
      </TextEditToggle>
    ),
  }]

  handleCreateUserClick=() => {
    this.setState({
      createUserVisible: true,
    });
  }

  handleCreateUser=() => {
    this.setState({
      createUserVisible: false,
    });
    this.loadUsers();
  }

  handleCancel=() => {
    this.setState({
      createUserVisible: false,
    });
  }

  render() {
    const {
      loading, users, pagination, createUserVisible, 
    } = this.state;
    return (
      <Page>
        <Header title="权限管理">
          <Button icon="playlist_add" onClick={this.handleCreateUserClick}>
            注册用户
          </Button>          
          <Button icon="refresh" onClick={() => { this.loadUsers(); }}>
            刷新
          </Button>
        </Header>
        <Content title="权限管理" description="在这里您可以管理所有用户">
          <CreateUser
            onCreate={this.handleCreateUser}
            visible={createUserVisible}
            onCancel={this.handleCancel}
          />
          <Table
            pagination={pagination}
            loading={loading}
            columns={this.getTableColumns()}
            dataSource={users}
            rowKey="id"
            className="c7n-permission-info-table"
          />
        </Content>
      </Page>
    );
  }
}
const TokenManagerContainer = () => <Permission type={[2]} noAccessChildren={<NoPermission />}><TokenManager /></Permission>;
export default TokenManagerContainer;
