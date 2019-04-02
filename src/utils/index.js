import Page from 'components/Page';
import { message } from 'choerodon-ui';
import AppState from 'stores/AppState';
import nomatch from 'nomatch';
// 提示错误信息
function prompt(content, type = 'info', duration, placement = 'leftBottom', onClose) {
  const messageType = ['success', 'error', 'info', 'warning', 'warn', 'loading'];
  if (messageType.indexOf(type) !== -1) {
    message[type](content, duration, onClose, placement);
  }
}
/**
 * @deprecated
 * 返回多语言字符串
 */
function getMessage(zh, en) {
  const language = 'zh';
  if (language === 'zh') {
    return zh;
  } else if (language === 'en') {
    return en;
  }
  return false;
}
// 处理错误相应
function handleResponseError(error) {
  const { response } = error;
  if (response) {
    const { status } = response;
    switch (status) {
      case 400: {
        const mess = response.data.message;
        message.error(mess);
        break;
      }
      default:
        break;
    }
  }
}
window.Choerodon = {
  prompt,
  getMessage,
  handleResponseError,
};
const { Header, Content } = Page;


const stores = {
  AppState,
};
export {
  stores, nomatch, Page, Content, Header, 
};
// export { default as LoadingBar } from './loading-bar';

// export { default as Action } from './action';

// export { default as Permission } from './permission';

export { default as axios } from 'components/axios';

// export { default as store } from './store';

// export { default as noaccess } from './error-pages/403';

export { default as asyncLocaleProvider } from './asyncLocaleProvider';

export { default as asyncRouter } from './asyncRouter';
