import { RandInt } from '@/components/Common';
import moment from 'moment';

//==============================================================
//Common
export interface ITable20200823001Data {
  hpId: number;
  mdId: number;
  kc: number;
  dd: number;
}

const constants = {
  refresh: 'Table20200823001_REFRESH',
};
//==============================================================
//Store
export interface ITable20200823001State {
  list: ITable20200823001Data[];
}

const initialState: ITable20200823001State = {
  list: [],
};
//==============================================================
//Action
export interface ITable20200823001Action {
  type: string;
  data: any;
}

export const ActionTable20200823001Refresh = (): ITable20200823001Action => ({
  type: constants.refresh,
  data: undefined,
});

const getData = (): ITable20200823001Data[] => {
  let list: ITable20200823001Data[] = [];
  const hpCount = RandInt(50, 100);
  const mdCount = RandInt(20, 30);

  for (let i = 0; i < hpCount; i++) {
    for (let j = 0; j < mdCount; j++) {
      const td = RandInt(0, 100);
      if (td < 50) continue;
      list.push({
        hpId: i,
        mdId: j,
        kc: RandInt(50, 10000),
        dd: RandInt(50, 100),
      });
    }
  }
  return list;
};
//==============================================================
//Reduce
export const ReducerTable20200823001 = (
  state = initialState,
  action: ITable20200823001Action,
): ITable20200823001State => {
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

// //==============================================================
// //Common
// // export interface ITable20200823001Data {
// //     date: string;
// //     data: IHpData[];
// // }

// const data: IHpData[] = [
//     {
//         id: 1,
//         name: "hp1",
//         flId: 1,
//         flName: "fl1",
//         jhl: "jhl",
//         zxs: "zxs",
//         dj: "dj",
//         data: [
//             {
//                 id: 11,
//                 name: "qy11",
//                 data: [
//                     {
//                         id: 111,
//                         name: "md11",
//                         kc: 11,
//                         dd: 22,
//                     },
//                 ],
//             },
//             {
//                 id: 12,
//                 name: "qy12",
//                 data: [
//                     {
//                         id: 121,
//                         name: "md21",
//                         kc: 33,
//                         dd: 44,
//                     },
//                     // {
//                     //     id: 122,
//                     //     name: "md22",
//                     //     kc: 55,
//                     //     dd: 66,
//                     // },
//                 ],
//             },
//         ],
//     },
//     {
//         id: 2,
//         name: "hp2",
//         flId: 1,
//         flName: "fl1",
//         jhl: "jhl2",
//         zxs: "zxs2",
//         dj: "dj2",
//         data: [
//             {
//                 id: 21,
//                 name: "qy11",
//                 data: [
//                     {
//                         id: 211,
//                         name: "md11",
//                         kc: 77,
//                         dd: 88,
//                     },
//                 ],
//             },
//             {
//                 id: 22,
//                 name: "qy12",
//                 data: [
//                     // {
//                     //     id: 221,
//                     //     name: "md21",
//                     //     kc: 99,
//                     //     dd: 100,
//                     // },
//                     {
//                         id: 122,
//                         name: "md22",
//                         kc: 25,
//                         dd: 36,
//                     },
//                 ],
//             },
//         ],
//     }
// ]

// const getData = (): IHpData[] => {
//     let list: IHpData[] = []
//     const hpFlCount = RandInt(1, 1)
//     for (let i = 0; i < hpFlCount; i++) {
//         const hpFlName = "分类" + i
//         const hpCount = RandInt(1, 1)
//         for (let j = 0; j < hpCount; j++) {
//             const hpName = "货品-" + i + "-" + j

//         }
//     }

//     return data;

//     // let list: IHpData[] = []

//     // const hpFlCount = RandInt(1, 1)
//     // for (let i = 0; i < hpFlCount; i++) {
//     //     const hpCount = RandInt(1, 1)
//     //     for (let j = 0; j < hpCount; j++) {
//     //         const qyCount = RandInt(1 - 1)
//     //         let qyList: IQyData[] = []
//     //         for (let k = 0; k < qyCount; k++) {
//     //             const mdCount = RandInt(1 - 1)
//     //             let mdList: IMdData[] = []
//     //             for (let m = 0; m < mdCount; m++) {
//     //                 mdList.push({
//     //                     id: m,
//     //                     name: "门店-" + i + "-" + j + "-" + k + "-" + m,
//     //                     kc: RandInt(10, 500),
//     //                     dd: RandInt(10, 500),
//     //                 })
//     //             }
//     //             qyList.push({
//     //                 id: k,
//     //                 name: "区域-" + i + "-" + j + "-" + k,
//     //                 data: mdList,
//     //             })
//     //         }
//     //         list.push({
//     //             id: j,
//     //             name: "货品-" + j,
//     //             flId: i,
//     //             flName: "分类-" + i,
//     //             jhl: "" + RandInt(500, 1000),
//     //             zxs: "1*" + RandInt(2, 10),
//     //             dj: "" + RandInt(50, 500),
//     //             data: qyList,
//     //         })
//     //     }
//     // }
//     // return list;
// };

// interface IHpData {
//     id: number;
//     name: string;
//     flId: number;
//     flName: string;
//     jhl: string;
//     zxs: string;
//     dj: string;
//     data: IQyData[];
// }

// interface IQyData {
//     id: number;
//     name: string;
//     data: IMdData[];
// }

// interface IMdData {
//     id: number;
//     name: string;
//     kc: number;
//     dd: number;
// }

// const constants = {
//     refresh: 'TABLE_20200823001_REFRESH',
// };
// //==============================================================
// //Store
// export interface ITable20200823001State {
//     date: string;
//     data: IHpData[];
// }

// const initialState: ITable20200823001State = {
//     date: moment().locale('zh-cn').format('YYYY-MM-DD'),
//     data: [],
// };
// //==============================================================
// //Action
// export interface ITable20200823001Action {
//     type: string;
//     data: any;
// }

// export const ActionTable20200823001Refresh = (): ITable20200823001Action => ({
//     type: constants.refresh,
//     data: undefined,
// });
// //==============================================================
// //Reduce
// export const ReducerTable20200823001 = (
//     state = initialState,
//     action: ITable20200823001Action,
// ): ITable20200823001State => {
//     switch (action.type) {
//         case constants.refresh:
//             return {
//                 ...state,
//                 date: moment().locale('zh-cn').format('YYYY-MM-DD'),
//                 data: getData(),

//             };
//         default:
//             return state;
//     }
// };
//   //==============================================================
