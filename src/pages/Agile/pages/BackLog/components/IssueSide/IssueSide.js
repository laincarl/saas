import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditIssue from 'components/EditIssue';
import { loadIssue } from '@/api/AgileApi';

class IssueSide extends Component {
  state = {
    issueInfo: {},
    loading: true,
    isExpand: true,
  }

  componentDidMount() {
    this.reloadIssue();
  }

  /**
   *加载issue以及相关信息
   *
   * @param {*}
   * @memberof EditIssueNarrow
   */
  reloadIssue = (issueId = this.props.issueId) => {
    this.setState({
      loading: true,
    });
    loadIssue(issueId).then((issue) => {
      this.setState({
        issueInfo: issue,
        loading: false,
      });
    });
  }

  render() {
    const { issueId } = this.props;
    const { loading, issueInfo, isExpand } = this.state;
    return (
      <div style={{ height: '100%' }}>
        {
          isExpand && (
            <EditIssue           
              loading={loading}
              issueId={issueId}
              issueInfo={issueInfo}
              reloadIssue={this.reloadIssue}
              onClose={() => {
                this.setState({
                  isExpand: false,
                });
              }}
              mode="narrow"
            />
          )
        }
      </div>
    );
  }
}

IssueSide.propTypes = {

};

export default IssueSide;
