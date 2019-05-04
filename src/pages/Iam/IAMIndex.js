import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncLocaleProvider, asyncRouter, nomatch } from 'choerodon-front-boot';

const password = asyncRouter(() => import('./pages/password'));
const userInfo = asyncRouter(() => import('./pages/user-info'));
const permissionInfo = asyncRouter(() => import('./pages/permission-info'));
const tokenManager = asyncRouter(() => import('./pages/token-manager'));

@inject('AppState')
class IAMIndex extends React.Component {
  render() {
    const { match } = this.props;
    const langauge = 'zh_CN';
    const IntlProviderAsync = asyncLocaleProvider(langauge, () => import(`@/locale/iam/${langauge}`));
    return (
      <IntlProviderAsync>
        <Switch> 
          <Route path={`${match.url}/password`} component={password} />
          <Route path={`${match.url}/user-info`} component={userInfo} />    
          <Route path={`${match.url}/permission-info`} component={permissionInfo} />
          <Route path={`${match.url}/token-manager`} component={tokenManager} />
          <Route path="*" component={nomatch} />
        </Switch>
      </IntlProviderAsync>
    );
  }
}

export default IAMIndex;
