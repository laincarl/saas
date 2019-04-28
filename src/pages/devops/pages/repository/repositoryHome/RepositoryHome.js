import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Content, Header, Page, stores,
} from 'choerodon-front-boot';
import {
  Button, Table, Tooltip, Popconfirm,
} from 'choerodon-ui';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import _ from 'lodash';
import MouserOverWrapper from 'components/MouseOverWrapper';
import 'pages/devops/main.scss';
import './RepositoryHome.scss';
import DepPipelineEmpty from 'components/DepPipelineEmpty/DepPipelineEmpty';
import { getRepositoryList, deleteRepository } from '@/api/DevopsApi.js';
import CreateRepository from './components/CreateRepository';

const { AppState } = stores;
const repoColor = [
  '#45A3FC',
  '#FFB100',
  '#F44336',
  '#00BFA5',
  '#AF4CFF',
  '#F953BA',
];


class RepositoryHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      createRepositoryVisible: false,
      repositoryList: [],
    };
  }

  componentDidMount() {
    this.loadRepositoryList();
  }

  loadRepositoryList = () => {
    this.setState({
      loading: true,
      createRepositoryVisible: false,
    });
    getRepositoryList().then((repositoryList) => {
      this.setState({
        repositoryList,
        loading: false,
      });
    });
  }

  /**
   * @param id
   * @returns {string}
   */
  getRepoColor = (id) => {
    const idMode = id % 6;
    return repoColor[idMode];
  };


  /**
   * 页面刷新
   */
  handleRefresh = () => {
    this.loadRepositoryList();
  };

  /**
   * 点击复制代码成功回调
   * @returns {*|string}
   */
  handleCopy = () => Choerodon.prompt('复制成功');

  /**
   * 点击跳转到应用提交情况报表
   * @param appId 应用id
   */
  linkToReports = (appId) => {
    const { history } = this.props;
    const {
      id: projectId, name: projectName, organizationId, type,
    } = AppState.currentMenuType;
    history.push({
      pathname: '/devops/reports/submission',
      search: `?type=${type}&id=${projectId}&name=${encodeURIComponent(projectName)}&organizationId=${organizationId}`,
      state: {
        appId: [appId],
        backPath: `/devops/repository?type=${type}&id=${projectId}&name=${projectName}&organizationId=${organizationId}`,
      },
    });
  };

  handleCreateClick=() => {
    this.setState({
      createRepositoryVisible: true,
    });
  }

  handleCancel=() => {
    this.setState({
      createRepositoryVisible: false,
    });
  }

  handleDeleteRepository=(record) => {
    const { id } = record;
    this.setState({
      loading: true,
    });
    deleteRepository(id).then(() => {
      this.loadRepositoryList();
    });
  }

  renderAction = (text, record) => {
    const noRepoUrl = this.props.intl.formatMessage({ id: 'repository.noUrl' });
    return (
      <div>        
        <Tooltip title={<FormattedMessage id="repository.report" />}>
          <Button
            className="repo-copy-btn"
            shape="circle"
            size="small"
            icon="exit_to_app"
            onClick={this.linkToReports.bind(this, record.id)}
          />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="repository.copyUrl" />}>
          <CopyToClipboard
            text={record.url || noRepoUrl}
            onCopy={this.handleCopy}
          >
            <Button shape="circle" size="small" className="repo-copy-btn">
              <i className="icon icon-library_books" />
            </Button>
          </CopyToClipboard>
        </Tooltip>
        <Tooltip title="删除">
          <Popconfirm title="确定删除仓库吗？" onConfirm={this.handleDeleteRepository.bind(this, record)}>          
            <Button shape="circle" size="small" icon="delete_forever" />          
          </Popconfirm>
        </Tooltip>
      </div>
    );
  };

  render() {
    const { repositoryList, loading, createRepositoryVisible } = this.state;
    const columns = [{
      title: <FormattedMessage id="repository.repository" />,
      dataIndex: 'gitlabName',
      key: 'gitlabName',
      sorter: true,
      render: (text, record) => (
        <div>
          <span className="repo-commit-avatar" style={{ color: this.getRepoColor(record.id) }}>{text.toString().substr(0, 1).toUpperCase()}</span>
          <span>{text}</span>
        </div>
      ),
    }, {
      title: <FormattedMessage id="repository.url" />,
      dataIndex: 'url',
      key: 'url',
      render: (text, record) => (
        <a href={record.url || null} rel="nofollow me noopener noreferrer" target="_blank">
          <MouserOverWrapper text={record.url} width={0.25}>
            {record.url ? `../${record.url.split('/')[record.url.split('/').length - 1]}` : ''}
          </MouserOverWrapper>
        </a>
      ),
    }, {
      title: <FormattedMessage id="repository.application" />,
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    }, {
      align: 'right',
      width: 150,
      key: 'action',
      render: this.renderAction,
    }];
    return (
      <Page
        className="c7n-region c7n-app-wrapper"
      >
        <CreateRepository visible={createRepositoryVisible} onCreate={this.handleRefresh} />
        {repositoryList && repositoryList.length ? (
          <Fragment>
            <Header title={<FormattedMessage id="repository.head" />}>
              <Button
                icon="refresh"
                onClick={this.handleRefresh}
              >
                <FormattedMessage id="refresh" />
              </Button>
            </Header>
            <Content code="repository" values={{ name }}>
              <Table
                loading={loading}
                columns={columns}
                dataSource={repositoryList}
                rowKey={record => record.id}
              />
            </Content>
          </Fragment>
        ) : <DepPipelineEmpty title={<FormattedMessage id="repository.head" />} type="app" callback={this.handleCreateClick} />}
      </Page>
    );
  }
}

export default injectIntl(withRouter(RepositoryHome));
