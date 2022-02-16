import createTodo from './create-tasks-list.js';
import { addTask } from './task-list-features.js';
import './style.css';

const addTaskInput = document.getElementsByClassName('todo-add')[0];
let taskList = [];

if (localStorage.getItem('taskList')) {
  taskList = JSON.parse(localStorage.getItem('taskList'));
  if (taskList.length !== 0) {
    createTodo(taskList);
  }
}

addTaskInput.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = e.target.elements['new-task'];
  e.target.elements['new-task'].value = '';
  taskList = addTask(taskList, value);

  createTodo(taskList);
});
