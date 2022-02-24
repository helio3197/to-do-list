import localStorage from './__mocks__/localStorage.js';
import sortTaskList from './sort-task-array.js';

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

const checkoutTask = (list, value, index) => {
  list[index].completed = value;
  localStorage.setItem('taskList', JSON.stringify(list));
  return list;
};

const clearCompletedTasks = (list) => {
  const filteredList = sortTaskList(list.filter((item) => !item.completed));

  localStorage.setItem('taskList', JSON.stringify(filteredList));

  return filteredList;
};

describe('Tests for the addTask function:', () => {
  const filledArray = [{ description: 'New Test', completed: false, index: 1 }];
  test(`Test input: Calling addTask([], "New Test") should return ${JSON.stringify(filledArray)}`, () => {
    expect(addTask([], 'New Test')).toStrictEqual(filledArray);
  });

  test('Test LocalStorage: Calling addTask([], "New Test") and running localStorage.getItem("taskList") should return "[{description: "New Test", completed: false, index: 1}]"', () => {
    expect(localStorage.getItem('taskList')).toBe('[{"description":"New Test","completed":false,"index":1}]');
  });
});

describe('Tests for the removeTask function:', () => {
  const filledArray = [{ description: 'New Test', completed: false, index: 1 }];
  test(`Test input: Calling removeTask( ${JSON.stringify(filledArray)},0) and running localStorage.getItem("taskList") should return "[]"`, () => {
    expect(removeTask(filledArray, 0)).toStrictEqual([]);
  });

  test(`Testing Local Storage: Calling removeTask( ${JSON.stringify(filledArray)},0) and running localStorage.getItem("taskList") should return "[]"`, () => {
    expect(localStorage.getItem('taskList')).toBe('[]');
  });
});

describe('Tests for the editTask function:', () => {
  const filledArray = [{ description: 'New Test', completed: false, index: 1 }];
  test(`Test input: Calling editTask( ${JSON.stringify(filledArray)}, 'New Test EDITED', 0) should return [{ description: 'New Test EDITED', completed: false, index: 1 }]`, () => {
    expect(editTask(filledArray, 'New Test EDITED', 0)).toStrictEqual([{ description: 'New Test EDITED', completed: false, index: 1 }]);
  });
  test(`Testing Local Storage: Calling editTask(${JSON.stringify(filledArray)}, 'New Test EDITED', 0) and running localStorage.getItem("taskList") should return "[{ description: 'New Test EDITED', completed: false, index: 1 }]"`, () => {
    expect(localStorage.getItem('taskList')).toBe('[{"description":"New Test EDITED","completed":false,"index":1}]');
  });
});

describe('Test for the checkoutTask function:', () => {
  const filledArray = [{ description: 'New Test', completed: false, index: 1 }];
  test(`Test input: Calling checkoutTask(${JSON.stringify(filledArray)}, true, 0) should return "[{ description: 'New Test EDITED', completed: true, index: 1 }]"`, () => {
    expect(checkoutTask(filledArray, true, 0)).toStrictEqual([{ description: 'New Test', completed: true, index: 1 }]);
  });
  test(`Testing Local Storage: Calling checkoutTask(${JSON.stringify(filledArray)}, true, 0) and running localStorage.getItem("taskList") should return "[{ description: 'New Test EDITED', completed: true, index: 1 }]"`, () => {
    expect(localStorage.getItem('taskList')).toBe('[{"description":"New Test","completed":true,"index":1}]');
  });
});

describe('Tests for the clearCompletedTasks Function:', () => {
  const filledArray = [{ description: 'Old Test', completed: true, index: 1 }, { description: 'New Test', completed: true, index: 2 }];
  test(`Test input: Calling clearCompletedTasks(${JSON.stringify(filledArray)}) should return "[]"`, () => {
    expect(clearCompletedTasks(filledArray)).toStrictEqual([]);
  });
  test(`Testing Local Storage: Calling clearCompletedTasks(${JSON.stringify(filledArray)})and running localStorage.getItem("taskList") should return "[]"`, () => {
    expect(localStorage.getItem('taskList')).toBe('[]');
  });
});
