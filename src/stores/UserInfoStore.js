import { action, computed, observable } from 'mobx';
import { axios } from 'choerodon-front-boot';
import { updateUser, checkEmail, updatePassword } from '@/api/IamApi';

class UserInfoStore {
  @observable userInfo = {};

  @observable avatar;

  @computed
  get getUserInfo() {
    return this.userInfo;
  }

  @action
  setUserInfo(data) {
    this.userInfo = data;
    this.avatar = data.imageUrl;
  }

  @action
  setAvatar(avatar) {
    this.avatar = avatar;
  }

  @computed
  get getAvatar() {
    return this.avatar;
  }

  updateUserInfo = updateUser;

  updatePassword = updatePassword;

  checkEmailAddress = checkEmail;
}

export default new UserInfoStore();
