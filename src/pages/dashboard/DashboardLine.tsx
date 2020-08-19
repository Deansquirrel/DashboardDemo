import BaseWithStoreComponent from '@/components/BaseWithStoreComponent';
import React from 'react';
import { Row, Col } from 'antd';
import store from '@/redux/store';
import Line1 from '@/components/Charts/Line/Line1';
import { ActionLine1Refresh } from '@/components/Charts/Line/Line1Data';
import Line2 from '@/components/Charts/Line/Line2';
import { ActionLine2Refresh } from '@/components/Charts/Line/Line2Data';
import Line3 from '@/components/Charts/Line/Line3';
import { ActionLine4Refresh } from '@/components/Charts/Line/Line4Data';
import Line4 from '@/components/Charts/Line/Line4';

const RefreshData = () => {
  store.dispatch(ActionLine1Refresh());
  store.dispatch(ActionLine2Refresh());
  store.dispatch(ActionLine4Refresh());
};

class DashboardTest extends BaseWithStoreComponent {
  refreshFunc: any;

  componentDidMount() {
    if (super.componentDidMount != undefined) {
      super.componentDidMount();
    }
    this.refreshFunc = setInterval(RefreshData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshFunc);
    if (super.componentWillUnmount != undefined) {
      super.componentWillUnmount();
    }
  }

  render() {
    const listLineOne = store.getState().ReducerLine1.list;
    const listLineTwo = store.getState().ReducerLine2.list;
    const listLine4 = store.getState().ReducerLine4.list;

    return (
      <div>
        <Row>
          <Col span={12} style={{ height: '50vh' }}>
            <Line2 list={listLineTwo} />
          </Col>
          <Col span={12}>
            <Line1 list={listLineOne} />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ height: '50vh' }}>
            <Line3 list={listLineTwo} />
          </Col>
          <Col span={12}>
            <Line4 list={listLine4} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardTest;
