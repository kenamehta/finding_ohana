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
  const formattedDate = new Date(utcDate);
  const date = formattedDate.toDateString();
  const timeArr = formattedDate.toTimeString()?.split(":");
  const hours = parseInt(timeArr[0]);
  const suffix = hours >= 12 ? "PM" : "AM";
  const time = ((hours + 11) % 12) + 1 + ":" + timeArr[1] + " " + suffix;
  return date + ", " + time;
};

export const getTags = (tagArr) => {
  return tagArr
    .map((tag) => tag.substring(0, 1).toUpperCase() + tag.substring(1))
    .join(", ");
};
