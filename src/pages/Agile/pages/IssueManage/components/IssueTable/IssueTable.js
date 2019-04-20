import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'choerodon-ui';
import './IssueTable.scss';
import { Button } from 'choerodon-ui';
import {
  IssueNum, TypeCode, Summary, StatusName, Priority, Assignee, LastUpdateTime, Sprint, Epic,
} from './IssueTableComponent';

const { confirm } = Modal;
const IssueTable = ({
  dataSource,
  pagination,
  onChange,
  onDeleteOk,
}) => {
  const deleteStatus = (data) => {
    confirm({
      title: '确定要删除问题?',
      onOk: () => { onDeleteOk(data); },
    });
  };
  const columns = [
    {
      title: '问题类型',
      key: 'issueTypeId',
      width: 100,
      render: (text, record) => (
        <div style={{ lineHeight: 0 }}>
          <TypeCode record={record} />
        </div>
      ),
    },
    {
      title: '概要',
      dataIndex: 'name',
      key: 'name',
      width: 240,
      render: text => <Summary text={text} />,
    },
    {
      title: '状态',
      key: 'statusId',
      sorterId: 'statusId',
      render: (text, record) => <StatusName record={record} />,
    },
    {
      title: '优先级',
      key: 'priorityId',
      sorter: true,
      width: 100,
      render: (text, record) => <Priority record={record} />,
    },
    {
      title: '经办人',
      dataIndex: 'handler',
      width: 135,
      key: 'handler',
      render: (handler, record) => (
        <Assignee
          text={handler.name}
          id={record.handlerId}          
        />
      ),
    },
    {
      title: '最后更新时间',
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
      render: text => <LastUpdateTime text={text} />,
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Button icon="delete_forever" shape="circle" onClick={() => { deleteStatus(record); }} />

      ),
    },
  ];
  return (
    <Table
      rowKey="issueId"
      pagination={pagination}
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
    />
  );
};

IssueTable.propTypes = {

};

export default IssueTable;
