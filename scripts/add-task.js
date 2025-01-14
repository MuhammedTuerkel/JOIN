let selectedContacts = [];
let selectedPrio = "medium";
let subtasksArray = [];

function addTaskOnInit() {
  sideNavigation();
  onloadFunction();
  setMedium();
  subtaskInput();
  addTaskClearTask();
  getLoggedInUserData();
  initializeKeyDown();
  initializeTasksOnLoad();
}

/**
 * Initializes the tasks array in local storage on page load.
 */
function initializeTasksOnLoad() {
  let existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (existingTasks.length === 0) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    existingTasks = tasks;
  }
  window.tasks = existingTasks;
}

/**
 * clears the list from all subtasks, clears the list of all assigned users
 */
function addTaskClearTask() {
  let list = document.getElementById("subtasksList");
  let assignedList = document.getElementById("selectedUsers");
  document.getElementById("urgent-btn").classList.remove("urgent");
  document.getElementById("urgent-btn").classList.remove("active");
  setMedium();
  document.getElementById("medium-btn").classList.add("active");
  document.getElementById("low-btn").classList.remove("low");
  document.getElementById("low-btn").classList.remove("active");
  selectedContacts = [];
  subtasksArray = [];
  selectedPrio = "medium";
  enableInputAndButton();
  list.innerHTML = "";
  assignedList.innerHTML = "";
}

/**
 * Goes back to the add task step in the overlay.
 * @param {Event} event - The event object.
 */
function goBackToAddTask(event) {
  document.getElementById("addTaskOverlayNextStep").style.display = "none";
  document.body.style.overflow = "auto";
  event.preventDefault();
}

/**
 * Posts a task to the local storage and the global tasks array.
 * @param {string} [path=""] - The path to store in local storage.
 * @param {Object} [data={}] - The data to be added to the local storage.
 */
function postTask(path = "", data = {}) {
  let tasks = JSON.parse(localStorage.getItem(path)) || [];
  tasks.push(data);
  localStorage.setItem(path, JSON.stringify(tasks));
  window.tasks.push(data);
}

/**
 * Builds a task object from form input values.
 * @param {string} state - The state of the task.
 * @returns {Object} - The task object in JSON format.
 */
function buildTask(state) {
  let taskTitle = document.getElementById("task-title").value;
  let taskDate = document.getElementById("task-due-date").value;
  let taskPrio = selectedPrio;
  let taskDescription = document.getElementById("task-description").value;
  let taskCategory = document.getElementById("task-category").value;
  let taskSubtasks = subtasksArray;
  let taskState = state;
  let taskAssigned = selectedContacts;
  return taskToJSON(taskTitle, taskDate, taskPrio, taskDescription, taskCategory, taskSubtasks, taskAssigned, taskState);
}

/**
 * Builds a task object from form input values for the board.
 * @param {string} state - The state of the task.
 * @returns {Object} - The task object in JSON format.
 */
function buildTaskOnBoard(state) {
  let taskTitle = document.getElementById("task-title").value;
  let taskDate = document.getElementById("task-due-date").value;
  let taskPrio = selectedPrioOnBoard;
  let taskDescription = document.getElementById("task-description").value;
  let taskCategory = document.getElementById("task-category").value;
  let taskSubtasks = subtasksArray;
  let taskState = state;
  let taskAssigned = selectedContacts;
  return taskToJSON(taskTitle, taskDate, taskPrio, taskDescription, taskCategory, taskSubtasks, taskAssigned, taskState);
}

/**
 * Handles the input event for the subtask input field.
 */
function subtaskInput() {
  const input = document.getElementById("task-subtasks");
  const iconsContainer = document.getElementById("iconsContainer");
  const addSubtaskBtn = document.getElementById("add-subtask-btn");
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      iconsContainer.style.visibility = "visible";
      addSubtaskBtn.style.visibility = "hidden";
    } else {
      iconsContainer.style.visibility = "hidden";
      addSubtaskBtn.style.visibility = "visible";
    }
  });
}

/**
 * Clears the subtask input field and updates the UI accordingly.
 */
function clearSubtaskInput() {
  const input = document.getElementById("task-subtasks");
  const clearIcon = document.getElementById("clearIcon");
  const iconsContainer = document.getElementById("iconsContainer");
  const addSubtaskBtn = document.getElementById("add-subtask-btn");
  clearIcon.addEventListener("click", () => {
    input.value = "";
    input.focus();
    iconsContainer.style.visibility = "hidden";
    addSubtaskBtn.style.visibility = "visible";
  });
}

/**
 * Adds a new subtask to the subtasks array and updates the UI.
 */
function pushSubtaskArray() {
  let subTaskInput = document.getElementById("task-subtasks");
  let arrayLength = subtasksArray.length;
  let content = subTaskInput.value.trim();
  if (subtasksArray.length < 4 && content !== "") {
    subtasksArray.push({
      id: arrayLength + 1,
      content: content,
      status: "open",
    });
    subTaskInput.value = "";
    renderSubtaskList();
    if (subtasksArray.length >= 4) {
      disableInputAndButton();
    }
  } else if (arrayLength >= 4) {
    disableInputAndButton();
  }
  document.getElementById("iconsContainer").style.visibility = "hidden";
  document.getElementById("add-subtask-btn").style.visibility = "visible";
}

/**
 * Disables the subtask input field and add button.
 */
function disableInputAndButton() {
  let subtaskInput = document.getElementById("task-subtasks");
  let addButton = document.getElementById("add-subtask-btn");
  subtaskInput.placeholder = "maximum 4 Subtasks reached";
  subtaskInput.disabled = true;
  addButton.disabled = true;
  subtaskInput.classList.add("disabled");
  addButton.classList.add("disabled");
}

/**
 * Enables the subtask input field and add button.
 */
function enableInputAndButton() {
  let subtaskInput = document.getElementById("task-subtasks");
  let addButton = document.getElementById("add-subtask-btn");
  subtaskInput.placeholder = "Add new subtask";
  subtaskInput.disabled = false;
  addButton.disabled = false;
  subtaskInput.classList.remove("disabled");
  addButton.classList.remove("disabled");
}

/**
 * Renders the list of subtasks.
 */
function renderSubtaskList() {
  let target = document.getElementById("subtasksList");
  target.innerHTML = "";
  for (let i = 0; i < subtasksArray.length; i++) {
    if (subtasksArray.length == 0) {
      break;
    } else {
      let itemID = subtasksArray[i].id;
      let itemContent = subtasksArray[i].content;
      target.innerHTML += renderSubtaskItem(itemID, itemContent);
    }
  }
}

// /**
//  * Handles click events on subtask action icons.
//  */
// document.addEventListener("click", (event, ticketID) => {
//   const target = event.target;
//   if (target.classList.contains("edit-icon")) {
//     handleEditClick(target);
//   } else if (target.classList.contains("save-icon")) {
//     handleSaveClick(target);
//   } else if (target.classList.contains("delete-icon")) {
//     handleDeleteClick(target, ticketID);
//   }
// });

/**
 * Handles the edit click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleEditClick(target) {
  const subtaskItem = target.closest(".subtask-item");
  const contentWrapper = subtaskItem.querySelector(".subtask-content-wrapper");
  const contentSpan = subtaskItem.querySelector(".subtask-content");
  subtaskItem.classList.add("editing");
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  const input = createInputField(contentSpan.textContent);
  const deleteIcon = createIcon("delete-icon", "./assets/icons/subtask-delete.png");
  const saveIcon = createIcon("save-icon", "./assets/icons/subtask-save.png");
  inputContainer.appendChild(input);
  inputContainer.appendChild(deleteIcon);
  inputContainer.appendChild(saveIcon);
  contentWrapper.innerHTML = "";
  contentWrapper.appendChild(inputContainer);
  const actions = subtaskItem.querySelector(".subtask-actions");
  actions.style.visibility = "hidden";
}

/**
 * Creates an icon element.
 * @param {string} className - The class name for the icon.
 * @param {string} src - The source URL for the icon image.
 * @returns {HTMLElement} - The created icon element.
 */
function createIcon(className, src) {
  const icon = document.createElement("img");
  icon.setAttribute("src", src);
  icon.setAttribute("alt", className);
  icon.classList.add(className);
  return icon;
}

/**
 * Creates an input field element for editing a subtask.
 * @param {string} currentText - The current text of the subtask.
 * @returns {HTMLElement} - The created input field element.
 */
function createInputField(currentText) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("subtask-input");
  return input;
}

/**
 * Edits an entry in the subtasks array.
 * @param {number} subtaskID - The ID of the subtask to edit.
 * @param {string} updatedText - The updated text for the subtask.
 */
function editArrayEntry(subtaskID, updatedText) {
  const subtask = subtasksArray.find((item) => item.id === subtaskID);
  if (subtask) {
    subtask.content = updatedText;
  }
}

/**
 * Deletes an entry from the subtasks array.
 * @param {number} subtaskID - The ID of the subtask to delete.
 */
function deleteArrayEntry(subtaskID) {
  const index = subtasksArray.findIndex((item) => item.id === subtaskID);
  if (index !== -1) {
    subtasksArray.splice(index, 1);
  }
}

/**
 * Handles the save click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleSaveClick(target) {
  const subtaskItem = target.closest(".subtask-item");
  const targetID = subtaskItem.id;
  const numericID = parseInt(targetID.split("_")[1], 10);
  const contentWrapper = subtaskItem.querySelector(".subtask-content-wrapper");
  const inputContainer = subtaskItem.querySelector(".input-container");
  const input = inputContainer.querySelector(".subtask-input");
  const updatedText = input.value;
  contentWrapper.innerHTML = saveSubtaskItem(updatedText);
  const actions = subtaskItem.querySelector(".subtask-actions");
  actions.style.visibility = "visible";
  inputContainer.remove();
  subtaskItem.classList.remove("editing");
  editArrayEntry(numericID, updatedText);
}

/**
 * Handles the cancel click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleCancelClick(target) {
  const subtaskItem = target.closest(".subtask-item");
  const contentWrapper = subtaskItem.querySelector(".subtask-content-wrapper");
  const inputContainer = subtaskItem.querySelector(".input-container");
  const contentSpan = subtaskItem.querySelector(".subtask-content");
  contentWrapper.innerHTML = cancelSubtaskItem(contentSpan.textContent);
  const actions = subtaskItem.querySelector(".subtask-actions");
  actions.style.visibility = "visible";
  inputContainer.remove();
}

// /**
//  * Handles the delete click event for a subtask.
//  * @param {HTMLElement} target - The target element that triggered the event.
//  */
// function handleDeleteClick(target, ticketID) {
//   const subtaskItem = target.closest(".subtask-item");
//   const targetID = subtaskItem.id;
//   console.log(targetID);
//   let subId = targetID.split("_");
//   let subTaskId;
//   if (subId.length > 1) {
//     subTaskId = subId[1];
//   }
//   console.log(ticketID);

//   const numericID = parseInt(targetID.split("_")[1], 10);

//   subtaskItem.remove();
//   localStorage.removeItem(subTaskId);

//   deleteArrayEntry(numericID);
//   if (subtasksArray.length < 4) {
//     enableInputAndButton();
//   }
// }

/**
 * Generates a unique ID based on the current timestamp and random values.
 * @returns {string} - The generated unique ID.
 */
function generateUniqueID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

/**
 * Shows the next step overlay for adding a task.
 * @param {Event} event - The event object.
 */
function showAddTaskOverlayNextStep(event) {
  event.preventDefault();
  document.getElementById("addTaskOverlayNextStep").style.display = "flex";
  document.body.style.overflow = "hidden";
}

/**
 * Checks the validity of the form fields and enables/disables the create task button accordingly.
 */
function checkFormValidity() {
  let taskTitle = document.getElementById("task-title").value;
  let taskDueDate = document.getElementById("task-due-date").value;
  let taskCategory = document.getElementById("task-category").value;
  let createTaskButton = document.getElementById("createTaskButton");
  if (taskTitle && taskDueDate && taskCategory) {
    createTaskButton.disabled = false;
  } else {
    createTaskButton.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    handleSubtaskClickEvents();
  } else {
    console.error("Overlay element not found.");
  }
});

/**
 * Handles click events on subtask action icons within the overlay.
 * @param {string} ticketID - The ID of the ticket containing the subtask.
 * @param {HTMLElement} overlay - The overlay element.
 */
function handleSubtaskClickEvents(ticketID, overlay) {
  overlay.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-icon")) {
      handleEditClick(target);
    } else if (target.classList.contains("save-icon")) {
      handleSaveClick(target);
    } else if (target.classList.contains("delete-icon")) {
      handleDeleteClick(target, ticketID);
    }
  });
}

/**
 * Handles the edit click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleEditClick(target) {
  const subtaskItem = target.closest(".subtask-item");
  const contentWrapper = subtaskItem.querySelector(".subtask-content-wrapper");
  const contentSpan = subtaskItem.querySelector(".subtask-content");
  subtaskItem.classList.add("editing");
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  const input = createInputField(contentSpan.textContent);
  const deleteIcon = createIcon("delete-icon", "./assets/icons/subtask-delete.png");
  const saveIcon = createIcon("save-icon", "./assets/icons/subtask-save.png");
  inputContainer.appendChild(input);
  inputContainer.appendChild(deleteIcon);
  inputContainer.appendChild(saveIcon);
  contentWrapper.innerHTML = "";
  contentWrapper.appendChild(inputContainer);
  const actions = subtaskItem.querySelector(".subtask-actions");
  actions.style.visibility = "hidden";
}

// /**
//  * Handles the save click event for a subtask.
//  * @param {HTMLElement} target - The target element that triggered the event.
//  */
// function handleSaveClick(target) {
//   // Code bleibt gleich
// }

/**
 * Handles the delete click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 * @param {string} ticketID - The ID of the ticket containing the subtask.
 */
function handleDeleteClick(target, ticketID) {
  console.log("hallo delete wurde geklickt");

  const subtaskItem = target.closest(".subtask-item");
  const targetID = subtaskItem.id;
  let subId = targetID.split("_")[1];
  const numericID = parseInt(subId, 10);

  subtaskItem.remove(ticketID);
  localStorage.removeItem(subId);
  deleteArrayEntry(numericID);
  localStorage.removeItem(ticketID);
  if (subtasksArray.length < 4) {
    enableInputAndButton();
  }
}
