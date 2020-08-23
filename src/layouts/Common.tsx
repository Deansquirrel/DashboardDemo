import React from 'react';
import { Button } from 'antd';
import styles from './Common.less';
import { history } from 'umi';

class CommonLayouts extends React.Component {
  render() {
    return (
      <div className={styles.div_common}>
        {this.props.children}
        {/* <Button
                    type={'primary'}
                    className={styles.btn_back}
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    back to home
        </Button> */}
      </div>
    );
  }
}

export default CommonLayouts;
