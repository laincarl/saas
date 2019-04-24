import { axios } from 'choerodon-front-boot';
import '../mock/AgileMock';
/**
 * 
 *
 * @export
 * @param {*} type all backlog active finished
 * @param {number} [page=0]
 * @param {number} [size=10]
 * @returns
 */
export function getIssues(type, page = 0, size = 10) {  
  return axios.get(`/agile/v1/issue/list/${type}?page=${page}&size=${size}`);
}
export function createIssue(data) {
  return axios.post('/agile/v1/issue', data);
}
/**
 *获取单个用例详细信息
 *
 * @export
 * @param {*} issueId
 * @returns
 */
export function loadIssue(issueId) {
  return axios.get(`/agile/v1/issue/${issueId}`);
}
export function updateIssue(data) {
  return axios.put('/agile/v1/issue', data);
}
export function deleteIssue(id) {
  return axios.delete(`/agile/v1/issue/${id}`);
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
