import { observable, action, computed } from 'mobx';
import { axios, store } from 'choerodon-front-boot';
import { handleProptError } from 'pages/devops/utils';
import DevPipelineStore from '../devPipeline/DevPipelineStore';
import {
  getBranchs, getTags, createTag, updateTag, deleteTag,
} from '@/api/DevopsApi.js';

@store('AppTagStore')
class AppTagStore {
  @observable tagData = [];

  // 防止初次为false时对页面的判断
  @observable loading = null;

  @observable pageInfo = {
    current: 0,
    total: 0,
    pageSize: 10,
  };

  @observable branchData = [];

  @action setTagData(data) {
    this.tagData = data;
  }

  @computed get getTagData() {
    return this.tagData;
  }

  @action setLoading(flag) {
    this.loading = flag;
  }

  @computed get getLoading() {
    return this.loading;
  }

  @action setPageInfo(pages) {
    this.pageInfo = pages;
  }

  @computed get getPageInfo() {
    return this.pageInfo;
  }

  @action setBranchData(data) {
    this.branchData = data;
  }

  @computed get getBranchData() {
    return this.branchData;
  }

  queryTagData = (page = 0, sizes = 10, postData = { searchParam: {}, param: '' }) => {
    this.setLoading(true);
    if (DevPipelineStore.selectedApp) {
      getTags(DevPipelineStore.selectedApp, { page, size: sizes }).then((data) => {
        this.setLoading(false);
        const result = handleProptError(data);
        if (result) {          
          this.setTagData(result);          
        }
      }).catch((err) => {
        Choerodon.handleResponseError(err);
        this.setLoading(false);
      });
    } else {
      // 增加loading效果，如觉不妥，请删除
      setTimeout(() => {
        this.setLoading(false);
      }, 600);
    }
  };

  /**
   * 查询应用下的所有分支
   * @param projectId
   * @param appId
   * @returns {Promise<T>}
   */
  queryBranchData = () => {
    getBranchs(DevPipelineStore.selectedApp).then((data) => {
      const result = handleProptError(data);
      if (result) {
        this.setBranchData(result);
      }
    }).catch(err => Choerodon.handleResponseError(err));
  };

  /**
   * 检查标记名称的唯一性
   * @param projectId
   * @param name
   */
  checkTagName = (projectId, name) => axios.get(`/devops/v1/projects/${projectId}/apps/${DevPipelineStore.selectedApp}/git/tags_check?tag_name=${name}`);

  /**
   * 创建tag
   * @param projectId
   * @param tag tag名称
   * @param ref 来源分支
   * @param release 发布日志
   */
  createTag =(tag, ref, release) => createTag(DevPipelineStore.selectedApp, tag, ref, release);

  /**
   * 编辑发布日志
   * @param projectId
   * @param tag
   * @param release
   * @returns {IDBRequest | Promise<void>}
   */
  editTag = (tag, release) => updateTag(DevPipelineStore.selectedApp, tag, release);

  /**
   * 删除标记
   * @param projectId
   * @param tag
   */
  deleteTag = tag => deleteTag(DevPipelineStore.selectedApp, tag)
}

const appTagStore = new AppTagStore();
export default appTagStore;
