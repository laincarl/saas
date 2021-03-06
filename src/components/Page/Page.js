import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Tooltip } from 'choerodon-ui';
import './Page.less';

@withRouter
class Header extends Component {
  static propTypes = {
    backPath: PropTypes.string,
  };

  onBackBtnClick = () => {
    this.linkToChange(this.props.backPath);
  };

  linkToChange = (url) => {
    const { history } = this.props;
    history.push(url);
  };

  render() {
    const {
      title, backPath, children, className, 
    } = this.props;
    let backBtn = '';
    if (backPath) {
      backBtn = (
        // 清除从父元素继承的 CSS 样式
        <div style={{ lineHeight: '39px' }}>
          <Tooltip
            title="返回"
            placement="bottom"
            getTooltipContainer={that => that}
          >
            <Button  
              onClick={this.onBackBtnClick}
              className="back-btn small-tooltip"
              shape="circle"
              size="large"
              icon="arrow_back"
            />
          </Tooltip>
        </div>
      );
    }
    return (
      <div className={classNames('page-head', className)}>
        {backBtn}
        <span className="page-head-title">
          {title}
        </span>
        {children}
      </div>
    );
  }
}
const Content = ({
  children, title, description, link, style, className,
}) => (
  <div className={`page-content ${className}`} style={style}>
    <div className="page-content-header">
      <div className="title">
        {title}
      </div>
      <div className="description">
        {description}        
      </div>
    </div>
    {children}
  </div>
);
const Page = ({
  children,
  className,
  ...restProps
}) => <div className={className ? `page-container ${className}` : 'page-container'} {...restProps}>{children}</div>;
Page.Header = Header;
Page.Content = Content;
export default Page;
