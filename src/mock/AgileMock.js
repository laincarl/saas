// 使用 Mock
import Mock from 'mockjs';
import issues from './data/issues.json';

Mock.mock('http://api.alpha.saas.hand-china.com/agile/v1/projects/1/issues/include_sub?page=0&size=10&sort=', 'post', () => issues);
