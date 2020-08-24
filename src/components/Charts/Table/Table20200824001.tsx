import React, { Children } from 'react';
import { Table, Row, Col, Button, Select, Space, InputNumber } from 'antd';
import { ITable20200824001Data } from './Table20200824001Data';
import { RandInt } from '@/components/Common';
import BaseComponent from '@/components/BaseComponent';
import moment from 'moment';

const { Column, ColumnGroup } = Table;
const { Option } = Select;

/**
 * 御品轩节日实时库存统计表2
 */

export interface ITable20200824001Props {
  list: ITable20200824001Data[];
}

/**
 * 门店区域对应关系 门店ID-区域ID
 */
const dataQyAndMd = (): Map<number, number> => {
  let map: Map<number, number> = new Map();
  for (let i = 0; i < 100; i++) {
    map.set(i, i % 6);
  }
  return map;
};

const getQyName = (id: number): string => {
  return '区域' + id;
};

const getMdName = (id: number): string => {
  return '门店' + id;
};

interface IState {
  currQyId: string;
  currHpFlId: string;
  pageSize: number;
  // dataList: any[],
  // qyList: number[],
  // qyMdMap: Map<number, number[]>,
}

class Table20200824001 extends BaseComponent<ITable20200824001Props, IState> {
  constructor(props: Readonly<ITable20200824001Props>) {
    super(props);
    this.state = {
      currQyId: '',
      currHpFlId: '',
      pageSize: 16,
    };
  }

  render() {
    const { list } = this.props;

    let tempData: Map<
      number,
      Map<number, { kc: number; dd: number }>
    > = new Map();
    let qyList: number[] = [];
    let qyMdMap: Map<number, number[]> = new Map();
    let dataList: any[] = [];
    list.map(item => {
      const mdQyConfig = dataQyAndMd();
      const qyId = mdQyConfig.get(item.mdId);
      if (qyId === undefined) {
        return;
      }
      if (qyList.indexOf(qyId) < 0) {
        qyList.push(qyId);
      }
      if (this.state.currQyId !== '' && '' + qyId !== this.state.currQyId) {
        return;
      }
      let qyMdList = qyMdMap.get(qyId);
      if (qyMdList === undefined) {
        qyMdMap.set(qyId, [item.mdId]);
      } else {
        if (qyMdList.indexOf(item.mdId) < 0) {
          qyMdList.push(item.mdId);
          qyMdMap.set(qyId, qyMdList.sort());
        }
      }

      //====================================================
      let m = tempData.get(item.hpId);
      if (m === undefined) {
        m = new Map();
      }
      m.set(item.mdId, { kc: item.kc, dd: item.dd });
      tempData.set(item.hpId, m);
    });

    qyList.sort();

    const hpflId = this.state.currHpFlId;
    let totalData: Map<number, { kc: number; dd: number }> = new Map();
    tempData.forEach((v, k) => {
      if (v.size <= 0) {
        return;
      }
      if (hpflId !== undefined && hpflId !== '' && hpflId !== '' + (k % 4)) {
        return;
      }
      let rd: any = {};
      rd['key'] = k;
      rd['hpmc'] = '货品' + '-' + Math.floor(k / 4) + '-' + (k % 4);
      rd['jhl'] = RandInt(1100, 2000);
      rd['zxs'] = '1*' + RandInt(500, 600);
      rd['dj'] = RandInt(150, 600) + '.00';
      v.forEach((v, k) => {
        rd['md' + k + 'dd'] = v.dd;
        rd['md' + k + 'kc'] = v.kc;

        let data = totalData.get(k);
        if (data === undefined) {
          data = { kc: v.kc, dd: v.dd };
        } else {
          data = { kc: data.kc + v.kc, dd: data.dd + v.dd };
        }
        totalData.set(k, data);
      });
      dataList.push(rd);
    });

    const getTotalData = (mdId: number): { kc: number; dd: number } => {
      const d = totalData.get(mdId);
      if (d === undefined) {
        return { kc: 0, dd: 0 };
      } else {
        return d;
      }
    };

    const getMdList = (qyId: number): number[] => {
      const list = qyMdMap.get(qyId);
      if (list != undefined) {
        return list.sort();
      } else {
        return [];
      }
    };

    return (
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
        <Col span={24}>
          <Space>
            区域
            <Select
              defaultValue=""
              onChange={value => {
                this.setState({
                  currQyId: '' + value,
                });
              }}
            >
              <Option value="">全部</Option>
              {qyList.map(qyId => {
                return (
                  <Option key={qyId} value={qyId}>
                    {getQyName(qyId)}
                  </Option>
                );
              })}
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp; 货品分类
            <Select
              defaultValue=""
              onChange={value => {
                this.setState({
                  currHpFlId: '' + value,
                });
              }}
            >
              <Option value="">全部</Option>
              <Option value="1">分类一</Option>
              <Option value="2">分类二</Option>
              <Option value="3">分类三</Option>
              <Option value="0">分类四</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp; 每页条数
            <InputNumber
              title={'Page Size'}
              defaultValue={this.state.pageSize}
              min={10}
              max={50}
              step={1}
              onChange={value => {
                if (value === undefined) {
                  return;
                }
                this.setState({
                  pageSize: Number(value),
                });
              }}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Table
            id="table20200824001"
            // tableLayout={"auto"}
            pagination={{
              pageSize: this.state.pageSize,
              hideOnSinglePage: true,
              showSizeChanger: false,
            }}
            // pagination={false}
            dataSource={dataList}
            bordered
            scroll={{ x: 'max-content' }}
            size={'small'}
            summary={pageData => {
              let totalList: string[] = [];
              {
                qyList.map(qyId => {
                  const list = getMdList(qyId);
                  if (list != undefined && list.length > 0) {
                    {
                      list.map(mdId => {
                        // totalList.push(getMdName(mdId) + ' kc');
                        // totalList.push(getMdName(mdId) + ' dd');
                        totalList.push('' + getTotalData(mdId).kc);
                        totalList.push('' + getTotalData(mdId).dd);
                      });
                    }
                  }
                });
              }

              let i = 4;
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={4}>
                      <div style={{ textAlign: 'center' }}>合计</div>
                    </Table.Summary.Cell>
                    {totalList.map(item => {
                      return (
                        <Table.Summary.Cell key={i} index={i++}>
                          <div style={{ textAlign: 'center' }}>{item}</div>
                        </Table.Summary.Cell>
                      );
                    })}
                  </Table.Summary.Row>
                </>
              );
            }}
          >
            <ColumnGroup
              title={
                '日期：' +
                moment()
                  .locale('zh-cn')
                  .format('YYYY-MM-DD')
              }
            >
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
            {qyList.map(qyId => {
              const list = getMdList(qyId);
              if (list != undefined && list.length > 0) {
                return (
                  <ColumnGroup key={qyId} title={getQyName(qyId)}>
                    {list.map(mdId => {
                      return (
                        <ColumnGroup key={mdId} title={getMdName(mdId)}>
                          <Column
                            title="库存"
                            dataIndex={'md' + mdId + 'kc'}
                            key={mdId + 'kc'}
                            align={'center'}
                          />
                          <Column
                            title="订单"
                            dataIndex={'md' + mdId + 'dd'}
                            key={mdId + 'dd'}
                            align={'center'}
                          />
                        </ColumnGroup>
                      );
                    })}
                  </ColumnGroup>
                );
              }
            })}
            <Column title="合计" dataIndex="hj" key="hj" align={'center'} />
            <Column
              title="未回收提货券数量"
              dataIndex="未回收提货券数量"
              key="未回收提货券数量"
              align={'center'}
            />
            <Column
              title="工厂可发货量"
              dataIndex="工厂可发货量"
              key="工厂可发货量"
              align={'center'}
            />
            <Column
              title="总计库存"
              dataIndex="总计库存"
              key="总计库存"
              align={'center'}
            />
            <Column
              title="订单总计"
              dataIndex="订单总计"
              key="订单总计"
              align={'center'}
            />
          </Table>
        </Col>
      </Row>
    );
  }
}

export default Table20200824001;
