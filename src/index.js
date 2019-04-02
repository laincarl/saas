import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  injectIntl,
  IntlProvider,
  addLocaleData,
} from 'react-intl';
import { Home } from 'pages';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import AppState from 'stores/AppState';
import MenuStore from 'stores/MenuStore';
import HeaderStore from 'stores/HeaderStore';
import RouterContainer from './RouterContainer';
import './index.scss';

addLocaleData([...en, ...zh]);
const stores = {
  AppState,
  MenuStore,
  HeaderStore,
};

class App extends Component {
  render() {
    const language = 'zh_CN';
    // const IntlProviderAsync = asyncLocaleProvider(language, () => import(`react-intl/locale-data/${language.split('_')[0]}`));
    return (
      <IntlProvider>
        <Provider {...stores}>
          <Router history={createBrowserHistory}>
            <RouterContainer>
              <Switch>
                <Route path="/test" component={() => <div>test</div>} />
                <Route path="/" component={Home} />
                {/* 其他重定向到 404 */}
                {/* <Redirect from="*" to="/404" /> */}
              </Switch>
            </RouterContainer>
          </Router>
        </Provider>
      </IntlProvider>
    );
  }
}
export default App;
