import { RandInt } from '@/components/Common';

//==============================================================
//Common
export interface ILine2Data {
  month: string;
  city: string;
  temperature: number;
}
const constants = {
  refresh: 'LINE_2_REFRESH',
};
//==============================================================
//Store
export interface ILine2State {
  list: ILine2Data[];
}

const initialState: ILine2State = {
  list: [],
};
//==============================================================
//Action
export interface ILine2Action {
  type: string;
  data: any;
}

export const ActionLine2Refresh = (): ILine2Action => ({
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
const city: string[] = ['Tokyo', 'London'];

const getData = (): ILine2Data[] => {
  let list: ILine2Data[] = [];
  month.map(itemMonth => {
    city.map(itemCity => {
      list.push({
        month: itemMonth,
        city: itemCity,
        temperature: RandInt(0, 20),
      });
    });
  });
  return list;
};
//==============================================================
//Reduce
export const ReducerLine2 = (
  state = initialState,
  action: ILine2Action,
): ILine2State => {
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
