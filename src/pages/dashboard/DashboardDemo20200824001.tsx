import React from 'react';
import BaseWithStoreComponent from '@/components/BaseWithStoreComponent';

import { Row, Col } from 'antd';

import Table20200824001 from '@/components/Charts/Table/Table20200824001';

import store from '@/redux/store';
import { ActionTable20200824001Refresh } from '@/components/Charts/Table/Table20200824001Data';

class DashboardDemo20200824001 extends BaseWithStoreComponent {
  // refreshFunc: any;

  componentDidMount() {
    if (super.componentDidMount != undefined) {
      super.componentDidMount();
    }
    //   this.refreshFunc = setInterval(RefreshData, 1000);
  }

  // componentWillUnmount() {
  //     clearInterval(this.refreshFunc);
  //     if (super.componentWillUnmount != undefined) {
  //         super.componentWillUnmount();
  //     }
  // }

  render() {
    return (
      <div style={{ backgroundColor: 'white', padding: '16px' }}>
        <Table20200824001
          list={store.getState().ReducerTable20200824001.list}
        />
      </div>
    );
  }
}

export default DashboardDemo20200824001;
