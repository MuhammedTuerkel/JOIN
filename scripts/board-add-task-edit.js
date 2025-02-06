/**
 * Puts the ticket subtasks into the subtasksArray inclusive new subtasks and updates the UI accordingly
 * @param {string} ticketID
 */
function pushEditSubtasksInGlobalArray(ticketID, index) {
  let targetTicket = allTasks.filter((i) => i.id === ticketID);
  subtasksArray = targetTicket[0].subtasks || [];
  if (!targetTicket[0].subtasks) {
    targetTicket[0].subtasks = subtasksArray;
  }
  let newSubtask = document.getElementById("task-subtasks");
  subtasksArray.push({
    id: subtasksArray.length + 1,
    content: newSubtask.value,
    status: "open",
  });
  newSubtask.value = "";
  renderSubtaskList(ticketID);
}

/**
 * Pushes a new subtask to the task's subtasks array in local storage and updates the UI.
 * @param {string} ticketID - The ID of the task to which the subtask will be added.
 */
// function pushEditSubtasksArray(ticketID) {
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   let targetTask = tasks.find((task) => task.id === ticketID);
//   if (!targetTask) {
//     console.error("Task not found");
//     return;
//   }
//   if (!targetTask.subtasks) {
//     targetTask.subtasks = [];
//   }
//   let subTaskInput = document.getElementById("task-subtasks");
//   let content = subTaskInput.value.trim();

//   if (content !== "") {
//     let newSubtask = {
//       id: generateUniqueID(),
//       content: content,
//       status: "open",
//     };
//     targetTask.subtasks.push(newSubtask);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     subtasksArray = targetTask.subtasks;
//     subTaskInput.value = "";
//     renderEditSubtaskList(ticketID);
//     document.getElementById("iconsContainer").style.visibility = "hidden";
//     document.getElementById("add-subtask-btn").style.visibility = "visible";
//   }
// }

/**
 * Pushes a new subtask to the task's subtasks array in local storage and updates the UI.
 * @param {string} ticketID - The ID of the task to which the subtask will be added.
 */
function pushEditSubtasksArray(ticketID) {
  let subTaskInput = document.getElementById("task-subtasks");
  let content = subTaskInput.value.trim();
  let newSubtask = {
    id: generateUniqueID(),
    content: content,
    status: "open",
  };
  subtasksArray.push(newSubtask);
  subTaskInput.value = "";
  renderEditSubtaskList(ticketID);
  document.getElementById("iconsContainer").style.visibility = "hidden";
  document.getElementById("add-subtask-btn").style.visibility = "visible";
}

/**
 * Handles the edit click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleEditClick(target) {
  disabledActionButton();
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
 * Handles click events on subtask action icons.
 */
document.addEventListener("click", (event, ticketID) => {
  const target = event.target;
  if (target.classList.contains("edit-icon")) {
    handleEditClick(target);
  } else if (target.classList.contains("save-icon")) {
    handleSaveClick(target);
    enableActionButton();
  } else if (target.classList.contains("delete-icon")) {
    handleDeleteClick(target);
    enableActionButton();
  }
});

/**
 * Handles the save click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleSaveClick(target) {
  const subtaskItem = target.closest(".subtask-item");
  const createTaskButton = document.getElementById("createTaskButton");
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

function disabledActionButton() {
  let actionButton = document.getElementById("endEditBtn");
  let titleInput = document.getElementById("task-title-overlay-edit");
  let discriptionInput = document.getElementById("task-description-overlay-edit");
  let dateInput = document.getElementById("task-due-date-overlay-edit");
  actionButton.disabled = true;
  titleInput.disabled = true;
  discriptionInput.disabled = true;
  dateInput.disabled = true;
  actionButton.classList.add("disabled");
  titleInput.classList.add("disabled");
  discriptionInput.classList.add("disabled");
  dateInput.classList.add("disabled");
  disablePrioButtons();
  disableAssignedField();
  disableSubtaskInput();
}

function disablePrioButtons() {
  let prioLowButton = document.getElementById("low-btn");
  let prioMediumButton = document.getElementById("medium-btn");
  let prioUrgentButon = document.getElementById("urgent-btn");
  prioLowButton.classList.add("disabled");
  prioMediumButton.classList.add("disabled");
  prioUrgentButon.classList.add("disabled");
  prioLowButton.disabled = true;
  prioMediumButton.disabled = true;
  prioUrgentButon.disabled = true;
}

function disableAssignedField() {
  let assignedInput = document.getElementById("addTaskSearchContacts");
  let assignedContainer = document.getElementById("assigned");
  assignedInput.classList.add("disabled");
  assignedContainer.classList.add("disabled");
  assignedInput.disabled = true;
}

function disableSubtaskInput() {
  let tasksList = document.getElementById("task-subtasks");
  let taskButton = document.getElementById("add-subtask-btn");
  taskButton.disabled = true;
  tasksList.classList.add("disabled");
  taskButton.classList.add("disabled");
}

function enableActionButton() {
  let actionButton = document.getElementById("endEditBtn");
  let titleInput = document.getElementById("task-title-overlay-edit");
  let discriptionInput = document.getElementById("task-description-overlay-edit");
  let dateInput = document.getElementById("task-due-date-overlay-edit");
  actionButton.disabled = false;
  titleInput.disabled = false;
  discriptionInput.disabled = false;
  dateInput.disabled = false;
  actionButton.classList.remove("disabled");
  titleInput.classList.remove("disabled");
  discriptionInput.classList.remove("disabled");
  dateInput.classList.remove("disabled");
  enablePrioButtons();
  enableAssignedField();
  enableSubtaskInput();
}

function enablePrioButtons() {
  let prioLowButton = document.getElementById("low-btn");
  let prioMediumButton = document.getElementById("medium-btn");
  let prioUrgentButon = document.getElementById("urgent-btn");
  prioLowButton.classList.remove("disabled");
  prioMediumButton.classList.remove("disabled");
  prioUrgentButon.classList.remove("disabled");
  prioLowButton.disabled = false;
  prioMediumButton.disabled = false;
  prioUrgentButon.disabled = false;
}

function enableAssignedField(event) {
  let assignedInput = document.getElementById("addTaskSearchContacts");
  let assignedContainer = document.getElementById("assigned");
  assignedInput.classList.remove("disabled");
  assignedContainer.classList.remove("disabled");
  assignedInput.disabled = false;
}

function enableSubtaskInput() {
  let tasksList = document.getElementById("task-subtasks");
  let taskButton = document.getElementById("add-subtask-btn");
  taskButton.disabled = false;
  tasksList.classList.remove("disabled");
  taskButton.classList.remove("disabled");
}

/**
 * Retrieves the closest subtask item element from the event target.
 * @param {Event} event - The event object.
 * @returns {HTMLElement} The closest subtask item element.
 */
function getClosestSubtaskItem(event) {
  return event.target.closest(".subtask-item");
}

/**
 * Handle the click event for deleting a subtask while editing an input field.
 * @param {HTML-Element} element
 */
function handleDeleteWhileEditInput(element) {
  const inputContainer = element.closest(".input-container");
  const endEditButton = document.getElementById("endEditBtn");
  const createTaskButton = document.getElementById("createTaskButton");
  if (inputContainer) {
    const input = inputContainer.querySelector("input.subtask-input");
    if (input) {
      const subtaskID = input.id;
      let ticketID = getTicketIDFromLocalStorage(subtaskID);
      if (ticketID === null) {
        ticketID = "undefined";
      }
      if (endEditButton) {
        endEditButton.ariaDisabled = false;
      } else if (createTaskButton) {
        createTaskButton.ariaDisabled = false;
      }
      handleDeleteClick(event, ticketID);
    } else {
      console.error("Keine Subtask ID gefunden");
    }
  } else {
    console.error('Kein übergeordnetes Element mit der Klasse "input-container" gefunden');
  }
  enableActionButton();
}

/**
 * Reindexes the subtasks array and updates their IDs.
 */
function reindexSubtasks() {
  subtasksArray.forEach((subtask, i) => (subtask.id = i + 1));
}

/**
 * Handles the delete click event for a subtask.
 * @param {Event} event - The event object.
 * @param {string} ticketID - The ID of the task the subtask belongs to.
 * @param {number} index - The index of the subtask to delete.
 */
function handleDeleteClick(event, ticketID, index) {
  const subtaskItem = getClosestSubtaskItem(event);
  if (ticketID === "undefined") {
    deleteSubtaskLocally(subtaskItem, index);
  }
}

/**
 * Retrieves the closest subtask item element from the event target.
 * @param {Event} event - The event object.
 * @returns {HTMLElement} The closest subtask item element.
 */
function getClosestSubtaskItem(event) {
  return event.target.closest(".subtask-item");
}

/**
 * Deletes a subtask locally and updates the UI.
 * @param {HTMLElement} subtaskItem - The subtask item to delete.
 * @param {number} index - The index of the subtask to delete.
 */
function deleteSubtaskLocally(subtaskItem, index) {
  if (subtaskItem) subtaskItem.remove();
  subtasksArray.splice(index, 1);
  reindexSubtasks();
  if (subtasksArray.length < 4) enableInputAndButton();
}
