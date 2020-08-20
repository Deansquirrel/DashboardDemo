import React from 'react';

import { Table, Space, Tag } from 'antd';

import './Table1.less';

const { Column, ColumnGroup } = Table;

// export default (props: ILine4Props) => {
//     const { list } = props;
//     return (
//       <Chart
//         scale={{ value: { min: 0 } }}
//         padding={[10, 20, 50, 40]}
//         autoFit
//         height={500}
//         data={list}
//       >
//         <Line shape="hv" position="month*value" />
//       </Chart>
//     );
//   };

export default () => {
  return (
    <Table
      pagination={{ hideOnSinglePage: true, pageSize: 3 }}
      bordered={true}
      dataSource={data}
    >
      {/* <ColumnGroup title="Name" > */}
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
      {/* </ColumnGroup> */}
      <Column align={'center'} title="Age" dataIndex="age" key="age" />
      <Column title="Address" dataIndex="address" key="address" />
    </Table>
  );
};

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '6',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '7',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '8',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '9',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
