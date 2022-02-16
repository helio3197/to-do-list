import createTodo from './create-tasks-list.js';
import './style.css';

const taskList = [
  {
    description: 'test-task',
    completed: false,
    index: 1,
  },
  {
    description: 'test-task2',
    completed: true,
    index: 2,
  },
  {
    description: 'test-task3',
    completed: true,
    index: 3,
  },
];

const todoList = document.getElementById('todo-list');

createTodo(taskList, todoList);
