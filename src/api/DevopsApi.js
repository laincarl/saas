import { axios } from 'choerodon-front-boot';
import AppState from '../stores/AppState';

/**
 * @export
 * @param {*} type all backlog active finished
 * @param {number} [page=0]
 * @param {number} [size=10]
 * @returns
 */
export function getRepositoryList() {
  return axios.get('/devops/v1/projects/list/all');
}
export function createRepository(data) {
  const {
    project_name, gitlab_project_name, user_id,
  } = data;
  return axios.post(`/devops/v1/projects?project_name=${project_name}&gitlab_project_name=${gitlab_project_name}&user_id=${user_id}`);
}
/**
 *获取单个用例详细信息
 *
 * @export
 * @param {*} issueId
 * @returns
 */
export function loadIssue(issueId) {
  return axios.get(`/devops/v1/issue/${issueId}`);
}
export function updateIssue(data) {
  return axios.put('/devops/v1/issue', data);
}
export function deleteRepository(id) {
  return axios.delete(`/devops/v1/projects/${id}`);
}

/**
 *
 *
 * @export
 * @returns
 */
export function getBranchs(id) {
  return axios.get(`/devops/v1/${id}/branch/all`);
}
export function createBranch(id, data) {
  const {
    name, source, user_id, issue_id,
  } = data;
  return axios.post(`/devops/v1/${id}/branch?name=${name}&source=${source}&user_id=${user_id}&issue_id=${issue_id}`);
}
export function getTags(id) {
  return axios.get(`/devops/v1/${id}/tags?user_id=${AppState.userInfo.id}`);
}
