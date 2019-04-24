import React, { Component } from 'react';
import {
  Button, Radio, Modal, Icon, 
} from 'choerodon-ui';
import Page from 'components/Page';

import PropTypes from 'prop-types';

const RadioGroup = Radio.Group;
const { Header, Content } = Page;
const { Sidebar } = Modal;
class Agile extends Component {
  state = {
    visible: false,
    placement: 'left',
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  }

  render() {
    return (
      <Page>
        <Header title="问题管理" backPath="/">
          test
        </Header>
        <Content>
          content
          <RadioGroup
            style={{ marginRight: 8 }}
            defaultValue={this.state.placement}
            onChange={this.onChange}
          >
            <Radio value="top">top</Radio>
            <Radio value="right">right</Radio>
            <Radio value="bottom">bottom</Radio>
            <Radio value="left">left</Radio>
          </RadioGroup>
          <Button type="primary" onClick={this.showDrawer}>
            Open
          </Button>
          <Icon type="menu" />
          <Icon type="sutask" />
          <Sidebar
            title="Basic Drawer"       
            onCancel={this.onCancel}
            // confirmLoading
            onOK={this.onCancel}
            visible={this.state.visible}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Sidebar>
        </Content>
      </Page>
    );
  }
}

Agile.propTypes = {

};

export default Agile;
