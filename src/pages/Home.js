import React, { Component, createElement } from 'react';
import { Button, Radio } from 'choerodon-ui';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Spin, Steps } from 'choerodon-ui';
import queryString from 'query-string';
import Header from 'components/Header';
import Menu from 'components/menu';
import Agile from 'pages/Agile';
// import TestManager from 'pages/testManager/containers/TestManagerIndex';
import AppState from 'stores/AppState';
import nomatch from 'nomatch';
import './Home.scss';

function parseQueryToMenuType(search) {
  const menuType = {
    type: 'project',
  };
  if (search) {
    const {
      type, name, id, organizationId,
    } = queryString.parse(search);
    if (type) {
      menuType.type = type;
    }
  }

  return menuType;
}
@withRouter
@inject('AppState', 'MenuStore', 'HeaderStore')
@observer
class Home extends Component {
  componentWillMount() {
    this.initMenuType(this.props);
  }


  componentWillReceiveProps(nextProps) {
    this.initMenuType(nextProps);
  }


  // initFavicon() {
  //   AppState.loadSiteInfo().then((data) => {
  //     const link = document.createElement('link');
  //     const linkDom = document.getElementsByTagName('link');
  //     if (linkDom) {
  //       for (let i = 0; i < linkDom.length; i += 1) {
  //         if (linkDom[i].getAttribute('rel') === 'shortcut icon') document.head.removeChild(linkDom[i]);
  //       }
  //     }
  //     link.id = 'dynamic-favicon';
  //     link.rel = 'shortcut icon';
  //     link.href = data.favicon || 'favicon.ico';
  //     document.head.appendChild(link);
  //     data.defaultTitle = document.getElementsByTagName('title')[0].innerText;
  //     if (data.systemTitle) {
  //       document.getElementsByTagName('title')[0].innerText = data.systemTitle;
  //     }
  //     AppState.setSiteInfo(data);
  //   });
  // }


  initMenuType(props) {
    const {
      location, MenuStore, HeaderStore, history,
    } = props;
    const { pathname, search } = location;
    let isUser = false;
    const needLoad = false;
    const menuType = parseQueryToMenuType(search);   
    if (menuType.type === 'site') {
      isUser = true;
    }
    // console.log(menuType);
    AppState.setTypeUser(isUser);
    AppState.changeMenuType(menuType, isUser);
    // if (needLoad) {
    //   MenuStore.loadMenuData().then((menus) => {
    //     if (menus.length) {
    //       const { route, domain } = findFirstLeafMenu(menus[0]);
    //       const {
    //         type, name, id, organizationId,
    //       } = AppState.currentMenuType;
    //       let path = `${route}?type=${type}&id=${id}&name=${name}`;
    //       if (organizationId) {
    //         path += `&organizationId=${organizationId}`;
    //       }
    //       historyReplaceMenu(history, path, domain);
    //     }
    //   });
    // }
  }

  render() {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
          <Menu />
          <Switch>
            <Route path="/agile" component={Agile} />
            {/* <Route path="/testManager" component={TestManager} /> */}
            <Route path="*" component={nomatch} />
            {/* <Redirect from={`${match.url}`} to={`${match.url}/main`} />   */}
            {/* 其他重定向到 404 */}
            {/* <Redirect from="*" to="/404" /> */}
          </Switch>
        </div>
      </div>
    );
  }
}
export default Home;
