import React, { Children } from 'react';
import {
  Table,
  Row,
  Col,
  Button,
  Select,
  Space,
  InputNumber,
  Input,
} from 'antd';
import {
  ITable20200824001Data,
  ActionTable20200824001Refresh,
} from './Table20200824001Data';
import { RandInt } from '@/components/Common';
import BaseComponent from '@/components/BaseComponent';
import moment from 'moment';

import store from '@/redux/store';

import './Table20200824001.less';

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
    map.set(i, i % 4);
  }
  return map;
};

const getQyName = (id: number): string => {
  return '区域' + id;
};

const getMdName = (id: number): string => {
  return '门店' + id;
};

// store.dispatch(ActionTable20200824001Refresh());

interface IState {
  currQyId: string;
  currHpFlId: string;
  pageSize: number;
  mdCount: number;
  hpCount: number;
}

class Table20200824001 extends BaseComponent<ITable20200824001Props, IState> {
  constructor(props: Readonly<ITable20200824001Props>) {
    super(props);
    this.state = {
      currQyId: '',
      currHpFlId: '',
      pageSize: 15,
      mdCount: 5,
      hpCount: 20,
    };
  }

  componentDidMount() {
    if (super.componentDidMount !== undefined) {
      super.componentDidMount();
    }
    this.refreshData(this.state.hpCount, this.state.mdCount);
  }

  refreshData = (hpCount: number, mdCount: number) => {
    store.dispatch(ActionTable20200824001Refresh(hpCount, mdCount));
  };

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
    let mdTotalData: Map<number, { kc: number; dd: number }> = new Map();
    let hzgckcTotal: number = 0;
    let hphjTotal: number = 0;
    let hpddhjTotal: number = 0;
    let whsthqslTotal: number = 0;
    let gckfhslTotal: number = 0;
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
      const hzgckc = RandInt(50, 300);
      rd['hzgckc'] = hzgckc;
      const whsthqsl = RandInt(50, 300);
      rd['whsthqsl'] = whsthqsl;
      whsthqslTotal = whsthqslTotal + whsthqsl;
      const gckfhsl = RandInt(50, 300);
      rd['gckfhsl'] = gckfhsl;
      gckfhslTotal = gckfhslTotal + gckfhsl;
      let hphj: number = 0;
      let hpddhj: number = 0;
      v.forEach((v, k) => {
        rd['md' + k + 'dd'] = v.dd;
        rd['md' + k + 'kc'] = v.kc;

        let data = mdTotalData.get(k);
        if (data === undefined) {
          data = { kc: v.kc, dd: v.dd };
        } else {
          data = { kc: data.kc + v.kc, dd: data.dd + v.dd };
        }
        mdTotalData.set(k, data);
        hphj = hphj + v.kc;
        hpddhj = hpddhj + v.dd;
        hphjTotal = hphjTotal + v.kc;
        hpddhjTotal = hpddhjTotal + v.dd;
      });

      hphj = hphj + hzgckc;
      rd['hphj'] = '' + hphj;
      rd['hpddhj'] = '' + hpddhj;
      rd['zjkc'] = '' + (hphj + gckfhsl);
      hzgckcTotal = hzgckcTotal + hzgckc;
      hphjTotal = hphjTotal + hzgckc;
      dataList.push(rd);
    });

    const getMdTotalData = (mdId: number): { kc: number; dd: number } => {
      const d = mdTotalData.get(mdId);
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
          </Space>
          <Space style={{ float: 'right' }}>
            门店数量
            <InputNumber
              defaultValue={this.state.mdCount}
              min={4}
              max={100}
              step={1}
              style={{ width: '60px' }}
              onChange={value => {
                const v = Number(value);
                this.setState({
                  mdCount: Number(value),
                });
                this.refreshData(this.state.hpCount, Number(value));
              }}
            />
            货品数量
            <InputNumber
              defaultValue={this.state.hpCount}
              min={10}
              max={200}
              step={1}
              style={{ width: '60px' }}
              onChange={value => {
                this.setState({
                  hpCount: Number(value),
                });
                this.refreshData(Number(value), this.state.mdCount);
              }}
            />
            每页条数
            <InputNumber
              title={'Page Size'}
              defaultValue={this.state.pageSize}
              min={1}
              // max={}
              step={1}
              style={{ width: '60px' }}
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
            style={{ lineHeight: 0.2 }}
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
            rowClassName={(_record, index) => {
              if (index % 2 === 1) {
                return 'color_row';
              } else {
                return '';
              }
            }}
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
                        totalList.push('' + getMdTotalData(mdId).kc);
                        totalList.push('' + getMdTotalData(mdId).dd);
                      });
                    }
                  }
                });
              }
              totalList.push('' + hzgckcTotal);
              totalList.push('' + hphjTotal);
              totalList.push('' + whsthqslTotal);
              totalList.push('' + gckfhslTotal);
              totalList.push('' + (hphjTotal + gckfhslTotal));
              totalList.push('' + hpddhjTotal);

              let i = 4;
              return (
                <>
                  <Table.Summary.Row className={'color_row'}>
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
                '日期 ' +
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
            <Column
              title="汉中工厂库存"
              dataIndex="hzgckc"
              key="hzgckc"
              align={'center'}
              width={80}
            />
            <Column title="合计" dataIndex="hphj" key="hphj" align={'center'} />
            <Column
              title="未回收提货券数量"
              dataIndex="whsthqsl"
              key="whsthqsl"
              align={'center'}
              width={80}
            />
            <Column
              title="工厂可发货量"
              dataIndex="gckfhsl"
              key="gckfhsl"
              align={'center'}
              width={80}
            />
            <Column
              title="总计库存"
              dataIndex="zjkc"
              key="zjkc"
              align={'center'}
            />
            <Column
              title="订单合计"
              dataIndex="hpddhj"
              key="hpddhj"
              align={'center'}
            />
          </Table>
        </Col>
      </Row>
    );
  }
}

export default Table20200824001;
