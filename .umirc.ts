import { defineConfig } from 'umi';

export default defineConfig({
  favicon: '/assets/favicon.ico',
  // exportStatic: {
  //   htmlSuffix: true,
  // },
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  routes: [
    { path: '/', exact: true, redirect: '/nav' },
    { path: '/nav', exact: true, component: '@/pages/nav/nav' },
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
      ],
    },
    { path: '/', exact: false, redirect: '/' },
  ],
});
