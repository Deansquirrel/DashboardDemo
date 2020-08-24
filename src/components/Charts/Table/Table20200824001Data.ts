import { RandInt } from '@/components/Common';

//==============================================================
//Common
export interface ITable20200824001Data {
  hpId: number;
  mdId: number;
  kc: number;
  dd: number;
}

const constants = {
  refresh: 'Table20200824001_REFRESH',
};
//==============================================================
//Store
export interface ITable20200824001State {
  list: ITable20200824001Data[];
}

const initialState: ITable20200824001State = {
  list: [],
};
//==============================================================
//Action
export interface ITable20200824001Action {
  type: string;
  data: any;
}

export const ActionTable20200824001Refresh = (): ITable20200824001Action => ({
  type: constants.refresh,
  data: undefined,
});

const getData = (): ITable20200824001Data[] => {
  let list: ITable20200824001Data[] = [];
  const hpCount = RandInt(3, 3);
  const mdCount = RandInt(2, 2);

  for (let i = 0; i < hpCount; i++) {
    for (let j = 0; j < mdCount; j++) {
      const td = RandInt(0, 100);
      if (td < 50) continue;
      list.push({
        hpId: i,
        mdId: j,
        kc: RandInt(50, 100),
        dd: RandInt(50, 100),
      });
    }
  }
  return list;
};
//==============================================================
//Reduce
export const ReducerTable20200824001 = (
  state = initialState,
  action: ITable20200824001Action,
): ITable20200824001State => {
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
