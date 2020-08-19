import { RandInt } from '@/components/Common';

//==============================================================
//Common
export interface ILine4Data {
  month: string;
  value: number;
}
const constants = {
  refresh: 'LINE_4_REFRESH',
};
//==============================================================
//Store
export interface ILine4State {
  list: ILine4Data[];
}

const initialState: ILine4State = {
  list: [],
};

//==============================================================
//Action
export interface ILine4Action {
  type: string;
  data: any;
}

export const ActionLine4Refresh = (): ILine4Action => ({
  type: constants.refresh,
  data: undefined,
});

const month: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getData = (): ILine4Data[] => {
  let list: ILine4Data[] = [];
  month.map(item => {
    list.push({ month: item, value: RandInt(0, 20) });
  });
  return list;
};

//==============================================================
//Reduce
export const ReducerLine4 = (
  state = initialState,
  action: ILine4Action,
): ILine4State => {
  switch (action.type) {
    case constants.refresh:
      return {
        ...state,
        list: getData(),
      };
    default:
      return state;
  }
};
//==============================================================
