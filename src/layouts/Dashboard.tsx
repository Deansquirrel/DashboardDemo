import React from 'react';
import { Button } from 'antd';
import styles from './Dashborad.less';
import { history } from 'umi';

class DashboardLayouts extends React.Component {
  render() {
    return (
      <div className={styles.div_dashboard}>
        {this.props.children}
        <Button
          type={'primary'}
          className={styles.btn_back}
          onClick={() => {
            history.push('/');
          }}
        >
          back to home
        </Button>
      </div>
    );
  }
}

export default DashboardLayouts;
