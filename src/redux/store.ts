import { applyMiddleware, combineReducers, createStore } from 'redux';

import { loggerMiddleware, ywMiddleware } from './middleware';

import { ReducerLine1 } from '@/components/Charts/Line/Line1Data';
import { ReducerLine2 } from '@/components/Charts/Line/Line2Data';
import { ReducerLine4 } from '@/components/Charts/Line/Line4Data';

const store = createStore(
  combineReducers({ ReducerLine1, ReducerLine2, ReducerLine4 }),
  // {
  //     login: {
  //         username: ""
  //     }
  // },
  applyMiddleware(ywMiddleware, loggerMiddleware),
);

export default store;
