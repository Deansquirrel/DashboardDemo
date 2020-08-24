import { defineConfig } from 'umi';

export default defineConfig({
  favicon: '/assets/favicon.ico',
  exportStatic: {
    //   htmlSuffix: true,
  },
  // base: "/dashboard",
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  routes: [
    { path: '/', exact: true, redirect: '/nav' },
    { path: '/nav', exact: true, component: '@/pages/nav/nav' },
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
        {
          path: 'demo20200824001',
          exact: true,
          component: '@/pages/dashboard/DashboardDemo20200824001',
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
