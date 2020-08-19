import React from 'react';
import styles from './nav.less';

import { Link } from 'umi';

interface IPageLink {
  title: string;
  addr: string;
}

interface IPageList {
  title: string;
  pages: IPageLink[];
}

const pageData: IPageList[] = [
  {
    title: '图形示例',
    pages: [
      { title: '折线图', addr: 'dashboard/line' },
      // { title: "t12", addr: "taddr12" }
    ],
  },
  // {
  //     title: "测试",
  //     pages: [
  //         { title: "test", addr: "/dashboard/test" },
  //         // { title: "t22", addr: "taddr22" },
  //     ]
  // },
];

export default () => {
  return (
    <div className={styles.div_root}>
      {pageData.map(item => (
        <div key={item.title}>
          <h2>{item.title}</h2>
          <div>
            {item.pages.map(item => (
              <h3 key={item.title}>
                <Link to={item.addr}>{item.title}</Link>
              </h3>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
