import React, { Component, createElement } from 'react';
import nomatch from 'nomatch';
import { Route, Switch, Redirect } from 'react-router-dom';
import BackLog from './pages/BackLog';

const AgileIndex = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/backlog`} component={BackLog} />
    <Route path="*" component={nomatch} />
  </Switch>
);

export default AgileIndex;
