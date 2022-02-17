import { removeTask, editTask } from './task-list-features.js';
import { checkoutTask } from './checkbox-interaction.js';

const todoList = document.getElementById('todo-list');

const createTodo = (list, tasksNode = todoList) => {
  if (list.length === 0) {
    tasksNode.innerHTML = '<li class="todo-list-empty">There are no tasks to do!</li>';

    return false;
  }

  tasksNode.innerHTML = '';

  list.forEach((item) => {
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

    descriptionField.addEventListener('click', () => {
      const trashButton = li.querySelector('button');
      trashButton.className = 'fas fa-trash-alt';
      trashButton.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        const newList = removeTask(list, li.id - 1);

        createTodo(newList);
      });
      window.addEventListener('click', (e) => {
        if (e.target !== li.querySelector('button') && e.target !== li.querySelector('[type="text"]')) {
          li.querySelector('button').className = 'fas fa-ellipsis-v';
        }
      });
    });
  });

  return list;
};

export { createTodo as default };
