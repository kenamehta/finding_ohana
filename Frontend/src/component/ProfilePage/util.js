export const stringFromValues = (valueArray) => {
  const len = valueArray.length;
  let str = "";
  // eslint-disable-next-line
  valueArray.map((value, index) => {
    if (index === len - 1) {
      str += " " + value;
    } else {
      str += " " + value + ",";
    }
  });
  return str;
};
