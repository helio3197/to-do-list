import { saveListToStorage } from './task-list-features.js';
import sortTaskList from './sort-task-array.js';

const dragTask = (e, nodeLi, list, createTaskListFunc) => {
  const startPosX = e.clientX;
  let startPosY = e.clientY;

  const dragMove = (e) => {
    const offsetX = `${e.clientX - startPosX}px`;
    const offsetY = `${e.clientY - startPosY}px`;
    nodeLi.style.transform = `translate(${offsetX}, ${offsetY})`;

    const itemHeight = nodeLi.clientHeight;
    let currentPos = 0;
    currentPos = Math.floor(Math.abs((e.clientY - startPosY) / itemHeight));
    if ((e.clientY - startPosY) > 0 && currentPos >= 1) currentPos *= -1;

    const listNode = nodeLi.parentElement.querySelectorAll('li');
    if (currentPos >= 1 && nodeLi.id !== '1') {
      const tempId = nodeLi.id;
      nodeLi.id = 'temp';
      nodeLi.style.order = `${+tempId - 2}`;
      document.getElementById(`${+tempId - 1}`).id = tempId;
      document.getElementById(tempId).style.order = `${+tempId - 1}`;
      nodeLi.id = `${+tempId - 1}`;
      startPosY = e.clientY;
      nodeLi.style.transform = `translate(${offsetX}, 0px)`;
      const tempList = list[+tempId - 1];
      list[+tempId - 1] = list[+tempId - 2];
      list[+tempId - 2] = tempList;
    } else if (currentPos <= -1 && nodeLi.id !== `${listNode.length}`) {
      const tempId = nodeLi.id;
      nodeLi.id = 'temp';
      nodeLi.style.order = `${+tempId}`;
      document.getElementById(`${+tempId + 1}`).id = tempId;
      document.getElementById(tempId).style.order = `${+tempId - 1}`;
      nodeLi.id = `${+tempId + 1}`;
      startPosY = e.clientY;
      nodeLi.style.transform = `translate(${offsetX}, 0px)`;
      const tempList = list[+tempId - 1];
      list[+tempId - 1] = list[+tempId];
      list[+tempId] = tempList;
    }
  };
  const dragDrop = () => {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragDrop);

    list = sortTaskList(list);
    saveListToStorage(list);
    createTaskListFunc(list);
  };
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragDrop);
};

export { dragTask as default };
