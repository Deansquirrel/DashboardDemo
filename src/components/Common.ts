export const RandInt = (min = 0, max = 100) => {
  if (min === max) {
    return min;
  }
  if (min > max) {
    let t = min;
    min = max;
    max = t;
  }
  return min + Math.floor(Math.random() * (max - min));
};
