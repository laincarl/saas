// 使用 Mock
import Mock from 'mockjs';
import issues from './data/issues.json';

Mock.mock('http://api.alpha.saas.hand-china.com/agile/v1/projects/1/issues/include_sub?page=0&size=10&sort=', 'post', () => issues);
Mock.mock('http://api.alpha.saas.hand-china.com/agile/v1/projects/1/issues/1', 'get', { 
  issueId: 47646,
  issueNum: 'AG-4949',
  typeCode: 'sub_task',
  statusId: 4,
  summary: '初始化issue系统字段',
  reporterId: 7097,
  reporterName: '16376陈士男',
  description: '',
  assigneeId: 7097,
  assigneeName: '16376陈士男',
  projectId: 28,
  epicId: 0,
  parentIssueId: 40721,
  storyPoints: null,
  versionIssueRelDTOList: [{
    versionId: 364, issueId: 47646, name: '0.16.0', projectId: 28, relationType: 'fix', statusCode: 'version_planning',
  }],
  activeSprint: { 
    sprintId: 1857, sprintName: '3/25-4/4冲刺 18', startDate: null, endDate: null, statusCode: null,
  },
  closeSprint: [],
  labelIssueRelDTOList: [],
  componentIssueRelDTOList: [],
  issueCommentDTOList: [],
  issueAttachmentDTOList: [],
  subIssueDTOList: [],
  objectVersionNumber: 1,
  creationDate: '2019-04-01 17:11:52',
  lastUpdateDate: '2019-04-01 17:11:52',
  estimateTime: null,
  remainingTime: 6.0,
  epicName: null,
  color: null,
  epicColor: null,
  sprintName: null,
  parentIssueNum: 'AG-4482',
  assigneeImageUrl: 'https://minio.choerodon.com.cn/iam-service/da73b005eb2b4ac8a890bd64d9306e97_%3F%3F%3F.png',
  reporterImageUrl: 'https://minio.choerodon.com.cn/iam-service/da73b005eb2b4ac8a890bd64d9306e97_%3F%3F%3F.png',
  createrImageUrl: 'https://minio.choerodon.com.cn/iam-service/da73b005eb2b4ac8a890bd64d9306e97_%3F%3F%3F.png',
  createrName: '16376陈士男',
  priorityId: 8,
  issueTypeId: 17,
  priorityDTO: {
    id: 8, name: '中', description: '中', colour: '#3575DF', organizationId: 4, objectVersionNumber: 1, sequence: 1, enable: true, default: true,
  },
  issueTypeDTO: { 
    id: 17, name: '子任务', icon: 'agile_subtask', description: '子任务', organizationId: 4, colour: '#4d90fe', typeCode: 'sub_task', initialize: null, objectVersionNumber: 1,
  },
  statusMapDTO: {
    id: 4, name: '待处理', code: 'create', description: '待处理', type: 'todo', organizationId: 4, objectVersionNumber: 1, completed: null, canDelete: null,
  },
  createdBy: 7097,
  applyType: 'agile',
  createrEmail: 'shinan.chen@hand-china.com',
  featureDTO: null,
});
