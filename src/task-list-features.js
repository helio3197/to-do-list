import sortTaskList from './sort-task-array.js';

const saveListToStorage = (list) => localStorage.setItem('taskList', JSON.stringify(list));

const addTask = (list, description) => {
  const newtask = {
    description,
    completed: false,
    index: list.length + 1,
  };
  list.push(newtask);
  saveListToStorage(list);

  return list;
};

const removeTask = (list, index) => {
  list.splice(index, 1);
  list = sortTaskList(list);
  saveListToStorage(list);

  return list;
};

const editTask = (list, value, index) => {
  list[index].description = value;
  saveListToStorage(list);

  return list;
};

export {
  addTask,
  removeTask,
  editTask,
  saveListToStorage,
};
