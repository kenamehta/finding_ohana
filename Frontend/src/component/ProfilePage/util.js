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

export const getPostDate = (utcDate) => {
  const dateArr = Date(utcDate)?.toLocaleString()?.split(" ");
  const timeArr = dateArr[4].split(":");
  const hours = timeArr[0];
  const suffix = hours >= 12 ? "PM" : "AM";
  const time = ((hours + 11) % 12) + 1 + ":" + timeArr[1] + " " + suffix;
  return dateArr[1] + " " + dateArr[2] + ", " + dateArr[3] + ", " + time;
};
