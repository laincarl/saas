import React, { Component, createElement } from 'react';
import nomatch from 'nomatch';
import { Route, Switch, Redirect } from 'react-router-dom';
import { asyncLocaleProvider } from 'choerodon-front-boot';
import BackLog from './pages/BackLog';
import EndIssue from './pages/EndIssue';
import ActiveSprint from './pages/ActiveSprint';
import IssueManage from './pages/IssueManage';

const TestManagerIndex = ({ match }) => {
  const langauge = 'zh_CN';
  const IntlProviderAsync = asyncLocaleProvider(langauge, () => import(`@/locale/${langauge}`));
  
  return (
    <IntlProviderAsync>
      <Switch>
        <Route exact path={`${match.url}/TestExecute`} component={BackLog} />
        <Route exact path={`${match.url}/fail`} component={ActiveSprint} />
        <Route exact path={`${match.url}/done`} component={EndIssue} />
        <Route exact path={`${match.url}/IssueManage`} component={IssueManage} />
        <Route path="*" component={nomatch} />
      </Switch>
    </IntlProviderAsync>
  );
};

export default TestManagerIndex;
