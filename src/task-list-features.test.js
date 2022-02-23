import localStorage from './__mocks__/localStorage.js';

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

describe('Tests for the addTask function:', () => {
  test('Test output: Calling addTask([], "New Test") should return [{description: "New Test", completed: false, index: 1}]', () => {
    expect(addTask([], 'New Test')).toStrictEqual([{ description: 'New Test', completed: false, index: 1 }]);
  });

  test('Test LocalStorage: Calling addTask([], "New Test") and running localStorage.getItem("taskList") should return "[{description: "New Test", completed: false, index: 1}]"', () => {
    expect(localStorage.getItem('taskList')).toBe('[{"description":"New Test","completed":false,"index":1}]');
  });
});
