import React from 'react';
import BaseWithStoreComponent from '@/components/BaseWithStoreComponent';

import { Row, Col } from 'antd';

import Table20200823001 from '@/components/Charts/Table/Table20200823001';

import store from '@/redux/store';
import { ActionTable20200823001Refresh } from '@/components/Charts/Table/Table20200823001Data';

class DashboardDemo20200823001 extends BaseWithStoreComponent {
  // refreshFunc: any;

  componentDidMount() {
    if (super.componentDidMount != undefined) {
      super.componentDidMount();
    }
    store.dispatch(ActionTable20200823001Refresh());
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
      <div style={{ backgroundColor: 'white' }}>
        <Table20200823001
          list={store.getState().ReducerTable20200823001.list}
        />
      </div>
    );
  }
}

export default DashboardDemo20200823001;
