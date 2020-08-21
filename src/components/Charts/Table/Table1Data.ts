import { RandInt } from '@/components/Common';

//==============================================================
//Common
export interface ITable1Data {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}
const constants = {
  refresh: 'TABLE_1_REFRESH',
};
//==============================================================
//Store
export interface ITable1State {
  list: ITable1Data[];
}

const initialState: ITable1State = {
  list: [],
};
//==============================================================
//Action
export interface ITable1Action {
  type: string;
  data: any;
}

export const ActionTable1Refresh = (): ITable1Action => ({
  type: constants.refresh,
  data: undefined,
});

const getData = (): ITable1Data[] => {
  let list: ITable1Data[] = [];

  return list;
};
//==============================================================
