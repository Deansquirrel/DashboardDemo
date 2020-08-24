import React, { Children } from 'react';
import { Table } from 'antd';

import './Table20200823001.less';

import { ITable20200823001Data } from './Table20200823001Data';
import { RandInt } from '@/components/Common';

const { Column, ColumnGroup } = Table;

/**
 * 御品轩节日实时库存统计表
 */

export interface ITable20200823001Props {
  list: ITable20200823001Data[];
}

/**
 * 门店区域对应关系 门店ID-区域ID
 */
const dataQyAndMd = (): Map<number, number> => {
  let map: Map<number, number> = new Map();
  for (let i = 0; i < 100; i++) {
    map.set(i, i % 3);
  }
  return map;
};

export default (props: ITable20200823001Props) => {
  let { list } = props;
  if (list == undefined) list = [];

  let qyList: string[] = [];
  let mdList: string[] = [];

  let dataList: any[] = [];

  let tempData: Map<
    number,
    Map<number, { kc: number; dd: number }>
  > = new Map();

  let qymd: Map<string, string[]> = new Map();

  const qyData = dataQyAndMd();

  list.map(item => {
    let tMap = tempData.get(item.hpId);
    if (tMap == undefined) {
      tMap = new Map();
    }
    tMap.set(item.mdId, { dd: item.dd, kc: item.kc });
    tempData.set(item.hpId, tMap);
    if (mdList.indexOf('门店' + item.mdId) < 0) {
      mdList.push('门店' + item.mdId);
    }
    if (
      qyData.get(item.mdId) !== undefined &&
      qyList.indexOf('区域' + qyData.get(item.mdId)) < 0
    ) {
      qyList.push('区域' + qyData.get(item.mdId));
    }

    const mdName = '门店' + item.mdId;
    const qyName = '区域' + qyData.get(item.mdId);

    if (qymd.get(qyName) == undefined) {
      let list = [mdName];
      qymd.set(qyName, list);
    } else {
      let list = qymd.get(qyName);
      if (list != undefined && list.indexOf(mdName) < 0) {
        list.push(mdName);
      }
    }
  });

  qyList.sort();
  mdList.sort();

  tempData.forEach((v, k) => {
    let rd: any = {};
    rd['key'] = k;
    rd['hpmc'] = '货品' + k;
    rd['jhl'] = RandInt(1100, 2000);
    rd['zxs'] = '1*' + RandInt(500, 600);
    rd['dj'] = RandInt(150, 600) + '.00';
    v.forEach((dV, dK) => {
      rd['门店' + dK + 'kc'] = dV.kc;
      rd['门店' + dK + 'dd'] = dV.dd;
    });
    dataList.push(rd);
  });

  const getQyList = (): string[] => {
    let list: string[] = [];
    qymd.forEach((v, k) => {
      list.push(k);
    });
    return list.sort();
  };

  const getMdList = (qyName: string): string[] => {
    let list: string[] = [];
    qymd.forEach((v, k) => {
      if (k === qyName) {
        v.map(item => {
          list.push(item);
        });
      }
    });
    return list.sort();
  };

  return (
    <Table
      id="table20200823001"
      pagination={{
        pageSize: 15,
        hideOnSinglePage: true,
        showSizeChanger: false,
      }}
      // columns={columns}
      dataSource={dataList}
      bordered
      scroll={{ x: 'max-content' }}
      size={'small'}
      summary={pageData => {
        // console.log("pageData", pageData)
        let totalList: string[] = [];

        getQyList().map(qyName => {
          getMdList(qyName).map(mdName => {
            totalList.push(mdName + ' kc');
            totalList.push(mdName + ' dd');
          });
        });
        let i = 4;
        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4}>
                <div style={{ textAlign: 'center' }}>Total</div>
              </Table.Summary.Cell>
              {totalList.map(item => {
                return (
                  <Table.Summary.Cell key={i} index={i++}>
                    {item}
                  </Table.Summary.Cell>
                );
              })}
            </Table.Summary.Row>
          </>
        );
      }}
    >
      <ColumnGroup title="日期：2020-08-23">
        <Column
          title="货品名称"
          dataIndex="hpmc"
          key="hpmc"
          align={'center'}
          fixed="left"
        />
        <Column
          title="净含量"
          dataIndex="jhl"
          key="jhl"
          align={'center'}
          fixed="left"
        />
        <Column
          title="装箱数"
          dataIndex="zxs"
          key="zxs"
          align={'center'}
          fixed="left"
        />
        <Column
          title="单价"
          dataIndex="dj"
          key="dj"
          align={'center'}
          fixed="left"
        />
      </ColumnGroup>
      {getQyList().map(qyName => {
        return (
          <ColumnGroup key={qyName} title={qyName}>
            {getMdList(qyName).map(mdName => {
              return (
                <ColumnGroup key={mdName} title={mdName}>
                  <Column
                    title="库存"
                    dataIndex={mdName + 'kc'}
                    key={mdName + 'kc'}
                    align={'center'}
                  />
                  <Column
                    title="订单"
                    dataIndex={mdName + 'dd'}
                    key={mdName + 'dd'}
                    align={'center'}
                  />
                </ColumnGroup>
              );
            })}
          </ColumnGroup>
        );
      })}
    </Table>
    // <ColumnGroup title="Name" >
    //     <Column title="First Name" dataIndex="firstName" key="firstName" />
    //     <Column title="Last Name" dataIndex="lastName" key="lastName" />
    //     {/* </ColumnGroup> */}
    //     <Column align={'center'} title="Age" dataIndex="age" key="age" />
    //     <Column title="Address" dataIndex="address" key="address" />
    // </Table>
  );
};

const data1 = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];
