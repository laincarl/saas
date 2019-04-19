
import { axios } from 'choerodon-front-boot';
/**
 *获取当前用户
 *
 * @export
 * @returns
 */
export function login() {
  return axios.post('/oauth/v1/login');
}
