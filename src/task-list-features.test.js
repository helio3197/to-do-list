import { addTask } from './task-list-features.js';
import localStorage from './__mocks__/localStorage.js';

const saveListToStorage = (list) => localStorage.setItem('taskList', JSON.stringify(list));

describe('Tests for the addTask function:', () => {
  test('Calling addTask([], "New Test") should return [{description: "New Test", completed: false, index: 1}]', () => {
    expect(addTask([], 'New Test')).toBe([{ description: 'New Test', completed: false, index: 1 }]);
  });
});
