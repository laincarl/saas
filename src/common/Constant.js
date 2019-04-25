export const STATUS = {
  1: {
    colour: 'rgb(255, 177, 0)',    
    name: '待处理',
  },
  2: {
    colour: 'rgb(77, 144, 254)',    
    name: '执行中',
  },
  3: {
    colour: 'rgb(0, 191, 165)',    
    name: '已完成',
  },
  4: {
    colour: '#F67F5A',    
    name: '失败',
  },
};

export const COLOR = {
  medium: {
    color: '#3575df',
    bgColor: 'rgba(77, 144, 254, 0.2)',
  },
  high: {
    color: '#ffb100',
    bgColor: 'rgba(255, 177, 0, 0.12)',
  },
  low: {
    color: 'rgba(0, 0, 0, 0.36)',
    bgColor: 'rgba(0, 0, 0, 0.08)',
  },
};
export const ISSUE_TYPES = {
  0: {
    colour: 'rgb(77, 144, 254)',
    description: '任务',
    icon: 'agile_task',
    name: '任务',
    typeCode: 'task',
  },
  1: {
    colour: 'rgb(77, 144, 254)',
    description: '测试',
    icon: 'test-case',
    name: '测试',
    typeCode: 'test',
  },
};
export const TYPE = {
  story: '#00bfa5',
  bug: '#f44336',
  task: '#4d90fe',
  issue_epic: '#743be7',
  sub_task: '#4d90fe',
};

export const ICON = {
  story: 'book',
  bug: 'bug_report',
  task: 'check',
  issue_epic: 'priority',
  sub_task: 'relation',
};

export const TYPE_NAME = {
  story: '故事',
  bug: '故障',
  task: '任务',
  issue_epic: '史诗',
  sub_task: '子任务',
};

export const SERVICES_URL = 'SERVICES_URL_EXAMPLE';
