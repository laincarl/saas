/**
 * Created by jaywoods on 2017/6/24.
 */
import {
  action, computed, get, observable, set, 
} from 'mobx';
import axios from '../components/axios';
import AppState from './AppState';

function getMenuType(menuType = AppState.currentMenuType, isUser = AppState.isTypeUser) {
  return isUser ? 'user' : menuType.type;
}

function filterEmptyMenus(menuData, parent) {
  const newMenuData = menuData.filter((item) => {
    const { name, type, subMenus } = item;
    return name !== null && (type === 'menu' || (subMenus !== null && filterEmptyMenus(subMenus, item).length > 0));
  });
  if (parent) {
    parent.subMenus = newMenuData;
  }
  return newMenuData;
}

class MenuStore {
  @observable menuGroup = {
    site: [],
    user: [],
    organization: {},
    project: [{ 
      id: 33,
      code: 'choerodon.code.agile',
      name: '敏捷管理',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 1,
      icon: 'agile',
      route: null,
      objectVersionNumber: 21,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{
        id: 36, code: 'choerodon.code.agile.backlog', name: '待办事项', level: 'project', parentId: 33, type: 'menu', sort: 1, icon: 'baseline-list_alt', route: '/agile/backlog', objectVersionNumber: 21, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 39, code: 'choerodon.code.agile.scrumboard', name: '活跃冲刺', level: 'project', parentId: 33, type: 'menu', sort: 2, icon: 'directions_run', route: '/agile/scrumboard', objectVersionNumber: 21, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 325, code: 'choerodon.code.agile.userStoryMap', name: '故事地图', level: 'project', parentId: 33, type: 'menu', sort: 3, icon: 'usermap', route: '/agile/usermap', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 38, code: 'choerodon.code.agile.issue', name: '问题管理', level: 'project', parentId: 33, type: 'menu', sort: 4, icon: 'assignment', route: '/agile/issue', objectVersionNumber: 21, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 40, code: 'choerodon.code.agile.release', name: '发布版本', level: 'project', parentId: 33, type: 'menu', sort: 5, icon: 'publish2', route: '/agile/release', objectVersionNumber: 21, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 376, code: 'choerodon.code.agile.reportboard', name: '报告工作台', level: 'project', parentId: 33, type: 'menu', sort: 6, icon: 'whatshot', route: '/agile/reportboard', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, {
        id: 97,
        code: 'choerodon.code.agile.setting',
        name: '设置',
        level: 'project',
        parentId: 33,
        type: 'dir',
        sort: 6,
        icon: 'settings',
        route: null,
        objectVersionNumber: 7,
        permissions: [],
        zhName: null,
        enName: null,
        subMenus: [{ 
          id: 37, code: 'choerodon.code.agile.component', name: '模块管理', level: 'project', parentId: 97, type: 'menu', sort: 7, icon: 'extension', route: '/agile/component', objectVersionNumber: 21, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
        }, { 
          id: 50, code: 'choerodon.code.agile.projectsetting', name: '项目设置', level: 'project', parentId: 97, type: 'menu', sort: 9, icon: 'folder_shared', route: '/agile/projectSetting', objectVersionNumber: 12, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
        }, { 
          id: 51, code: 'choerodon.code.agile.fastsearch', name: '快速搜索', level: 'project', parentId: 97, type: 'menu', sort: 10, icon: 'youtube_searched_for', route: '/agile/fastSearch', objectVersionNumber: 12, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
        }, {
          id: 403, code: 'choerodon.code.agile.messageNotification', name: '通知设置', level: 'project', parentId: 97, type: 'menu', sort: 11, icon: 'notifications', route: '/agile/messageNotification', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
        }, { 
          id: 52, code: 'choerodon.code.agile.issuelink', name: '问题链接', level: 'project', parentId: 97, type: 'menu', sort: 12, icon: 'link', route: '/agile/issueLink', objectVersionNumber: 12, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
        }],
        default: false, 
      }],
      default: true, 
    }, { 
      id: 693,
      code: 'choerodon.code.app-management',
      name: '应用管理',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 1,
      icon: 'apps',
      route: null,
      objectVersionNumber: 1,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{ 
        id: 722, code: 'choerodon.code.app-management.application', name: '应用', level: 'project', parentId: 693, type: 'menu', sort: 1, icon: 'widgets', route: '/devops/app', objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 723, code: 'choerodon.code.app-management.application-version', name: '应用版本', level: 'project', parentId: 693, type: 'menu', sort: 2, icon: 'version', route: '/devops/app-version', objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, { 
        id: 720, code: 'choerodon.code.app-management.application-release', name: '应用发布', level: 'project', parentId: 693, type: 'menu', sort: 4, icon: 'publish2', route: '/devops/app-release', objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 721, code: 'choerodon.code.app-management.application-market', name: '应用市场', level: 'project', parentId: 693, type: 'menu', sort: 5, icon: 'appmarket', route: '/devops/app-market', objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }],
      default: true,
    }, { 
      id: 57,
      code: 'choerodon.code.development-pipeline',
      name: '开发流水线',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 2,
      icon: 'wrench',
      route: null,
      objectVersionNumber: 8,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{
        id: 497, code: 'choerodon.code.development-pipeline.development-console', name: '开发控制台', level: 'project', parentId: 57, type: 'menu', sort: 1, icon: 'develop_console', route: '/devops/dev-console', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, {
        id: 82, code: 'choerodon.code.development-pipeline.repository', name: '代码仓库', level: 'project', parentId: 57, type: 'menu', sort: 2, icon: 'account_balance', route: '/devops/repository', objectVersionNumber: 7, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, { 
        id: 80, code: 'choerodon.code.development-pipeline.branch', name: '分支', level: 'project', parentId: 57, type: 'menu', sort: 3, icon: 'branch', route: '/devops/branch', objectVersionNumber: 7, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 83, code: 'choerodon.code.development-pipeline.tag', name: '标记', level: 'project', parentId: 57, type: 'menu', sort: 4, icon: 'local_offer', route: '/devops/tag', objectVersionNumber: 7, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 81, code: 'choerodon.code.development-pipeline.merge-request', name: '合并请求', level: 'project', parentId: 57, type: 'menu', sort: 5, icon: 'merge_request', route: '/devops/merge-request', objectVersionNumber: 7, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, {
        id: 60, code: 'choerodon.code.development-pipeline.continuous-integration', name: '持续集成', level: 'project', parentId: 57, type: 'menu', sort: 6, icon: 'CI', route: '/devops/ci-pipeline', objectVersionNumber: 8, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }],
      default: true, 
    }, {
      id: 59,
      code: 'choerodon.code.deployment-pipeline',
      name: '部署流水线',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 3,
      icon: 'cloud_upload',
      route: null,
      objectVersionNumber: 8,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{ 
        id: 211, code: 'choerodon.code.deployment-pipeline.environment-overview', name: '环境总览', level: 'project', parentId: 59, type: 'menu', sort: 1, icon: 'public', route: '/devops/env-overview', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 367, code: 'choerodon.code.deployment-pipeline.deployment-overview', name: '部署总览', level: 'project', parentId: 59, type: 'menu', sort: 2, icon: 'Operation-monitoring', route: '/devops/deploy-overview', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 66, code: 'choerodon.code.deployment-pipeline.application-deployment', name: '应用部署', level: 'project', parentId: 59, type: 'menu', sort: 3, icon: 'jsfiddle', route: '/devops/deployment-app', objectVersionNumber: 8, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 67, code: 'choerodon.code.deployment-pipeline.environment-pipeline', name: '环境流水线', level: 'project', parentId: 59, type: 'menu', sort: 4, icon: 'linear_scale', route: '/devops/env-pipeline', objectVersionNumber: 8, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 68, code: 'choerodon.code.deployment-pipeline.instance', name: '实例', level: 'project', parentId: 59, type: 'menu', sort: 5, icon: 'instance_outline', route: '/devops/instance', objectVersionNumber: 8, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, {
        id: 685,
        code: 'choerodon.code.deployment-pipeline.resource',
        name: '资源',
        level: 'project',
        parentId: 59,
        type: 'dir',
        sort: 5,
        icon: 'database',
        route: null,
        objectVersionNumber: 3,
        permissions: [],
        zhName: null,
        enName: null,
        subMenus: [{ 
          id: 65, code: 'choerodon.code.deployment-pipeline.service', name: '网络', level: 'project', parentId: 685, type: 'menu', sort: 6, icon: 'router', route: '/devops/service', objectVersionNumber: 8, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
        }, {
          id: 69, code: 'choerodon.code.deployment-pipeline.ingress', name: '域名', level: 'project', parentId: 685, type: 'menu', sort: 7, icon: 'language', route: '/devops/ingress', objectVersionNumber: 8, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
        }, { 
          id: 70, code: 'choerodon.code.deployment-pipeline.container', name: '容器', level: 'project', parentId: 685, type: 'menu', sort: 8, icon: 'kubernetes', route: '/devops/container', objectVersionNumber: 8, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
        }, { 
          id: 368, code: 'choerodon.code.deployment-pipeline.certificate', name: '证书', level: 'project', parentId: 685, type: 'menu', sort: 9, icon: 'class', route: '/devops/certificate', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
        }],
        default: false,
      }, {
        id: 686,
        code: 'choerodon.code.deployment-pipeline.configuration',
        name: '配置管理',
        level: 'project',
        parentId: 59,
        type: 'dir',
        sort: 6,
        icon: 'tune',
        route: null,
        objectVersionNumber: 3,
        permissions: [],
        zhName: null,
        enName: null,
        subMenus: [{ 
          id: 638, code: 'choerodon.code.deployment-pipeline.config-map', name: '配置映射', level: 'project', parentId: 686, type: 'menu', sort: 10, icon: 'compare_arrows', route: '/devops/config-map', objectVersionNumber: 3, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
        }, {
          id: 639, code: 'choerodon.code.deployment-pipeline.secret', name: '密文', level: 'project', parentId: 686, type: 'menu', sort: 11, icon: 'secret', route: '/devops/secret', objectVersionNumber: 3, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
        }],
        default: false,
      }],
      default: true, 
    }, {
      id: 75,
      code: 'choerodon.code.test-manager',
      name: '测试管理',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 4,
      icon: 'test',
      route: null,
      objectVersionNumber: 7,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{
        id: 92, code: 'choerodon.code.test-manager.summary', name: '测试摘要', level: 'project', parentId: 75, type: 'menu', sort: 1, icon: 'table_chart', route: '/testManager/summary', objectVersionNumber: 7, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 91, code: 'choerodon.code.test-manager.manager', name: '测试用例', level: 'project', parentId: 75, type: 'menu', sort: 2, icon: 'description', route: '/testManager/IssueManage', objectVersionNumber: 7, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 383, code: 'choerodon.code.test-manager.TestPlan', name: '测试计划', level: 'project', parentId: 75, type: 'menu', sort: 3, icon: 'test_planning', route: '/testManager/TestPlan', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 382, code: 'choerodon.code.test-manager.TestExecute', name: '测试执行', level: 'project', parentId: 75, type: 'menu', sort: 4, icon: 'test_execution', route: '/testManager/TestExecute', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 95, code: 'choerodon.code.test-manager.status', name: '自定义状态', level: 'project', parentId: 75, type: 'menu', sort: 6, icon: 'filter_vintage', route: '/testManager/status', objectVersionNumber: 7, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, {
        id: 657, code: 'choerodon.code.test-manager.autotest', name: '自动化测试', level: 'project', parentId: 75, type: 'menu', sort: 8, icon: 'auto_test', route: '/testManager/AutoTest/list', objectVersionNumber: 3, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }],
      default: true,
    }, { 
      id: 1,
      code: 'choerodon.code.prosetting',
      name: '项目设置',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 6,
      icon: 'IAM',
      route: null,
      objectVersionNumber: 24,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{ 
        id: 7, code: 'choerodon.code.prosetting.member-role-project', name: '项目角色分配', level: 'project', parentId: 1, type: 'menu', sort: 1, icon: 'person_add', route: '/iam/member-role', objectVersionNumber: 24, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 8, code: 'choerodon.code.prosetting.proManage', name: '项目信息', level: 'project', parentId: 1, type: 'menu', sort: 2, icon: 'settings_applications', route: '/iam/project-setting', objectVersionNumber: 24, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 655, code: 'choerodon.code.prosetting.saga-instance-project', name: '项目事务实例', level: 'project', parentId: 1, type: 'menu', sort: 3, icon: 'instance_outline', route: '/iam/saga-instance', objectVersionNumber: 3, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }],
      default: true,
    }, { 
      id: 469,
      code: 'choerodon.code.project-wiki-management',
      name: 'Wiki管理',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 7,
      icon: 'settings',
      route: null,
      objectVersionNumber: 5,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{ 
        id: 491, code: 'choerodon.code.project-wiki-management.space', name: 'Wiki空间', level: 'project', parentId: 469, type: 'menu', sort: 1, icon: 'book', route: '/wiki/project/space', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }],
      default: true, 
    }, {
      id: 473,
      code: 'choerodon.code.task-dispatch-project',
      name: '任务调度',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 7,
      icon: 'task_schedule',
      route: null,
      objectVersionNumber: 5,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{ 
        id: 505, code: 'choerodon.code.task-dispatch-project.task-detail-project', name: '任务明细', level: 'project', parentId: 473, type: 'menu', sort: 1, icon: 'subject', route: '/iam/task-detail', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }, {
        id: 503, code: 'choerodon.code.task-dispatch-project.execution-record-project', name: '执行记录', level: 'project', parentId: 473, type: 'menu', sort: 2, icon: 'work_log', route: '/iam/execution-record', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, {
        id: 504, code: 'choerodon.code.task-dispatch-project.task-classname-project', name: '可执行程序', level: 'project', parentId: 473, type: 'menu', sort: 3, icon: 'classname', route: '/iam/executable-program', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }],
      default: true, 
    }, { 
      id: 470,
      code: 'choerodon.code.platform-reports',
      name: '报表',
      level: 'project',
      parentId: 0,
      type: 'root',
      sort: 99,
      icon: 'bar_chart',
      route: null,
      objectVersionNumber: 5,
      permissions: [],
      zhName: null,
      enName: null,
      subMenus: [{
        id: 492, code: 'choerodon.code.platform-reports.reports', name: 'DevOps报表', level: 'project', parentId: 470, type: 'menu', sort: 2, icon: 'devops_chart', route: '/devops/reports', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, { 
        id: 493, code: 'choerodon.code.platform-reports.reportboard', name: '敏捷报表', level: 'project', parentId: 470, type: 'menu', sort: 3, icon: 'application_model', route: '/agile/reporthost', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
      }, {
        id: 494, code: 'choerodon.code.platform-reports.testreport', name: '测试管理报表', level: 'project', parentId: 470, type: 'menu', sort: 5, icon: 'baseline-list_alt', route: '/testManager/report', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
      }],
      default: true,
    }],
  };

  @observable collapsed = false;

  @observable activeMenu = null;

  @observable selected = null;

  @observable leftOpenKeys = [];

  @observable openKeys = [];

  @observable type = null;

  @observable isUser = null;

  @observable id = null;

  @action
  setCollapsed(collapsed) {
    this.collapsed = collapsed;
  }

  @action
  setActiveMenu(activeMenu) {
    this.activeMenu = activeMenu;
  }

  @action
  setSelected(selected) {
    this.selected = selected;
  }

  @action
  setLeftOpenKeys(leftOpenKeys) {
    this.leftOpenKeys = leftOpenKeys;
  }

  @action
  setOpenKeys(openKeys) {
    this.openKeys = openKeys;
  }

  @action
  setType(type) {
    this.type = type;
  }

  @action
  setIsUser(isUser) {
    this.isUser = isUser;
  }

  @action
  setId(id) {
    this.id = id;
  }

  @action
  loadMenuData(menuType = AppState.currentMenuType, isUser) {
    const type = getMenuType(menuType, isUser) || 'site';
    const { id = 0 } = menuType;
    const menu = this.menuData(type, id);
    if (menu.length) {
      return Promise.resolve(menu);
    }
    return axios.get(`/iam/v1/menus?level=${type}&source_id=${id}`).then(action((data) => {
      const child = filterEmptyMenus(data);
      this.setMenuData(child, type, id);
      return child;
    }));
  }

  @action
  setMenuData(child, childType, id = AppState.currentMenuType.id) {
    const data = filterEmptyMenus(child);
    if (id) {
      set(this.menuGroup[childType], id, data);
    } else {
      set(this.menuGroup, childType, data);
    }
  }

  @computed
  get getMenuData() {
    return this.menuData();
  }

  @computed
  get getSiteMenuData() {
    return this.menuData('site', 0);
  }

  menuData(type = getMenuType(), id = AppState.currentMenuType.id) {
    let data;
    if (type) {
      if (id) {
        data = get(this.menuGroup[type], id);
      } else {
        data = get(this.menuGroup, type);
      }
    }
    return data || [];
  }

  treeReduce(tree, callback, childrenName = 'subMenus', parents = []) {
    if (tree.code) {
      parents.push(tree);
    }
    return tree[childrenName].some((node, index) => {
      const newParents = parents.slice(0);
      if (node[childrenName] && node[childrenName].length > 0) {
        return this.treeReduce(node, callback, childrenName, newParents);
      }
      return callback(node, parents, index);
    });
  }
}

const menuStore = new MenuStore();

export default menuStore;
