import { applyMiddleware, combineReducers, createStore } from 'redux';

import { loggerMiddleware, ywMiddleware } from './middleware';

import { ReducerLine1 } from '@/components/Charts/Line/Line1Data';
import { ReducerLine2 } from '@/components/Charts/Line/Line2Data';
import { ReducerLine4 } from '@/components/Charts/Line/Line4Data';

import { ReducerTable20200823001 } from '@/components/Charts/Table/Table20200823001Data';

const store = createStore(
  combineReducers({
    ReducerLine1,
    ReducerLine2,
    ReducerLine4,
    ReducerTable20200823001,
  }),
  // {
  //     login: {
  //         username: ""
  //     }
  // },
  applyMiddleware(ywMiddleware, loggerMiddleware),
);

export default store;
