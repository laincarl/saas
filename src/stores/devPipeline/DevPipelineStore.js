import { observable, action, computed } from 'mobx';
import { axios, stores } from 'choerodon-front-boot';
import _ from 'lodash';
import { handleProptError } from 'pages/devops/utils';
import AppTagStore from '../appTag';
import BranchStore from '../branchManage';
import MergeRequestStore from '../mergeRequest';
import CiPipelineStore from '../ciPipelineManage';
import DevConsoleStore from '../devConsole';
import DeploymentPipelineStore from '../deploymentPipeline';
import { getRepositoryList, getBranchs } from '@/api/DevopsApi.js';

const { AppState } = stores;

function findDataIndex(collection, value) {
  return collection && value ? collection.findIndex(
    ({ id, projectId }) => id === value.id && (
      (!projectId && !value.projectId)
      || projectId === value.projectId
    ),
  ) : -1;
}

/**
 * 置顶最近使用过的数据项
 * @param collection 所有数据
 * @param value 当前数据项
 * @param number 显示最近使用的条数
 * @returns {*[]}
 */
function saveRecent(collection = [], value, number) {
  const index = findDataIndex(collection, value);
  if (index !== -1) {
    return collection.splice(index, 1).concat(collection.slice());
  } else {
    collection.unshift(value);
    return collection.slice(0, number);
  }
}


class DevPipelineStore {
  @observable appData = [];

  @observable selectedApp = null;

  @observable defaultAppName = null;

  @observable recentApp = null;

  @observable preProId = AppState.currentMenuType.id;

  @action setAppData(data) {
    this.appData = data;
  }

  @computed get getAppData() {
    return this.appData.slice();
  }

  @action setSelectApp(app) {
    this.selectedApp = app;
  }

  @action setPreProId(id) {
    this.preProId = id;
  }

  @computed get getSelectApp() {
    return this.selectedApp;
  }

  @action setDefaultAppName(name) {
    this.defaultAppName = name;
  }

  @computed get getDefaultAppName() {
    return this.defaultAppName;
  }

  @computed
  get getRecentApp() {
    let recents = [];
    if (this.recentApp) {
      recents = this.recentApp;
    } else if (localStorage.recentApp) {
      recents = JSON.parse(localStorage.recentApp);
    }
    const permissionApp = _.filter(
      this.appData,
      value => value.permission === true,
    );
    return _.filter(
      permissionApp,
      value => findDataIndex(recents, value) !== -1,
    );
  }

  @action
  setRecentApp(id) {
    if (id) {
      if (this.appData.length) {
        const recent = this.appData.filter(value => value.id === id)[0];
        const recentApp = saveRecent(this.getRecentApp, recent, 3);
        localStorage.recentApp = JSON.stringify(recentApp);
        this.recentApp = recentApp;
      } else {
        localStorage.recentApp = JSON.stringify([id]);
        this.recentApp = [id];
      }
    }
  }

  /**
   * 查询该项目下的所有应用
   * @param projectId
   * @param type
   * @param apps
   */
  queryAppData = (projectId = AppState.currentMenuType.id, type, apps) => {
    AppTagStore.setTagData([]);
    BranchStore.setBranchList([]);
    if (Number(this.preProId) !== Number(projectId)) {
      this.setAppData([]);
      DeploymentPipelineStore.setProRole('app', '');
    }
    this.setPreProId(projectId);
    getRepositoryList().then((data) => {
      const res = handleProptError(data);
      if (res) {       
        const result = res;
        this.setAppData(res);
        if (result && result.length) {
          if (apps) {
            this.setSelectApp(apps);
          } else if (this.selectedApp) {
            if (_.filter(result, ['id', this.selectedApp]).length === 0) {
              this.setSelectApp(result[0].id);
            }
          } else {
            this.setSelectApp(result[0].id);
          }
          switch (type) {
            case 'branch':
              BranchStore.loadBranchList({ projectId });
              break;
            case 'tag':
              AppTagStore.queryTagData(0, 10);
              break;
            case 'merge':
              MergeRequestStore.loadMergeRquest(this.selectedApp, result[0]);
              // MergeRequestStore.loadUrl(projectId, this.selectedApp);
              break;              
            default:
              break;
          }
          AppTagStore.setDefaultAppName(result[0].name);
        } else {
          this.setSelectApp(null);
          AppTagStore.setLoading(false);
          CiPipelineStore.setLoading(false);
          MergeRequestStore.setLoading(false);
          DevConsoleStore.setBranchLoading(false);
          DeploymentPipelineStore.judgeRole('app');
        }
      }
    }).catch(err => Choerodon.handleResponseError(err));
  };
}

const devPipelineStore = new DevPipelineStore();
export default devPipelineStore;
