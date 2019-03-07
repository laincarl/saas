import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home } from 'pages';

const stores = {

};

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={createBrowserHistory}>          
          <Switch>
            <Route exact path="/" component={Home} />            
            {/* 其他重定向到 404 */}
            <Redirect from="*" to="/404" />
          </Switch>          
        </Router>
      </Provider>
    );
  }
}
export default App;
