export const ywMiddleware = (store: any) => (next: any) => (action: any) => {
  // console.log("============ywMiddleware================");
  // console.log(action);
  // let result = next(action);
  // console.log("============ywMiddleware================");
  // return result;
  return next(action);
};

export const loggerMiddleware = (store: any) => (next: any) => (
  action: any,
) => {
  // console.log("============loggerMiddleware================");
  // console.log(store.getState());
  // console.log("============================================");
  // let result = next(action);
  // console.log(store.getState());
  // console.log("============loggerMiddleware================");
  // return result;
  return next(action);
};
