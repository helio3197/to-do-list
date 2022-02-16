import { removeTask } from './task-list-features.js';

const todoList = document.getElementById('todo-list');

const createTodo = (list, tasksNode = todoList) => {
  tasksNode.innerHTML = '';

  list.forEach((item, index) => {
    const li = document.createElement('li');
    li.id = `${item.index}`;
    li.innerHTML = `
    <form class="todo-item">
      <input type="checkbox">
      <input type="text" value='${item.description}' required>
      <button type="button" class="fas fa-ellipsis-v"></button>
    </form>
    `;

    tasksNode.appendChild(li);

    if (item.completed) {
      const checkbox = document.querySelectorAll('#todo-list [type="checkbox"]')[index];
      checkbox.click();
    }

    li.querySelector('[type="text"]').addEventListener('click', () => {
      const trashButton = li.querySelector('button');
      trashButton.className = 'fas fa-trash-alt';
      trashButton.addEventListener('click', (e) => {
        // console.log("run")
        e.stopImmediatePropagation();
        const newList = removeTask(list, li.id - 1);
        if (newList.length !== 0) {
          createTodo(newList);
        } else {
          tasksNode.innerHTML = '<li class="todo-list-empty">There are no tasks to do!</li>';
        }
      });
      window.addEventListener('click', (e) => {
        if (e.target !== li.querySelector('button') && e.target !== li.querySelector('[type="text"]')) {
          li.querySelector('button').className = 'fas fa-ellipsis-v';
        }
      });
    });
  });
};

export { createTodo as default };