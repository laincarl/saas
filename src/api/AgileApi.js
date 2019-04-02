import { axios } from 'choerodon-front-boot';
import '../mock/AgileMock';

export function getIssues(page = 0, size = 10, searchDTO, orderField, orderType) {  
  return axios.post(`/agile/v1/projects/${1}/issues/include_sub?page=${page}&size=${size}`, searchDTO, {
    params: {
      sort: `${orderField && orderType ? `${orderField},${orderType}` : ''}`,
    },
  });
}
/**
 *获取单个用例详细信息
 *
 * @export
 * @param {*} issueId
 * @returns
 */
export function loadIssue(issueId) {
  return axios.get(`/agile/v1/projects/${1}/issues/${1}`);
}
/**
 *获取当前组织的issue优先级
 *
 * @export
 * @returns
 */
export function getPrioritys() {
  return axios.get(`/issue/v1/projects/${1}/priority/list_by_org`);
}
