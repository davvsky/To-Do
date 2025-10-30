let taskInput = document.getElementById('taskInput');
let buttonAction = document.getElementById('getTask');
let activeList = document.getElementById('active');
let doneList = document.getElementById('done');
let abandonList = document.getElementById('abandon');

function createDeleteButton(listItem) {
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'btn-delete';

  deleteButton.addEventListener('click', function() {
  listItem.remove()
  });
  return deleteButton;
}

function createDoneButton(listItem) {
  let doneButton = document.createElement('button');
  doneButton.textContent = "Done"
  doneButton.className = 'btn-done';

  //We add a functionality to the done button, which on click will 
  doneButton.addEventListener('click', function(){
    listItem.remove(); //remove the element from the active list
    doneList.append(listItem); //move the element to the done list
    doneButton.remove();
    });
    return doneButton;
}

function createReactivateButton(listItem){
  //We create a button for user to move the item to Active list
  let reactivateButton = document.createElement('button');
  reactivateButton.textContent = "Reactivate"
  reactivateButton.className = 'btn-reactivate';

  reactivateButton.addEventListener('click', function(){
    listItem.remove();
    activeList.append(listItem);
    reactivateButton.remove();

    let buttonContainer = listItem.querySelector('.button-container');

    let doneButton = createDoneButton(listItem);
    buttonContainer.appendChild(doneButton);

    let abandonButton = createAbandonButton(listItem);
    buttonContainer.appendChild(abandonButton);
  });
  return reactivateButton
}

function createAbandonButton(listItem) {
  let abandonButton = document.createElement('button');
  abandonButton.textContent = "Abandon"
  abandonButton.className = 'btn-abandon';

  //Same functionality as done button, but it moves element to the abandon list
  abandonButton.addEventListener('click', function(){
    listItem.remove();
    abandonList.append(listItem);
    abandonButton.remove();

    let buttonContainer = listItem.querySelector('.button-container');

    //We create Reactivate button
    let reactivateButton = createReactivateButton(listItem)
    buttonContainer.appendChild(reactivateButton);
  });
  return abandonButton
}


buttonAction.addEventListener('click', function() {
  let newTask = taskInput.value.trim();
  if (newTask !== "") {

    let listItem = document.createElement('li');

    let taskText = document.createElement('span');
    taskText.textContent = newTask;
    taskText.className = 'task-text';
    listItem.appendChild(taskText);

    // Create a container for buttons
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    //Create the done button
    let doneButton = createDoneButton(listItem)
    buttonContainer.appendChild(doneButton)

    //Create the abandon button
    let abandonButton = createAbandonButton(listItem)
    buttonContainer.appendChild(abandonButton)

    //We create the delete button
    let deleteButton = createDeleteButton(listItem)
    buttonContainer.appendChild(deleteButton)

    // Add button container to list item
    listItem.appendChild(buttonContainer)
    
    //Adding a new task to the list
    activeList.appendChild(listItem)
    
    taskInput.value = ""
  };
});