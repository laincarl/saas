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

export function updateUser(data) {
  return axios.put('/oauth/v1/update', data);
}
export function checkEmail(email) {
  return axios.get(`/oauth/v1/check/email?email=${email}`);
}
export function updatePassword(user_id, password) {
  return axios.put(`/oauth/v1/update/password/${user_id}?password=${password}`);
}
export function createUser(data) {
  return axios.post('/oauth/v1/register', data);
}

/**
 *获取用户列表
 *
 * @export
 * @param {*} param
 * @returns
 */
export function getUsers({
  size = 40,
  page = 0,
} = {}) {
  return axios.get(`/oauth/v1/list/all?size=${size}&page=${page}`);
}
