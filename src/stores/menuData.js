const data = {
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
      id: 38, code: 'choerodon.code.agile.issue', name: '结束事项', level: 'project', parentId: 33, type: 'menu', sort: 4, icon: 'assignment', route: '/agile/issue', objectVersionNumber: 21, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
    }, {
      id: 325, code: 'choerodon.code.agile.userStoryMap', name: '故事地图', level: 'project', parentId: 33, type: 'menu', sort: 3, icon: 'usermap', route: '/agile/usermap', objectVersionNumber: 5, permissions: [], zhName: null, enName: null, subMenus: null, default: true,
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
  }],
  user: [{
    id: 2,
    code: 'choerodon.code.usercenter',
    name: '个人中心',
    level: 'user',
    parentId: 0,
    type: 'root',
    sort: 1,
    icon: 'accessibility',
    route: null,
    category: null,
    objectVersionNumber: 1,
    permissions: [],
    zhName: null,
    enName: null,
    subMenus: [{
      id: 10, code: 'choerodon.code.usercenter.user-info', name: '个人信息', level: 'user', parentId: 2, type: 'menu', sort: 1, icon: 'person', route: '/iam/user-info', category: null, objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
    }, {
      id: 9, code: 'choerodon.code.usercenter.password', name: '修改密码', level: 'user', parentId: 2, type: 'menu', sort: 2, icon: 'vpn_key', route: '/iam/password', category: null, objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
    }, {
      id: 923, code: 'choerodon.code.usercenter.permission-info', name: '权限信息', level: 'user', parentId: 2, type: 'menu', sort: 3, icon: 'project', route: '/iam/permission-info', category: null, objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
    }, {
      id: 672, code: 'choerodon.code.usercenter.token-manager', name: '授权管理', level: 'user', parentId: 2, type: 'menu', sort: 4, icon: 'authority', route: '/iam/token-manager', category: null, objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
    }, {
      id: 396, code: 'choerodon.code.usercenter.user-msg', name: '消息通知', level: 'user', parentId: 2, type: 'menu', sort: 6, icon: 'message_notification', route: '/iam/user-msg', category: null, objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
    }, {
      id: 496, code: 'choerodon.code.usercenter.receive-setting', name: '接收设置', level: 'user', parentId: 2, type: 'menu', sort: 7, icon: 'settings', route: '/iam/receive-setting', category: null, objectVersionNumber: 1, permissions: [], zhName: null, enName: null, subMenus: null, default: true, 
    }],
    default: true, 
  }],
};
export default data;
