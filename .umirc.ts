import { defineConfig } from 'umi';

export default defineConfig({
  favicon: '/assets/favicon.ico',
  exportStatic: {
    //   htmlSuffix: true,
  },
  // targets: {
  //   ie: 11,
  //   chrome: 49,
  //   firefox: 45,
  //   safari: 7,
  //   edge: 13,
  //   ios: 7,
  // },
  dynamicImport: {},
  // base: "/dashboard",
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  routes: [
    { path: '/', exact: true, redirect: '/nav' },
    { path: '/nav', exact: true, component: '@/pages/nav/nav' },
    {
      path: '/demo',
      exact: false,
      routes: [
        {
          path: '20200824001',
          exact: true,
          component: '@/pages/dashboard/DashboardDemo20200824001',
        },
      ],
    },
    {
      path: '/common',
      exact: false,
      component: '@/layouts/Common',
      routes: [
        {
          path: 'demo20200823001',
          exact: true,
          component: '@/pages/dashboard/DashboardDemo20200823001',
        },
      ],
    },
    {
      path: '/dashboard',
      exact: false,
      component: '@/layouts/Dashboard',
      routes: [
        {
          path: 'line',
          exact: true,
          component: '@/pages/dashboard/DashboardLine',
        },
        {
          path: 'table',
          exact: true,
          component: '@/pages/dashboard/DashboardTable',
        },
      ],
    },
    { path: '/', exact: false, redirect: '/' },
  ],
});
