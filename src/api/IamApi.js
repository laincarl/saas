import { axios } from 'choerodon-front-boot';

export function login(data) {
  return axios.post('/oauth/v1/login', data);
}
/**
 *获取当前用户
 *
 * @export
 * @returns
 */
export function getSelf() {
  return axios.get('/oauth/v1/user/detail');
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
    return axios.get(`/oauth/v1/list/all?size=40&page=0&param=${param}`);
  }
  return axios.get('/oauth/v1/list/all?size=40&page=0');
}
