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
  checkAndLoadArraysToLocalStorage();
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
  document.getElementById("addTaskTitleErrorInput").style.display = "none";
  document.getElementById("addTaskDateErrorInput").style.display = "none";
  document.getElementById("addTaskCategoryErrorInput").style.display = "none";
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
 * Posts a task to the local storage.
 * Combines buildTask and postTask into a single function call.
 * @param {string} state - The state of the task.
 * @param {string} [path='tasks'] - The storage path for the task.
 */
function postTask(state, path = "tasks") {
  console.log("state", state);
  console.log("path", path);
  let task = buildTask(state);
  let tasks = JSON.parse(localStorage.getItem(path)) || [];
  tasks.push(task);
  localStorage.setItem(path, JSON.stringify(tasks));
}

/**
 * Builds a task object from form input values for the board.
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
 * Generates a unique task ID in the format 'abc123'.
 * @returns {string} - The generated task ID.
 */
function generateTaskID() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let result = "";
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  for (let i = 0; i < 3; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
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
  let content = subTaskInput.value.trim();
  let newSubtask = {
    id: generateUniqueID(),
    content: content,
    status: "open",
  };
  subtasksArray.push(newSubtask);
  subTaskInput.value = "";
  renderAddTaskSubtaskList();
}

/**
 * Generates a unique ID for subtasks.
 */
function generateUniqueID() {
  return subtasksArray.length ? Math.max(...subtasksArray.map((subtask) => subtask.id)) + 1 : 1;
}

function renderAddTaskSubtaskList(ticketID) {
  let target = document.getElementById("subtasksList");
  target.innerHTML = "";
  for (let i = 0; i < subtasksArray.length; i++) {
    let itemID = subtasksArray[i].id;
    let itemContent = subtasksArray[i].content;
    target.innerHTML += renderSubtaskItem(itemID, itemContent, ticketID, i);
  }
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
function renderSubtaskList(ticketID) {
  let target = document.getElementById("subtasksList");
  target.innerHTML = "";
  localStorage.getItem("subtasks");
  for (let i = 0; i < subtasksArray.length; i++) {
    if (subtasksArray.length == 0) {
      break;
    } else {
      let itemID = subtasksArray[i].id;
      let itemContent = subtasksArray[i].content;
      target.innerHTML += renderSubtaskItem(itemID, itemContent, ticketID, i);
    }
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
  const updatedText = input.value.trim();
  if (updatedText === "") {
    input.value = "";
    input.placeholder = "No empty subtasks allowed";
    return;
  }
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
 * Checks if the form fields are filled and enables the create task button.
 */
function checkFormFilled() {
  const taskTitle = document.getElementById("task-title").value.trim();
  const taskDueDate = document.getElementById("task-due-date").value.trim();
  const taskCategory = document.getElementById("task-category").value.trim();
  const createTaskButton = document.getElementById("createTaskButton");
  const titleError = document.getElementById("addTaskTitleErrorInput");
  const dueDateError = document.getElementById("addTaskDateErrorInput");
  const categoryError = document.getElementById("addTaskCategoryErrorInput");
  const allFilled = taskTitle !== "" && taskDueDate !== "" && taskCategory !== "";
  if (allFilled) {
    createTaskButton.disabled = false;
  } else {
    createTaskButton.disabled = true;
    if (taskTitle === "") titleError.style.display = "none";
    if (taskDueDate === "") dueDateError.style.display = "none";
    if (taskCategory === "") categoryError.style.display = "none";
  }
}

/**
 * Prevents form submission and checks the validity of the form fields.
 * @param {Event} event - The event triggered on form submission.
 */
function checkFormValidity(event) {
  event.preventDefault();

  const taskTitle = document.getElementById("task-title").value.trim();
  const taskDueDate = document.getElementById("task-due-date").value.trim();
  const taskCategory = document.getElementById("task-category").value.trim();

  const titleValid = taskTitle.length >= 4;
  const dueDateValid = taskDueDate.length >= 6;
  const categoryValid = taskCategory.length >= 3;

  showValidationFeedback("task-title", "addTaskTitleErrorInput", titleValid);
  showValidationFeedback("task-due-date", "addTaskDateErrorInput", dueDateValid);
  showValidationFeedback("task-category", "addTaskCategoryErrorInput", categoryValid);

  if (titleValid && dueDateValid && categoryValid) {
    showAddTaskOverlayNextStep();
  }
}

/**
 * Displays validation feedback for each input field.
 * @param {string} inputId - The ID of the input field.
 * @param {string} errorId - The ID of the error message.
 * @param {boolean} isValid - Indicates if the input field is valid.
 */
function showValidationFeedback(inputId, errorId, isValid) {
  const inputField = document.getElementById(inputId);
  const errorField = document.getElementById(errorId);

  if (isValid) {
    inputField.classList.remove("contacts_input_error");
    errorField.style.display = "none"; // Fehlernachricht ausblenden
  } else {
    inputField.classList.add("contacts_input_error");
    errorField.style.display = "block"; // Fehlernachricht anzeigen
  }
}
