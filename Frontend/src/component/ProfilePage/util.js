export const stringFromValues = (valueArray) => {
  const len = valueArray.length;
  let str = "";
  valueArray.map((value, index) => {
    if (index === len - 1) {
      str += " " + value;
    } else {
      str += " " + value + ",";
    }
  });
  return str;
};
