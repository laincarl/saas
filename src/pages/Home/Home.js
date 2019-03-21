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
import AppState from 'stores/AppState';
import findFirstLeafMenu from 'components/util/findFirstLeafMenu';
import { dashboard, historyReplaceMenu } from '../../common';

function parseQueryToMenuType(search) {
  const menuType = {};
  if (search) {
    const {
      type, name, id, organizationId,
    } = queryString.parse(search);
    if (type) {
      menuType.type = type;
    }
    if (name) {
      menuType.name = name;
    }
    if (id) {
      menuType.id = id;
      if (type === 'project') {
        menuType.projectId = id;
      } else if (type === 'organization') {
        menuType.organizationId = id;
      }
    }
    if (type === 'project' && organizationId) {
      menuType.organizationId = organizationId;
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

  componentDidMount() {
    this.initFavicon();
  }

  componentWillReceiveProps(nextProps) {
    this.initMenuType(nextProps);
  }


  initFavicon() {
    AppState.loadSiteInfo().then((data) => {
      const link = document.createElement('link');
      const linkDom = document.getElementsByTagName('link');
      if (linkDom) {
        for (let i = 0; i < linkDom.length; i += 1) {
          if (linkDom[i].getAttribute('rel') === 'shortcut icon') document.head.removeChild(linkDom[i]);
        }
      }
      link.id = 'dynamic-favicon';
      link.rel = 'shortcut icon';
      link.href = data.favicon || 'favicon.ico';
      document.head.appendChild(link);
      data.defaultTitle = document.getElementsByTagName('title')[0].innerText;
      if (data.systemTitle) {
        document.getElementsByTagName('title')[0].innerText = data.systemTitle;
      }
      AppState.setSiteInfo(data);
    });
  }


  initMenuType(props) {
    const {
      location, MenuStore, HeaderStore, history,
    } = props;
    const { pathname, search } = location;
    let isUser = false;
    let needLoad = false;
    let menuType = parseQueryToMenuType(search);
    if (pathname === '/') {
      if (true) {
        const recent = HeaderStore.getRecentItem;
        if (recent.length && !sessionStorage.home_first_redirect) {
          const {
            id, name, type, organizationId,
          } = recent[0];
          menuType = {
            id, name, type, organizationId,
          };
          needLoad = true;
        } else {
          menuType = {};
        }
        sessionStorage.home_first_redirect = 'yes';
      }
    } else if (menuType.type === 'site') {
      isUser = true;
    } else if (!menuType.type) {
      menuType.type = 'site';
    }
    AppState.setTypeUser(isUser);
    AppState.changeMenuType(menuType);
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
        <div style={{ display: 'flex', flex: 1 }}>
          <Menu />
          <Switch>
            <Route path="/agile" component={Agile} />
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
