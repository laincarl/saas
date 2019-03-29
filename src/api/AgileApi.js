import { axios } from 'choerodon-front-boot';
import '../mock/AgileMock';

export function loadIssues(page = 0, size = 10, searchDTO, orderField, orderType) {  
  return axios.post(`/agile/v1/projects/${1}/issues/include_sub?page=${page}&size=${size}`, searchDTO, {
    params: {
      sort: `${orderField && orderType ? `${orderField},${orderType}` : ''}`,
    },
  });
}
