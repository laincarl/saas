import { action, computed, observable } from 'mobx';
import axios from '../components/axios';

function getDefaultLanguage() {
  let locale;
  if (typeof window !== 'undefined') {
    // locale = navigator.language || navigator.userLanguage || navigator.systemLanguage;
  }
  return locale ? locale.replace('-', '_') : 'zh_CN';
}

class AppState {
  @observable menuType = { type: 'project' }; // 一个菜单对象 {id:'',name:'',type:''}

  @observable expanded = false;

  @observable guideExpanded = false;

  @observable userInfo = {
    id: 7631, 
    organizationId: 2,
    organizationName: '上海汉得信息技术股份有限公司',
    organizationCode: 'hand',
    loginName: '16965',
    email: 'kunqi.abcwang@vk.abcvu',
    realName: '王坤奇',
    phone: '23290060803',
    internationalTelCode: '+86',
    imageUrl: 'https://minio.choerodon.com.cn/iam-service/file_48f666513b6c4640abbdbf34b9cf9bd3_%3F%3Fd46401601152fed0ba0939ef9f5623dc.jpg',
    language: 'zh_CN',
    timeZone: 'CTT',
    locked: false,
    ldap: true,
    enabled: true,
    admin: false,
    objectVersionNumber: 474,
  };

  @observable siteInfo = {};

  @observable debugger = false; // 调试模式

  @observable isUser = false;

  @computed
  get getUserId() {
    return this.userInfo.id;
  }

  @computed
  get getDebugger() {
    return this.debugger;
  }

  @action
  setDebugger(data) {
    this.debugger = data;
  }

  @computed
  get getType() {
    return this.currentMenuType.type;
  }

  @computed
  get getUserInfo() {
    return this.userInfo;
  }

  @action
  setUserInfo(user) {
    this.userInfo = user;
  }

  @action
  setSiteInfo(site) {
    this.siteInfo = site;
  }

  @computed
  get getSiteInfo() {
    return this.siteInfo;
  }

  @computed
  get getMenuExpanded() {
    return this.expanded;
  }

  @action
  setMenuExpanded(data) {
    this.expanded = data;
  }

  @computed
  get getGuideExpanded() {
    return this.guideExpanded;
  }

  @action
  setGuideExpanded(data) {
    this.guideExpanded = data;
  }

  @computed
  get currentLanguage() {
    return this.userInfo.language || getDefaultLanguage();
  }

  @computed
  get isAuth() {
    return !!this.userInfo.loginName;
  }

  @computed
  get currentMenuType() {
    return this.menuType;
  }

  @action
  setAuthenticated(flag) {
    this.isAuthenticated = flag;
  }

  @action
  changeMenuType(type) {
    sessionStorage.menType = JSON.stringify(type);
    sessionStorage.selectData = JSON.stringify(type);
    sessionStorage.type = type.type;
    this.menuType = type;
  }

  @action
  setTypeUser(isUser) {
    sessionStorage.user = isUser ? 'user' : '';
    this.isUser = isUser;
  }

  @computed
  get isTypeUser() {
    return this.isUser;
  }

  loadUserInfo = () => axios.get('/iam/v1/users/self');

  loadSiteInfo = () => axios.get('/iam/v1/system/setting');
}


export default new AppState();
