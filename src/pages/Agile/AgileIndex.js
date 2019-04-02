import React, { Component, createElement } from 'react';
import nomatch from 'nomatch';
import { Route, Switch, Redirect } from 'react-router-dom';
import { asyncLocaleProvider } from 'choerodon-front-boot';
import BackLog from './pages/BackLog';
import IssueManage from './pages/IssueManage';

const AgileIndex = ({ match }) => {
  const langauge = 'zh_CN';
  const IntlProviderAsync = asyncLocaleProvider(langauge, () => import(`@/locale/${langauge}`));
  
  return (
    <IntlProviderAsync>
      <Switch>
        <Route exact path={`${match.url}/backlog`} component={BackLog} />
        <Route exact path={`${match.url}/issue`} component={IssueManage} />
        <Route path="*" component={nomatch} />
      </Switch>
    </IntlProviderAsync>
  );
};

export default AgileIndex;
