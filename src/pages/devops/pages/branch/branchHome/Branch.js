import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button, Tooltip, Modal, Table, Popover, Select, Icon,
} from 'choerodon-ui';
import {
  Content, Header, Page, stores,
} from 'choerodon-front-boot';
import { injectIntl, FormattedMessage } from 'react-intl';
import _ from 'lodash';
import 'pages/devops/main.scss';
import './Branch.scss';
import TimePopover from 'components/timePopover';
import '../index.scss';
import MouserOverWrapper from 'components/MouseOverWrapper';

import DepPipelineEmpty from 'components/DepPipelineEmpty/DepPipelineEmpty';
import BranchEdit from '../branchEdit';
import BranchCreate from '../branchCreate';
import { getRepositoryList, getBranchs } from '@/api/DevopsApi.js';

const { AppState } = stores;
const { Option } = Select;


class Branch extends Component {
  state = {
    repositoryList: [],
    currentRepo: null,
    branchs: [],
    createBranchVisible: false,
  }


  componentDidMount() {
    this.loadRepositoryList();
  }

  loadRepositoryList = () => {
    this.setState({
      loading: true,
    });
    getRepositoryList().then((repositoryList) => {
      if (repositoryList && repositoryList[0]) {
        this.loadData(repositoryList[0].id);
        this.setState({
          repositoryList,
          currentRepo: repositoryList[0].id,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  /**
   * 获取分支
   */
  loadData = (value = this.state.currentRepo) => {
    this.setState({
      loading: true,
    });
    getBranchs(value).then((branchs) => {
      this.setState({
        branchs,
        loading: false,
      });
    });
  };

  /**
   * 获取列表的icon
   * @param name 分支名称
   * @returns {*}
   */
  getIcon = (name) => {
    const nameArr = ['feature', 'release', 'bugfix', 'hotfix'];
    let type = '';
    if (name.includes('-') && nameArr.includes(name.split('-')[0])) {
      type = name.split('-')[0];
    } else if (name === 'master') {
      type = name;
    } else {
      type = 'custom';
    }
    return <span className={`c7n-branch-icon icon-${type}`}>{type.slice(0, 1).toUpperCase()}</span>;
  };

  /**
   * 获取分支列表正文
   * @returns {*}
   */
  tableBranch = () => {
    const { intl: { formatMessage } } = this.props;
    const { branchs, loading } = this.state;
    const branchColumns = [
      {
        title: <FormattedMessage id="branch.name" />,
        dataIndex: 'branchName',
        render: (text, record) => (
          <div>
            {this.getIcon(record.branchName)}
            <MouserOverWrapper text={record.branchName} width={0.2} className="c7n-branch-text">
              {record.branchName}
            </MouserOverWrapper>
          </div>
        ),
      },
      {
        title: <FormattedMessage id="branch.commit" />,
        render: (text, record) => (
          <div>
            <div>
              <i className="icon icon-point branch-column-icon" />
              <a href={record.commitUrl} target="_blank" rel="nofollow me noopener noreferrer">
                <span>{record.sha && record.sha.slice(0, 8)}</span>
              </a>
              <i className="icon icon-schedule branch-col-icon branch-column-icon" style={{ paddingLeft: 16, fontSize: 16, marginBottom: 2 }} />
              <TimePopover content={record.commitDate} style={{ display: 'inline-block', color: 'rgba(0, 0, 0, 0.65)' }} />
            </div>
            {record.commitUserUrl && record.commitUserName ? (
              <Tooltip title={record.commitUserName}>
                <div className="branch-user-img" style={{ backgroundImage: `url(${record.commitUserUrl})` }} />
              </Tooltip>
            ) : <Tooltip title={record.commitUserName}><div className="branch-user-img">{record.commitUserName && record.commitUserName.slice(0, 1)}</div></Tooltip>}
            <MouserOverWrapper text={record.commitContent} width={0.2} className="branch-col-icon">
              {record.commitContent}
            </MouserOverWrapper>
          </div>
        ),
      },
      {
        title: <FormattedMessage id="branch.time" />,
        dataIndex: 'commit.committedDate',
        render: (text, record) => (
          <div>
            {record.createUserName && record.createUserUrl
              ? (
                <React.Fragment>
                  <div className="branch-user-img" style={{ backgroundImage: `url(${record.createUserUrl})` }} />
                  <div style={{ display: 'inline-block' }}>
                    <span style={{ paddingRight: 5 }}>{record.createUserName}</span>
                    {record.createUserName !== record.createUserRealName
                      && <span>{record.createUserRealName}</span>}
                  </div>
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  {record.createUserName ? (
                    <div>
                      <div className="branch-user-img">{record.createUserRealName && record.createUserRealName.slice(0, 1).toUpperCase()}</div>
                      <div style={{ display: 'inline-block' }}>
                        <span style={{ paddingRight: 5 }}>{record.createUserName}</span>
                        {record.createUserName !== record.createUserRealName
                          && <span>{record.createUserRealName}</span>}
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              )}
          </div>
        ),
      },
      {
        align: 'right',
        className: 'operateIcons',
        key: 'action',
        render: (test, record) => (
          <div>
            {record.branchName !== 'master'
              ? (
                <React.Fragment>
                  <Tooltip
                    placement="bottom"
                    title={<FormattedMessage id="branch.edit" />}
                  >
                    <Button size="small" shape="circle" onClick={this.handleEdit.bind(this, record.branchName)}>
                      <i className="icon icon-mode_edit" />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    placement="bottom"
                    title={<FormattedMessage id="branch.request" />}
                  >
                    <a href={record.commitUrl && `${record.commitUrl.split('/commit')[0]}/merge_requests/new?change_branches=true&merge_request[source_branch]=${record.branchName}&merge_request[target_branch]=master`} target="_blank" rel="nofollow me noopener noreferrer">
                      <Button size="small" shape="circle">
                        <i className="icon icon-merge_request" />
                      </Button>
                    </a>
                  </Tooltip>
                  <Tooltip
                    placement="bottom"
                    title={<FormattedMessage id="delete" />}
                  >
                    <Button size="small" shape="circle" onClick={this.openRemove.bind(this, record.branchName)}>
                      <i className="icon icon-delete_forever" />
                    </Button>
                  </Tooltip>
                </React.Fragment>
              )
              : null
            }
          </div>
        ),
      },
    ];
    const titleData = ['master', 'feature', 'bugfix', 'release', 'hotfix', 'custom'];
    const title = (
      <div className="c7n-header-table">
        <span>
          <FormattedMessage id="branch.list" />
        </span>
        <Popover
          overlayClassName="branch-popover"
          placement="rightTop"
          arrowPointAtCenter
          content={(
            <section>
              {
                _.map(titleData, item => (
                  <div className="c7n-branch-block" key={item}>
                    <span className={`branch-popover-span span-${item}`} />
                    <div className="branch-popover-content">
                      <p className="branch-popover-p">
                        <FormattedMessage id={`branch.${item}`} />
                      </p>
                      <p>
                        <FormattedMessage id={`branch.${item}Des`} />
                      </p>
                    </div>
                  </div>
                ))
              }
            </section>
          )}
        >
          <Icon className="branch-icon-help" type="help" />
        </Popover>
      </div>
    );
    return (
      <div>
        {title}
        <Table
          filterBarPlaceholder={formatMessage({ id: 'filter' })}
          loading={loading}
          className="c7n-branch-table"
          rowClassName="c7n-branch-tr"
          columns={branchColumns}
          dataSource={branchs}
          locale={{ emptyText: formatMessage({ id: 'branch.empty' }) }}
        />
      </div>

    );
  }


  /**
   * 修改相关联问题
   * @param name
   */
  handleEdit = (name) => {
    const { BranchStore } = this.props;
    this.setState({ name });
    // BranchStore.loadBranchByName(this.state.projectId, DevPipelineStore.selectedApp, name);
    BranchStore.setCreateBranchShow('edit');
  };

  /**
   * 刷新
   */
  handleRefresh = () => {
    this.loadData();
  };

  /**
   * 创建分支的弹框
   */
  showSidebar = () => {
    const { BranchStore } = this.props;
    const { projectId } = this.state;
    BranchStore.loadTagData(projectId);
    BranchStore.loadData({
      projectId,
      size: 3,
    });
    BranchStore.setCreateBranchShow('create');
  };

  showIssue = (id, name) => {
    const { BranchStore } = this.props;
    this.setState({ name });
    BranchStore.loadIssueById(this.state.projectId, id);
    BranchStore.loadIssueTimeById(this.state.projectId, id);
    BranchStore.setCreateBranchShow('detail');
  };

  /**
   * 关闭sidebar
   */
  hideSidebar = () => {
    this.setState({
      createBranchVisible: false,
    });
    this.loadData();
  };

  /**
   * 打开删除框
   * @param name
   */
  openRemove = (name) => {
    this.setState({ visible: true, name });
  };

  /**
   * 关闭删除框
   */
  closeRemove = () => {
    this.setState({ visible: false });
  };

  /**
   * 删除数据
   */
  handleDelete = () => {
    const { BranchStore } = this.props;
    const { name, currentRepo } = this.state;
    const menu = AppState.currentMenuType;
    const organizationId = menu.id;
    this.setState({ submitting: true });
    BranchStore.deleteData(organizationId, currentRepo, name).then((data) => {
      this.setState({ submitting: false });
      this.loadData();
      this.closeRemove();
    }).catch((error) => {
      this.setState({ submitting: false });
      Choerodon.handleResponseError(error);
    });
  };

  handleCreateClick = () => {
    this.setState({
      createBranchVisible: true,
    });
  }

  render() {
    const { name } = AppState.currentMenuType;
    const { BranchStore, intl: { formatMessage }, history: { location: { state } } } = this.props;
    const {
      name: branchName, submitting, visible, repositoryList, currentRepo, createBranchVisible,
    } = this.state;
    const titleName = _.find(repositoryList, ['id', currentRepo]) ? _.find(repositoryList, ['id', currentRepo]).name : name;
    const backPath = state && state.backPath;
    return (
      <Page
        className="c7n-region c7n-branch"
      >
        {repositoryList && repositoryList.length && currentRepo ? (
          <Fragment>
            <Header
              title={<FormattedMessage id="branch.head" />}
              backPath={backPath}
            >
              <Select
                filter
                className="c7n-header-select"
                dropdownClassName="c7n-header-select_drop"
                placeholder={formatMessage({ id: 'ist.noApp' })}
                value={currentRepo}
                disabled={repositoryList.length === 0}
                onChange={this.loadData}
              >
                {
                  _.map(repositoryList, repo => (
                    <Option
                      key={repo.id}
                      value={repo.id}
                    >
                      {repo.name}
                    </Option>
                  ))
                }
              </Select>
              <Button
                onClick={this.handleCreateClick}
                icon="playlist_add"
              >
                创建分支
              </Button>
              <Button
                onClick={this.handleRefresh}
                icon="refresh"
              >
                <FormattedMessage id="refresh" />
              </Button>
            </Header>
            <Content code="branch.app" values={{ name: titleName }} className="page-content">
              {this.tableBranch()}
            </Content>

            <BranchCreate
              name={_.filter(repositoryList, app => app.id === currentRepo)[0].name}
              currentRepo={currentRepo}              
              visible={createBranchVisible}
              onClose={this.hideSidebar}
            />
            {/* {BranchStore.createBranchShow === 'edit' && (
              <BranchEdit
                name={branchName}
                appId={DevPipelineStore.selectedApp}
                store={BranchStore}
                visible={BranchStore.createBranchShow === 'edit'}
                onClose={this.hideSidebar}
              />
            )} */}        
     
            <Modal
              confirmLoading={submitting}
              visible={visible}
              title={`${formatMessage({ id: 'branch.action.delete' })}“${branchName}”`}
              closable={false}
              footer={[
                <Button key="back" onClick={this.closeRemove} disabled={submitting}>{<FormattedMessage id="cancel" />}</Button>,
                <Button key="submit" type="danger" onClick={this.handleDelete} loading={submitting}>
                  {formatMessage({ id: 'delete' })}
                </Button>,
              ]}
            >
              <div className="c7n-padding-top_8">{formatMessage({ id: 'branch.delete.tooltip' })}</div>
            </Modal>
          </Fragment>
        ) : <DepPipelineEmpty title={<FormattedMessage id="branch.head" />} type="app" />}
      </Page>
    );
  }
}

export default withRouter(injectIntl(Branch));
