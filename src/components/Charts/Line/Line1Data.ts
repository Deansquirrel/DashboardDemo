import { RandInt } from '@/components/Common';

//==============================================================
//Common
export interface ILine1Data {
  year: string;
  value: number;
}
const constants = {
  refresh: 'LINE_1_REFRESH',
};
//==============================================================
//Store
export interface ILine1State {
  list: ILine1Data[];
}

const initialState: ILine1State = {
  list: [],
};

//==============================================================
//Action
export interface ILine1Action {
  type: string;
  data: any;
}

export const ActionLine1Refresh = (): ILine1Action => ({
  type: constants.refresh,
  data: undefined,
});

const yearList: string[] = [
  '2016',
  '2001',
  '2009',
  '1994',
  '1995',
  '1996',
  '1997',
];

//==============================================================
//Reduce
export const ReducerLine1 = (
  state = initialState,
  action: ILine1Action,
): ILine1State => {
  switch (action.type) {
    case constants.refresh:
      let list: ILine1Data[] = [];
      yearList.sort().map(item => {
        list.push({ year: item, value: RandInt(10, 100) });
      });
      return {
        ...state,
        list: list,
      };
    default:
      return state;
  }
};
//==============================================================
