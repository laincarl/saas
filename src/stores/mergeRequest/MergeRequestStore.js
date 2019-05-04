import { observable, action, computed } from 'mobx';
import { groupBy } from 'lodash';
import { axios, store, stores } from 'choerodon-front-boot';
import { handleProptError } from 'pages/devops/utils';
import { getMergeRequests } from '@/api/DevopsApi.js';

const { AppState } = stores;

@store('MergeRequestStore')
class MergeRequestStore {
  @observable loading = true;

  @observable apps = [];

  @observable mergeData = {
    closed: [],
    merged: [],
    opened: [],
    all: [],
  };

  @observable assignee = {};

  @observable params = [];

  @observable pageInfo = {
    closed: {},
    merged: {},
    opened: {},
    all: {},
  };

  @observable currentApp = {};

  @observable url = '';

  @observable id = null;

  @observable assigneeCount = 0;

  @observable count = {
    closeCount: 0,
    mergeCount: 0,
    openCount: 0,
    totalCount: 0,
  };

  @action setTableFilter(param) {
    if (param) {
      this.params = param;
    } else {
      this.params = [];
    }
  }

  @action setCurrentApp(currentApp) {
    this.currentApp = currentApp;
  }

  @computed get getParams() {
    return this.params.slice();
  }

  @action setPageInfo(page, key) {
    this.pageInfo[key] = page;
  }

  @computed get getPageInfo() {
    return this.pageInfo;
  }

  @action setUrl(url) {
    this.url = url;
  }

  @computed get getUrl() {
    return this.currentApp.url;
  }

  @action setUserId(id) {
    this.id = id;
  }

  @computed get getUserId() {
    return this.id;
  }

  @action setMerge(mergeData, key) {
    this.mergeData[key] = mergeData || [];
  }

  @computed get getMerge() {
    return this.mergeData;
  }

  @action setAssignee(assignee) {
    this.assignee = assignee;
  }

  @action setAssigneeCount(assigneeCount) {
    this.assigneeCount = assigneeCount;
  }

  @computed get getAssignee() {
    return this.assignee;
  }

  @computed
  get getIsLoading() {
    return this.loading;
  }

  @action setLoading(data) {
    this.loading = data;
  }

  @action setCount(data) {
    this.count = data;
  }

  @computed get getCount() {
    return this.count;
  }

  @computed get getAssigneeCount() {
    return this.assigneeCount;
  }

  loadMergeRquest(appId, currentApp) {   
    this.setMerge([]);
    this.setLoading(true);
    if (currentApp) {
      this.setCurrentApp(currentApp);
    }    
    getMergeRequests(appId).then((res) => {
      const response = handleProptError(res);
      if (response) {        
        const closeCount = response.filter(merge => merge.state === 'closed').length;
        const mergeCount = response.filter(merge => merge.state === 'merged').length;
        const openCount = response.filter(merge => merge.state === 'opened').length;
        const mergeData = { ...groupBy(response, 'state'), all: response };
        Object.keys(mergeData).forEach((key) => {
          this.setMerge(mergeData[key], key);
        });
        
        this.setCount({
          closeCount,
          mergeCount,
          openCount,
          totalCount: response.length,
        });
      }
      this.setLoading(false);
    })
      .catch((error) => {
        this.setLoading(false);
        Choerodon.prompt(error.message);
      });
  }


  loadApps(projectId) {
    return axios.get(`/devops/v1/projects/${projectId}/apps`)
      .then(datas => handleProptError(datas));
  }

  loadUser = () => axios.get('iam/v1/users/self').then((data) => {
    this.setUserId(data.id);
  });

  loadUrl(projectId, appId) {
    return axios.get(`/devops/v1/projects/${1}/apps/${appId}/git/url`)
      .then((data) => {
        if (data && data.failed) {
          Choerodon.prompt(data.message);
        } else {
          this.setUrl(data);
        }
      });
  }
}

const mergeRequestStore = new MergeRequestStore();
export default mergeRequestStore;
