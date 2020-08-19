// import React from 'react';

import { history } from 'umi';

import 'moment/locale/zh-cn';

// import store from '@/data/store';

export function onRouteChange({
  location,
}: {
  location: { pathname: string };
}) {
  // document.title = constant.pageTitle + ' ' + constant.version;
  // //TODO 页面渲染前在线验证权限
  // const state = store.getState();
  // if (location.pathname != '/login') {
  //   if (!state.login.isLogin) {
  //     history.push('/login');
  //   }
  // }
}

export function render(oldRender: () => void) {
  // const state = store.getState();
  oldRender();
  // if (state.login.isLogin) {
  //     if(oldRender.)
  //     oldRender()
  // } else {
  //     // history.redirectTo('/login');
  //     // history.replace('/login');
  //     history.push('/login');
  // }
  // // fetch('/api/auth').then(auth => {
  // //     if (auth.isLogin) { oldRender() }
  // //     else { history.redirectTo('/login'); }
  // // });
}
