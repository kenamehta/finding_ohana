export const stringFromValues = (valueArray) => {
  const len = valueArray.length;
  let str = "";
  valueArray.map((value, index) => {
    if (index === len - 2) {
      str += " " + value;
    } else {
      str += " " + value + ",";
    }
  });
  return str;
};
