import { ACCESS_TOKEN, AUTH_HOST, AUTH_URL } from './constants';
import { getCookieToken, removeAccessToken } from './accessToken';

export function authorize() {
  // 为了把这个hash传到oauth里要把#换成%23
  const uri = escape(window.location.href); 
  if (window.location.href.indexOf('#/login') !== -1) {
    return;
  }
  if (window.location.href.indexOf('?') === -1) {
    window.location = `${AUTH_URL}?redirect_uri=${uri}`;
  } else {
    window.location = `${AUTH_URL}&redirect_uri=${uri}`;
  }
}

/**
 * 登出
 */
export function logout() {
  // const token = getCookieToken();
  const logoutUrl = '#/login';
  // if (token) {
  //   logoutUrl += `?${ACCESS_TOKEN}=${getCookieToken()}`;
  // }
  removeAccessToken();
  localStorage.clear();
  sessionStorage.clear();
  window.location = logoutUrl;
}
