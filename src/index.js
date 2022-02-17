import createTodo from './create-tasks-list.js';
import { addTask } from './task-list-features.js';
import { clearCompletedTasks } from './checkbox-interaction.js';
import './style.css';

const addTaskInput = document.getElementsByClassName('todo-add')[0];
const clearCompletedButton = document.querySelector('.todo-clear button');
const getListFromStorage = () => JSON.parse(localStorage.getItem('taskList'));
let taskList = [];

if (localStorage.getItem('taskList')) {
  taskList = getListFromStorage();
  createTodo(taskList);
}

addTaskInput.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = e.target.elements['new-task'];
  e.target.elements['new-task'].value = '';

  taskList = getListFromStorage();
  taskList = addTask(taskList, value);

  createTodo(taskList);
});

clearCompletedButton.addEventListener('click', () => {
  taskList = getListFromStorage();

  taskList = clearCompletedTasks(taskList);

  createTodo(taskList);
});
