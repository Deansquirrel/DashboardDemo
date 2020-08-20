import React from 'react';
import BaseWithStoreComponent from '@/components/BaseWithStoreComponent';

import { Row, Col } from 'antd';

import Table1 from '@/components/Charts/Table/Table1';

class DashboardTable extends BaseWithStoreComponent {
  refreshFunc: any;

  componentDidMount() {
    if (super.componentDidMount != undefined) {
      super.componentDidMount();
    }
    //   this.refreshFunc = setInterval(RefreshData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshFunc);
    if (super.componentWillUnmount != undefined) {
      super.componentWillUnmount();
    }
  }

  render() {
    return (
      <Table1 />
      // <div>
      //     <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
      //         <Col span={12} style={{ height: '50vh' }}>
      //             <Table1 />
      //         </Col>
      //         <Col span={12}>
      //             <Table1 />
      //         </Col>
      //         <Col span={12} style={{ height: '50vh' }}>
      //             <Table1 />
      //         </Col>
      //         <Col span={12}>
      //             <Table1 />
      //         </Col>
      //     </Row>
      // </div>
    );
  }
}

export default DashboardTable;
