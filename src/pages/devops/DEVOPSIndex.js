import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  asyncRouter,
  nomatch,
  asyncLocaleProvider,
} from 'choerodon-front-boot';

const Branch = asyncRouter(() => import('./pages/branch'));
const MergeRequest = asyncRouter(() => import('./pages/mergeRequest'));
const AppTag = asyncRouter(() => import('./pages/appTag'));
const Repository = asyncRouter(() => import('./pages/repository'));


class DEVOPSIndex extends React.Component {
  render() {
    const { match } = this.props;
    const langauge = 'zh_CN';
    const IntlProviderAsync = asyncLocaleProvider(langauge, () => import(`@/locale/devops/${langauge}`));
    return (
      <IntlProviderAsync>
        <Switch>
          <Route path={`${match.url}/branch`} component={Branch} />
          <Route path={`${match.url}/merge-request`} component={MergeRequest} />
          <Route path={`${match.url}/tag`} component={AppTag} />
          <Route path={`${match.url}/repository`} component={Repository} />
          <Route path="*" component={nomatch} />
        </Switch>
      </IntlProviderAsync>
    );
  }
}

export default DEVOPSIndex;
