import { axios } from 'choerodon-front-boot';
/**
 *获取当前用户
 *
 * @export
 * @returns
 */
export function getSelf() {
  return axios.get('/iam/v1/users/self');
}
/**
 *获取指定用户
 *
 * @export
 * @param {*} userId
 * @returns
 */
export function getUser(userId) {
  return axios.get(`iam/v1/projects/${1}/users?id=${userId}`);
}
/**
 *获取用户列表
 *
 * @export
 * @param {*} param
 * @returns
 */
export function getUsers(param) {
  if (param) {
    return axios.get(`/iam/v1/projects/${1}/users?size=40&param=${param}`);
  }
  return axios.get(`/iam/v1/projects/${1}/users?size=40`);
}
