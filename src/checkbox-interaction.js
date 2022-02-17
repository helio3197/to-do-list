const checkoutTask = (list, value, index) => {
  list[index].completed = value;
  localStorage.setItem('taskList', JSON.stringify(list));
};

export { checkoutTask as default };
