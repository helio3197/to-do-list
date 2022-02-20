import { removeTask, editTask } from './task-list-features.js';
import { checkoutTask } from './checkbox-interaction.js';
import { dragTask, dragTaskTouch } from './drag-tasks.js';

const todoList = document.getElementById('todo-list');

const createTodo = (list, tasksNode = todoList) => {
  if (list.length === 0) {
    tasksNode.innerHTML = '<li class="todo-list-empty">There are no tasks to do!</li>';

    return false;
  }

  tasksNode.innerHTML = '';

  list.forEach((item, index, list) => {
    const li = document.createElement('li');
    li.id = `${item.index}`;
    li.style.order = `${index}`;
    li.innerHTML = `
    <form class="todo-item">
      <input type="checkbox">
      <input type="text" value='${item.description}' required>
      <button type="button" class="fas fa-ellipsis-v"></button>
    </form>
    `;

    tasksNode.appendChild(li);

    const checkbox = li.querySelector('[type="checkbox"]');

    if (item.completed) {
      checkbox.checked = true;
    }

    checkbox.addEventListener('change', () => {
      checkoutTask(list, checkbox.checked, li.id - 1);
    });

    const descriptionField = li.querySelector('[type="text"]');

    li.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      li.click();
      descriptionField.blur();
    });

    descriptionField.addEventListener('input', () => {
      editTask(list, descriptionField.value, li.id - 1);
    });

    const trashMoveButton = li.querySelector('button');

    const dragStart = (e) => {
      dragTask(e, li, list, createTodo);
    };
    trashMoveButton.addEventListener('mousedown', dragStart);

    const dragStartTouch = (e) => {
      e.preventDefault();
      dragTaskTouch(e, li, list, createTodo);
    };
    trashMoveButton.addEventListener('touchstart', dragStartTouch);

    descriptionField.addEventListener('click', () => {
      trashMoveButton.removeEventListener('mousedown', dragStart);
      trashMoveButton.removeEventListener('touchstart', dragStartTouch);
      trashMoveButton.className = 'fas fa-trash-alt';
      li.className = 'todo-item-select';
      const trashButtonFunc = (e) => {
        e.stopImmediatePropagation();
        const newList = removeTask(list, li.id - 1);

        createTodo(newList);
      };
      trashMoveButton.addEventListener('click', trashButtonFunc);
      window.addEventListener('click', (e) => {
        if (e.target !== trashMoveButton && e.target !== li.querySelector('[type="text"]')) {
          trashMoveButton.removeEventListener('click', trashButtonFunc);
          trashMoveButton.className = 'fas fa-ellipsis-v';
          li.className = '';
          trashMoveButton.addEventListener('mousedown', dragStart);
          trashMoveButton.addEventListener('touchstart', dragStartTouch);
        }
      });
    });
  });

  return list;
};

export { createTodo as default };
