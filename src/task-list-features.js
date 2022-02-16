import sortTaskList from './sort-taks-array.js';

const addTask = (list, description) => {
  const newtask = {
    description,
    completed: false,
    index: list.length + 1,
  };
  list.push(newtask);
  localStorage.setItem('taskList', JSON.stringify(list));

  return list;
};

const removeTask = (list, index) => {
  list.splice(index, 1);
  list = sortTaskList(list);
  localStorage.setItem('taskList', JSON.stringify(list));

  return list;
};

const editTask = (list, value, index) => {
  list[index].description = value;
  localStorage.setItem('taskList', JSON.stringify(list));

  return list;
};

export { addTask, removeTask, editTask };
