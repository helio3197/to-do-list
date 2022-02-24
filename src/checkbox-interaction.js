import { saveListToStorage } from './task-list-features.js';
import sortTaskList from './sort-task-array.js';

const checkoutTask = (list, value, index) => {
  list[index].completed = value;
  saveListToStorage(list);
  return list;
};

const clearCompletedTasks = (list) => {
  const filteredList = sortTaskList(list.filter((item) => !item.completed));

  saveListToStorage(filteredList);

  return filteredList;
};

export { checkoutTask, clearCompletedTasks };
