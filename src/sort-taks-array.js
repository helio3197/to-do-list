const sortTaskList = (list) => {
  let temp;
  for (let i = 0; i < list.length; i += 1) {
    for (let j = i + 1; j < list.length; j += 1) {
      if (list[j].index < list[i].index) {
        temp = list[i].index;
        list[i].index = list[j].index;
        list[j].index = temp;
      }
    }
    list[i].index = i + 1;
  }
  return list;
};

export { sortTaskList as default };