let taskInput = document.getElementById('taskInput');
let buttonAction = document.getElementById('getTask');
let activeList = document.getElementById('active');

buttonAction.addEventListener('click', function() {
  let newTask = taskInput.value;
  let listItem = document.createElement('li');

  listItem.textContent = newTask;
  activeList.appendChild(listItem)

  taskInput.value = " "
});