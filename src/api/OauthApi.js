
import { axios } from 'choerodon-front-boot';

export function login(data) {
  return axios.post('/oauth/v1/login', data);
}
