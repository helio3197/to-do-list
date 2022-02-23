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

const filledArray = [{ description: 'New Test', completed: false, index: 1 }];

describe('Tests for the addTask function:', () => {
  test(`Test input: Calling addTask([], "New Test") should return ${filledArray}`, () => {
    expect(addTask([], 'New Test')).toStrictEqual(filledArray);
  });

  test('Test LocalStorage: Calling addTask([], "New Test") and running localStorage.getItem("taskList") should return "[{description: "New Test", completed: false, index: 1}]"', () => {
    expect(localStorage.getItem('taskList')).toBe('[{"description":"New Test","completed":false,"index":1}]');
  });
});

describe('Tests for the removeTask function:', () => {
  test(`Test input: Calling removeTask(${filledArray},1) and running localStorage.getItem("taskList") should return "[]"`, () => {
    expect(removeTask(filledArray, 1)).toStrictEqual('[]');
  });

  test(`Testing Local Storage:Calling removeTask(${filledArray},1) and running localStorage.getItem("taskList") should return "[]"`, () => {
    expect(localStorage.getItem('taskList')).toBe('[]');
  });
});