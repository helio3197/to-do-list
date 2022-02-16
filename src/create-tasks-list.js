const createTodo = (list, tasksNode) => {
  tasksNode.innerHTML = '';

  list.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <form>
      <input type="checkbox">
      <input type="text" value=${item.description}>
      <button type="button"></button>
    </form>
    `;

    tasksNode.appendChild(li);

    if (item.completed) {
      const checkbox = document.querySelectorAll('#todo-list [type="checkbox"]')[index];
      checkbox.click();
    }
  });
};

export { createTodo as default };