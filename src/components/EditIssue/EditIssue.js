/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { stores } from 'choerodon-front-boot';
import _ from 'lodash';
import {
  Select, Input, Button, Modal, Tooltip, Dropdown, Menu, Spin, Icon, Popover,
} from 'choerodon-ui';
import './EditIssue.scss';
import TimeAgo from 'components/DateTimeAgo/DateTimeAgo';
import User from 'components/User';
import TextEditToggle from '../TextEditToggle';
import CreateBranch from '../CreateBranch';
import {
  updateStatus, updateIssue,
  deleteIssue, loadStatus, cloneIssue,
} from '@/api/agileApi';
import { getUsers } from '@/api/IamApi';

import UserHead from '../UserHead';
import PriorityTag from '../PriorityTag';
import StatusTag from '../StatusTag';
import TypeTag from '../TypeTag';

const { AppState } = stores;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
let sign = true;
let filterSign = false;
const { Text, Edit } = TextEditToggle;
const navs = [
  { code: 'detail', tooltip: '详情', icon: 'error_outline' },
  { code: 'branch', tooltip: '分支', icon: 'branch' },
];

class EditIssue extends Component {
  state = {
    issueLoading: false,
    selectLoading: true,
    FullEditorShow: false,
    createLinkTaskShow: false,
    createBranchShow: false,
    currentNav: 'detail',
    StatusList: [],
    priorityList: [],
    userList: [],
    branchs: {
      branchCount: 1,
      commitUpdateTime: null,
      mergeRequestStatus: null,
      mergeRequestUpdateTime: null,
      totalCommit: 0,
      totalMergeRequest: 0,
    },
  }

  debounceFilterIssues = _.debounce((input) => {
    this.setState({
      selectLoading: true,
    });
    getUsers(input).then((res) => {
      this.setState({
        userList: res.content,
        selectLoading: false,
      });
    });
  }, 500);

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    document.getElementById('scroll-area').addEventListener('scroll', (e) => {
      if (sign) {
        const currentNav = this.getCurrentNav(e);
        if (this.state.currentNav !== currentNav && currentNav) {
          this.setState({
            currentNav,
          });
        }
      }
    });
  }

  componentWillUnmount() {
    document.getElementById('scroll-area').removeEventListener('scroll', (e) => {
      if (sign) {
        const currentNav = this.getCurrentNav(e);
        if (this.state.currentNav !== currentNav && currentNav) {
          this.setState({
            currentNav,
          });
        }
      }
    });
  }


  onFilterChange(input) {
    if (!filterSign) {
      this.setState({
        selectLoading: true,
      });
      getUsers(input).then((res) => {
        this.setState({
          userList: res.content,
          selectLoading: false,
        });
      });
      filterSign = true;
    } else {
      this.debounceFilterIssues(input);
    }
  }

  getCurrentNav(e) {
    return _.find(navs.map(nav => nav.code), i => this.isInLook(document.getElementById(i)));
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      const anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        sign = false;
        anchorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          // inline: "nearest",
        });
        setTimeout(() => {
          sign = true;
        }, 2000);
      }
    }
  }

  /**
   *更新用例信息
   * @param newValue 例 { statusId: 1 }
   * @memberof EditIssueNarrow
   */
  editIssue = (newValue, done) => {
    const key = Object.keys(newValue)[0];
    const value = newValue[key];
    const { issueInfo } = this.props;
    let issue = issueInfo;
    if (key === 'name' && value === '') {
      Choerodon.prompt('用例名不可为空！');
      done();
      return;
    }
    issue = { ...issue, ...newValue };
    this.setState({
      issueLoading: true,
    });
    updateIssue(issue)
      .then((res) => {
        this.props.reloadIssue();
        this.setState({
          issueLoading: false,
        });
        if (this.props.onUpdate) {
          this.props.onUpdate();
        }
      }).catch(() => {
        this.setState({
          issueLoading: false,
        });
        done();
      });
  }


  handleCopyIssue() {
    this.props.reloadIssue();
    if (this.props.onUpdate) {
      this.props.onUpdate();
    }
    if (this.props.onCopyAndTransformToSubIssue) {
      this.props.onCopyAndTransformToSubIssue();
    }
  }


  handleClickMenu(e) {
    const { issueInfo } = this.props;
    const { issueId } = issueInfo;
    switch (e.key) {
      case 'copy': {
        const copyConditionDTO = {
          issueLink: false,
          sprintValues: false,
          subTask: false,
          summary: false,
        };
        this.setState({
          issueLoading: true,
        });
        cloneIssue(issueId, copyConditionDTO).then((res) => {
        // 跳转至复制后的页面
          if (res.issueId) {
            this.handleLinkToNewIssue(res.issueId);
          }
          Choerodon.prompt('复制成功');
        }).catch((err) => {
          this.setState({
            issueLoading: false,
          });
          Choerodon.prompt('网络错误');
        });
        break;
      }
      case 'delete': {
        this.handleDeleteIssue(issueId);
        break;
      }
      default: break;
    }
  }


handleDeleteIssue = (issueId) => {
  const { issueInfo, history } = this.props;
  const { issueNum } = issueInfo;
  const that = this;

  confirm({
    width: 560,
    title: `删除测试用例${issueNum}`,
    content: '这个测试用例将会被彻底删除。包括所有步骤和相关执行',
    onOk: () => deleteIssue(issueId)
      .then((res) => {

      }),
    okText: '删除',
    okType: 'danger',
  });
}


/**
 * 加载可以转换的状态
 *
 * @memberof EditIssueNarrow
 */
loadTransformsByStatusId = (statusId) => {
  const { issueInfo } = this.props;
  const { issueTypeDTO, issueId } = issueInfo;

  const typeId = issueTypeDTO.id;
  loadStatus(statusId, issueId, typeId).then((res) => {
    this.setState({
      StatusList: res,
      selectLoading: false,
    });
  });
}

transToArr(arr, pro, type = 'string') {
  if (typeof arr !== 'object') {
    return '';
  }
  if (!arr.length) {
    return type === 'string' ? '无' : [];
  } else if (typeof arr[0] === 'object') {
    return type === 'string' ? _.map(arr, pro).join() : _.map(arr, pro);
  } else {
    return type === 'string' ? arr.join() : arr;
  }
}

isInLook(ele) {
  const a = ele.offsetTop;
  const target = document.getElementById('scroll-area');
  // return a >= target.scrollTop && a < (target.scrollTop + target.offsetHeight);
  return a + ele.offsetHeight > target.scrollTop;
}

/**
 *左侧导航锚点
 *
 * @memberof EditIssueNarrow
 */
renderNavs = () => navs.map(nav => (
  <Tooltip placement="right" title={nav.tooltip}>
    <li id="DETAILS-nav" className={`c7ntest-li ${this.state.currentNav === nav.code ? 'c7ntest-li-active' : ''}`}>
      <Icon
        type={`${nav.icon} c7ntest-icon-li`}
        role="none"
        onClick={() => {
          this.setState({ currentNav: nav.code });
          this.scrollToAnchor(nav.code);
        }}
      />
    </li>
  </Tooltip>
))

/**
 *用例状态更改
 *
 * @memberof EditIssueNarrow
 */
renderSelectStatus = () => {
  const {
    StatusList, selectLoading, disabled,
  } = this.state;
  const { issueInfo } = this.props;
  const { mode } = this.props;
  const { statusId } = issueInfo;

  const Tag = StatusTag;
  return (
    <TextEditToggle
      style={{ width: '100%' }}
      formKey="statusId"
      onSubmit={(value, done) => { this.editIssue({ statusId: value }, done); }}
      originData={statusId}
    >
      <Text>
        {data => (
          <div>
            <Tag status={data} />
          </div>
        )}
      </Text>
      <Edit>
        <Select style={{ width: 150 }}>
          <Option value={1}>待处理</Option>
          <Option value={2}>执行中</Option>
          <Option value={3}>已完成</Option>
          <Option value={4}>失败</Option>
        </Select>
      </Edit>
    </TextEditToggle>
  );
}

/**
 *用例优先级更改
 *
 * @memberof EditIssueNarrow
 */
renderSelectPriority = () => {
  const {
    priorityList, selectLoading, disabled,
  } = this.state;
  const { issueInfo } = this.props;
  const { priorityId } = issueInfo;
  return (
    <TextEditToggle
      style={{ width: '100%' }}
      formKey="priorityId"
      onSubmit={(value, done) => { this.editIssue({ priorityId: value }, done); }}
      originData={priorityId}
    >
      <Text>
        {data => (
          <div>
            <PriorityTag priority={data} />
          </div>
        )}
      </Text>
      <Edit>
        <Select style={{ width: 150 }}>
          <Option value={1}>低</Option>
          <Option value={2}>中</Option>
          <Option value={3}>高</Option>
        </Select>
      </Edit>
    </TextEditToggle>
  );
}


/**
 *报告人更改
 *
 * @memberof EditIssueNarrow
 */
renderSelectPerson = (type) => {
  const {
    userList, selectLoading, disabled,
  } = this.state;
  const { issueInfo } = this.props;
  const { id, name } = issueInfo.reporter || {};

  const userOptions = userList.map(user => (
    <Option key={user.id} value={user.id}>
      <User user={user} />
    </Option>
  ));
  const targetUser = _.find(userList, { id });
  let showUser = id || '无';
  // 当存在用户且列表没找到
  if (id && !targetUser) {
    showUser = (
      <UserHead
        user={{
          id,
          name,
        }}
      />
    );
  }
  return (
    <TextEditToggle
      formKey="reporterId"
      onSubmit={(newValue, done) => { this.editIssue({ reporterId: newValue || 0 }, done); }}
      originData={showUser}
    >
      <Text>
        {(data) => {
          if (data) {
            const tempShowUser = _.find(userList, { id: data });
            return tempShowUser ? (
              <User user={tempShowUser} />
            ) : data;
          } else {
            return '无';
          }
        }}
      </Text>
      <Edit>
        <Select
          filter
          allowClear
          autoFocus
          filterOption={false}
          onFilterChange={(value) => {
            this.setState({
              selectLoading: true,
            });
            getUsers(value).then((res) => {
              this.setState({
                userList: res.content,
                selectLoading: false,
              });
            });
          }}
          loading={selectLoading}
          style={{ width: 200 }}
        >
          {userOptions}
        </Select>
      </Edit>
    </TextEditToggle>
  );
}

/**
 *指派人更改
 *
 * @memberof EditIssueNarrow
 */
renderSelectAssign = () => {
  const {
    userList, selectLoading, disabled,
  } = this.state;
  const { issueInfo } = this.props;
  const { id, name } = issueInfo.handler || {};
  const userOptions = userList.map(user => (
    <Option key={user.id} value={user.id}>
      <User user={user} />
    </Option>
  ));
  const targetUser = _.find(userList, { id });
  let showUser = id || '无';
  // 当存在用户且列表没找到
  if (id && !targetUser) {
    showUser = (
      <UserHead
        user={{
          id,
          name,
        }}
      />
    );
  }
  return (
    <TextEditToggle
      // disabled={disabled}
      formKey="handlerId"
      onSubmit={(newValue, done) => { this.editIssue({ handlerId: newValue || 0 }, done); }}
      originData={showUser}
    >
      <Text>
        {(data) => {
          if (data) {
            const tempShowUser = _.find(userList, { id: data });
            return tempShowUser ? (
              <User user={tempShowUser} />
            ) : data;
          } else {
            return '无';
          }
        }}
      </Text>
      <Edit>
        <Select
          filter
          allowClear
          autoFocus
          filterOption={false}
          onFilterChange={(value) => {
            this.setState({
              selectLoading: true,
            });
            getUsers(value).then((res) => {
              this.setState({
                userList: res.content,
                selectLoading: false,
              });
            });
          }}
          loading={selectLoading}
          style={{ width: 200 }}
        >
          {userOptions}
        </Select>
      </Edit>
    </TextEditToggle>
  );
}

renderBranchs() {
  const { branchs } = this.state;
  return (
    <div>
      {
        branchs.branchCount ? (
          <div>
            {
              [].length === 0 ? (
                <div style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)', display: 'flex', padding: '8px 26px', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px',
                }}
                >
                  <div style={{ display: 'inline-flex', justifyContent: 'space-between', flex: 1 }}>
                    <span
                      style={{ color: '#3f51b5', cursor: 'pointer' }}
                      role="none"
                      onClick={() => {
                        this.setState({
                          commitShow: true,
                        });
                      }}
                    >
                      {branchs.totalCommit || '0'}
                      {'提交'}
                    </span>
                  </div>
                  <div style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                    <span style={{ marginRight: 12, marginLeft: 63 }}>已更新</span>
                    <span style={{ width: 60, display: 'inline-block' }}>
                      {
                        branchs.commitUpdateTime ? (
                          <Popover
                            title="提交修改时间"
                            content={branchs.commitUpdateTime}
                            placement="left"
                          >
                            <TimeAgo
                              datetime={branchs.commitUpdateTime}
                              locale={Choerodon.getMessage('zh_CN', 'en')}
                            />
                          </Popover>
                        ) : ''
                      }
                    </span>
                  </div>
                </div>
              ) : null
            }
            {
              branchs.totalMergeRequest ? (
                <div style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)', display: 'flex', padding: '8px 26px', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px',
                }}
                >
                  <div style={{ display: 'inline-flex', justifyContent: 'space-between', flex: 1 }}>
                    <span
                      style={{ color: '#3f51b5', cursor: 'pointer' }}
                      role="none"
                      onClick={() => {
                        this.setState({
                          mergeRequestShow: true,
                        });
                      }}
                    >
                      {branchs.totalMergeRequest}
                      {'合并请求'}
                    </span>
                    <span style={{
                      width: 36, height: 20, borderRadius: '2px', color: '#fff', background: '#4d90fe', textAlign: 'center',
                    }}
                    >
                      {['opened', 'merged', 'closed'].includes(branchs.mergeRequestStatus) ? STATUS_SHOW[branchs.mergeRequestStatus] : ''}
                    </span>
                  </div>
                  <div style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                    <span style={{ marginRight: 12, marginLeft: 63 }}>已更新</span>
                    <span style={{ width: 60, display: 'inline-block' }}>
                      {
                        branchs.mergeRequestUpdateTime ? (
                          <Popover
                            title="合并请求修改时间"
                            content={branchs.mergeRequestUpdateTime}
                            placement="left"
                          >
                            <TimeAgo
                              datetime={branchs.mergeRequestUpdateTime}
                              locale={Choerodon.getMessage('zh_CN', 'en')}
                            />
                          </Popover>
                        ) : ''
                      }
                    </span>
                  </div>
                </div>
              ) : null
            }
          </div>
        ) : (
          <div style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)', display: 'flex', padding: '8px 26px', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px',
          }}
          >
            <span style={{ marginRight: 12 }}>暂无</span>
          </div>
        )
      }
    </div>
  );
}

render() {
  const {
    issueLoading, FullEditorShow, createLinkTaskShow,
    currentNav, createBranchShow,
  } = this.state;
  const {
    loading, issueId, issueInfo, fileList, disabled, linkIssues, folderName,
  } = this.props;
  const {
    issueNum, name, creationDate, lastUpdateDate, description, type,
    priority, issueTypeDTO, statusMapDTO, versionIssueRelDTOList,
    issueAttachmentDTOList,
  } = issueInfo || {};
  const {
    name: statusName, id: statusId, colour: statusColor, icon: statusIcon,
    type: statusCode,
  } = statusMapDTO || {};
  const { colour: priorityColor } = priority || {};
  const typeCode = issueTypeDTO ? issueTypeDTO.typeCode : '';
  const typeColor = issueTypeDTO ? issueTypeDTO.colour : '#fab614';
  const typeIcon = issueTypeDTO ? issueTypeDTO.icon : 'help';
  const { mode } = this.props;
  const getMenu = () => (
    <Menu onClick={this.handleClickMenu.bind(this)}>
      {/* <Menu.Item key="add_worklog">
          <FormattedMessage id="issue_edit_addWworkLog" />
        </Menu.Item> */}
      <Menu.Item key="copy">
        复制问题
      </Menu.Item>
      {
        <Menu.Item
          key="delete"
        >
          {'删除'}
        </Menu.Item>
      }
    </Menu>
  );
  return (
    <div className="c7ntest-editIssue">
      {
        issueLoading ? (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.65)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin />
          </div>
        ) : null
      }
      <div className="c7ntest-nav">
        <div>
          <div style={{
            height: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(0,0,0,0.26)',
          }}
          >
            <TypeTag type={type} />
          </div>
        </div>
        <ul className="c7ntest-nav-ul">
          {this.renderNavs()}

        </ul>
      </div>
      <div className="c7ntest-content">
        <div className="c7ntest-content-top">
          <div className="c7ntest-header-editIssue">
            <div className="c7ntest-content-editIssue" style={{ overflowY: 'hidden' }}>
              <div
                className="line-justify"
                style={{
                  alignItems: 'center',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  marginLeft: '-20px',
                  marginRight: '-20px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.26)',
                  height: 44,
                }}
              >
                {/* issueNum 用例编号 */}
                <div style={{ fontSize: 16, lineHeight: '28px', fontWeight: 500 }}>
                  <span>{issueNum}</span>
                </div>
                <div
                  style={{
                    cursor: 'pointer', fontSize: '13px', lineHeight: '20px', display: 'flex', alignItems: 'center',
                  }}
                  role="none"
                  onClick={() => this.props.onClose()}
                >
                  <Icon type="last_page" style={{ fontSize: '18px', fontWeight: '500' }} />
                  隐藏详情
                </div>
              </div>
              <div className="line-justify" style={{ marginBottom: 5, alignItems: 'center', marginTop: 10 }}>
                <TextEditToggle
                  style={{ width: '100%' }}
                  formKey="summary"
                  onSubmit={(value, done) => { this.editIssue({ name: value }, done); }}
                  originData={name}
                >
                  <Text>
                    {data => (
                      <div className="c7ntest-summary">
                        {data}
                      </div>
                    )}
                  </Text>
                  <Edit>
                    <TextArea maxLength={44} size="small" autoFocus />
                  </Edit>
                </TextEditToggle>
                <div style={{ flexShrink: 0, color: 'rgba(0, 0, 0, 0.65)' }}>
                  <Dropdown overlay={getMenu()} trigger={['click']}>
                    <Button icon="more_vert" />
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c7ntest-content-bottom" id="scroll-area" style={{ position: 'relative' }}>
          <section className="c7ntest-body-editIssue">
            <div className="c7ntest-content-editIssue">
              <div className="c7ntest-details">
                <div id="detail">
                  <div className="c7ntest-title-wrapper" style={{ marginTop: 0 }}>
                    <div className="c7ntest-title-left">
                      <Icon type="error_outline c7ntest-icon-title" />
                      详情
                    </div>
                    <div style={{
                      flex: 1, height: 1, borderTop: '1px solid rgba(0, 0, 0, 0.08)', marginLeft: '14px',
                    }}
                    />
                  </div>
                  <div className="c7ntest-content-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* 状态 */}
                    <div style={{ flex: 1 }}>
                      <div>
                        <div className="line-start mt-10">
                          <div className="c7ntest-property-wrapper">
                            <span className="c7ntest-property">
                              {'状态：'}
                            </span>
                          </div>
                          <div className="c7ntest-value-wrapper">
                            {this.renderSelectStatus()}
                          </div>
                        </div>

                        {/* 优先级 */}
                        <div className="line-start mt-10">
                          <div className="c7ntest-property-wrapper">
                            <span className="c7ntest-property">优先级：</span>
                          </div>
                          <div className="c7ntest-value-wrapper">
                            {this.renderSelectPriority()}
                          </div>
                        </div>

                      </div>
                      {/* 报告人 */}
                      <div className="line-start mt-10 assignee">
                        <div className="c7ntest-property-wrapper">
                          <span className="c7ntest-property">
                            报告人
                            {'：'}
                          </span>
                        </div>
                        <div className="c7ntest-value-wrapper" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                          {this.renderSelectPerson()}
                          <span
                            role="none"
                            style={{
                              color: '#3f51b5',
                              cursor: 'pointer',
                              marginTop: '-2px',
                              display: 'inline-block',
                            }}
                            onClick={() => {
                              this.editIssue({ reporterId: AppState.userInfo.id });
                            }}
                          >
                            分配给我
                          </span>
                        </div>
                      </div>
                      <div className="line-start mt-10 assignee">
                        <div className="c7ntest-property-wrapper">
                          <span className="c7ntest-property">
                            经办人
                            {'：'}
                          </span>
                        </div>
                        <div className="c7ntest-value-wrapper" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                          {this.renderSelectAssign()}
                          <span
                            role="none"
                            style={{
                              color: '#3f51b5',
                              cursor: 'pointer',
                              marginTop: '-2px',
                              display: 'inline-block',
                            }}
                            onClick={() => {
                              this.editIssue({ handlerId: AppState.userInfo.id });
                            }}
                          >
                            分配给我
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* --- */}
                    <div style={{ flex: 1 }}>
                      {/* 日期 */}
                      <div className="line-start mt-10">
                        <div className="c7ntest-property-wrapper">
                          <span className="c7ntest-subtitle">
                            日期
                          </span>
                        </div>
                      </div>

                      <div className="line-start mt-10">
                        <div className="c7ntest-property-wrapper">
                          <span className="c7ntest-property">
                            创建时间
                            {'：'}
                          </span>
                        </div>
                        <div className="c7ntest-value-wrapper">
                          {/* {formatDate(creationDate)} */}
                          <TimeAgo date={creationDate} />
                        </div>
                      </div>
                      <div className="line-start mt-10">
                        <div className="c7ntest-property-wrapper">
                          <span className="c7ntest-property">
                            更新时间
                            {'：'}
                          </span>
                        </div>
                        <div className="c7ntest-value-wrapper">
                          {/* {formatDate(lastUpdateDate)} */}
                          <TimeAgo date={lastUpdateDate} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="branch">
                  <div className="c7ntest-title-wrapper">
                    <div className="c7ntest-title-left">
                      <Icon type="branch c7ntest-icon-title" />
                      <span>开发</span>
                    </div>
                    <div style={{
                      flex: 1, height: 1, borderTop: '1px solid rgba(0, 0, 0, 0.08)', marginLeft: '14px',
                    }}
                    />
                    <div className="c7ntest-title-right" style={{ marginLeft: '14px' }}>
                      <Button className="leftBtn" funcType="flat" onClick={() => this.setState({ createBranchShow: true })}>
                        <Icon type="playlist_add icon" />
                        <span>创建分支</span>
                      </Button>
                    </div>
                  </div>
                  {this.renderBranchs()}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {
        createBranchShow ? (
          <CreateBranch
            issueId={origin.issueId}
            typeCode={typeCode}
            issueNum={origin.issueNum}
            onOk={() => {
              this.setState({ createBranchShow: false });
              this.reloadIssue();
            }}
            onCancel={() => this.setState({ createBranchShow: false })}
            visible={createBranchShow}
          />
        ) : null
      }
    </div>
  );
}
}
export default withRouter(EditIssue);
