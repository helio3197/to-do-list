import createTodo from './create-tasks-list.js';
import { addTask } from './task-list-features.js';
import './style.css';

const todoList = document.getElementById('todo-list');
const addTaskInput = document.getElementsByClassName('todo-add')[0];
let taskList = [];

if (localStorage.getItem('taskList')) {
  taskList = JSON.parse(localStorage.getItem('taskList'));
  createTodo(taskList, todoList);
}

addTaskInput.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = e.target.elements['new-task'];
  e.target.elements['new-task'].value = '';
  taskList = addTask(taskList, value);

  createTodo(taskList, todoList);
});
