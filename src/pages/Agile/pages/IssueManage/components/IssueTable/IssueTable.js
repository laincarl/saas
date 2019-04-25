import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'choerodon-ui';
import './IssueTable.scss';
import { Button } from 'choerodon-ui';
import { Permission } from 'choerodon-front-boot';
import {
  IssueNum, TypeCode, Summary, StatusName, Priority, Assignee, LastUpdateTime, Sprint, Epic,
} from './IssueTableComponent';

const { confirm } = Modal;
const IssueTable = ({
  loading,
  dataSource,
  pagination,
  onChange,
  onDeleteOk,
  onRow,
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
      key: 'type',
      dataIndex: 'type',
      width: 100,
      render: (type, record) => (
        <div style={{ lineHeight: 0 }}>
          <TypeCode type={type} />
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
        <Permission>
          <Button
            icon="delete_forever"
            shape="circle"
            onClick={(e) => { 
              e.stopPropagation();
              deleteStatus(record); 
            }}
          />
        </Permission>
      ),
    },
  ];
  return (
    <Table
      rowKey="issueId"
      loading={loading}
      pagination={pagination}
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      onRow={onRow}
    />
  );
};

IssueTable.propTypes = {

};

export default IssueTable;
