/**
 * Finds the unique task ID in localStorage and returns the task object.
 * @param {string} targetID
 * @returns the task object with the given ID
 */
function findTaskById(targetID) {
  const tasksString = localStorage.getItem("tasks");
  if (tasksString) {
    const tasks = JSON.parse(tasksString);
    return tasks.find((task) => task.id === targetID) || null;
  }
  return null;
}

/**
 * Closes the overlay, after clicking outside of the Overlay-Ticket
 * @param {*} event
 */
function closeOverlayOnClick(event) {
  if (event.target === document.getElementById("overlayID")) {
    toggleOverlay();
  }
}

/**
 * Toggles the Overlay view
 */
function toggleOverlay() {
  let overlay = document.getElementById("overlayID");
  if (overlay.classList.contains("d_none")) {
    overlay.classList.remove("d_none");
    overlay.classList.add("d_flex");
    document.body.style.overflow = "hidden";
  } else {
    overlay.classList.remove("d_flex");
    overlay.classList.add("d_none");
    document.body.style.overflow = "auto";
    subtasksArray = [];
    selectedUsers = [];
  }
}

/**
 * Opens the edit-Overlay of the ticket and loads the ticket-data into the overlay
 * @param {*} ticketID
 * @param {*} ticketTitle
 * @param {*} ticketDescription
 * @param {*} ticketDate
 * @param {*} prio
 */
function editTicket(ticketID, ticketTitle, ticketDescription, ticketDate, prio) {
  let target = document.getElementById("overlayCard");
  target.innerHTML = "";
  target.innerHTML = renderOverlayEditTicket(ticketID);
  document.getElementById("task-title-overlay-edit").value = ticketTitle;
  document.getElementById("task-description-overlay-edit").value = ticketDescription;
  document.getElementById("task-due-date-overlay-edit").value = ticketDate;
  setPriorityOnEdit(prio);
  loadAssignedContacts(ticketID);
}

/**
 * Loads the assigned contacts and updates the display.
 * @param {string} ticketID - The ID of the selected task
 */
function loadAssignedContacts(ticketID) {
  let task = allTasks.find((task) => task.id === ticketID);
  selectedUsers = task.assigned_to;
  let container = document.getElementById("selectedUsers");
  container.innerHTML = "";
  let maxUsers = Math.min(selectedUsers.length, 4);
  for (let i = 0; i < maxUsers; i++) {
    let initials = selectedUsers[i].name.charAt(0).toUpperCase() + selectedUsers[i].name.charAt(selectedUsers[i].name.length - 1).toUpperCase();
    let bgColor = selectedUsers[i].color;
    container.innerHTML += renderUserCircle(initials, bgColor);
  }
  if (selectedUsers.length > 4) {
    let additionalUsers = selectedUsers.length - 4;
    let initials = `+${additionalUsers}`;
    let bgColor = "#2B3647";
    container.innerHTML += renderUserCircle(initials, bgColor);
  }
}

/**
 * Sets the Priority on the Edit-Overlay based on the prio the task has
 * @param {string} prio
 */
function setPriorityOnEdit(prio) {
  if (prio === "urgent") {
    setUrgent();
  } else if (prio === "medium") {
    setMedium();
  } else if ((prio = "low")) {
    setLow();
  }
}

/**
 * Sets the Design of the Urgent-Button and temporarily saves the prio into the selectedPrio variable
 */
function setUrgent() {
  activateButton("urgent-btn", "urgent-svg", "urgent", "urgent-icon");
  editedPrio = "urgent";
}

/**
 * Sets the Design of the Medium-Button and temporarily saves the prio into the selectedPrio variable
 */
function setMedium() {
  activateButton("medium-btn", "medium-svg", "medium", "medium-icon");
  editedPrio = "medium";
}

/**
 * Sets the Design of the Low-Button and temporarily saves the prio into the selectedPrio variable
 */
function setLow() {
  activateButton("low-btn", "low-svg", "low", "low-icon");
  editedPrio = "low";
}

/**
 * Based on the clicked Prio-Button, the style of the button is changing. Makes sure, that only one Prio-Button could be active.
 * @param {string} buttonId
 * @param {string} svgId
 * @param {string} buttonClass
 * @param {string} svgClass
 */
function activateButton(buttonId, svgId, buttonClass, svgClass) {
  const buttons = document.querySelectorAll(".prio-btn");
  buttons.forEach((button) => {
    button.classList.remove("urgent", "medium", "low", "active");
  });
  const svgs = document.querySelectorAll("svg");
  svgs.forEach((svg) => {
    svg.classList.remove("urgent-icon", "medium-icon", "low-icon");
  });
  document.getElementById(buttonId).classList.add(buttonClass, "active");
  document.getElementById(svgId).classList.add(svgClass);
}

/**
 * Gets the new variables content and saves it to the firebase database while accordingly updating the board UI
 * @param {string} ticketID
 */
async function saveEditOnClick(ticketID) {
  let newTitle = document.getElementById("task-title-overlay-edit").value;
  let newDescription = document.getElementById("task-description-overlay-edit").value;
  let newDueDate = document.getElementById("task-due-date-overlay-edit").value;
  let newPrio = editedPrio;
  let newAssignedUsers = selectedUsers;
  let newSubtasks = subtasksArray;
  let firebaseID = await findFirebaseIdById(ticketID);
  let data = buildEditTask(newTitle, newDescription, newDueDate, newPrio, newAssignedUsers, newSubtasks);
  await patchTask(firebaseID, data);
  showToast("The ticket was edited successfully", "success");
  setTimeout(() => {
    toggleOverlay();
    location.reload();
  }, 2500);
}

/**
 * Clears the assigned users for a specific task.
 *
 * @param {string} ticketID - The unique identifier of the task to be updated.
 * @returns {void} This function doesn't return a value, it modifies the allTasks array in-place.
 * @description
 * This function searches for a task in the allTasks array using the provided ticketID.
 * If found, it clears the assigned_to array of that task, effectively removing all assigned users.
 * If the task is not found, it logs an error to the console.
 */
function clearAssignedTo(ticketID) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((task) => task.id === ticketID);
  if (taskIndex !== -1) {
    tasks[taskIndex].assigned_to = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    console.error("Task not found in tasks array");
  }
}

/**
 * Retrieves the updated task details from the edit form.
 * @returns {Object} The updated task details.
 */
function getUpdatedTaskDetails() {
  return {
    title: document.getElementById("task-title-overlay-edit").value,
    description: document.getElementById("task-description-overlay-edit").value,
    due_date: document.getElementById("task-due-date-overlay-edit").value,
    prio: editedPrio,
    assigned_to: selectedUsers,
    subtasks: subtasksArray,
  };
}

/**
 * Updates the task in the allTasks array.
 * @param {number} index - The index of the task to update.
 * @param {Object} updatedTask - The updated task details.
 */
function updateTaskInAllTasks(index, updatedTask) {
  allTasks[index] = { ...allTasks[index], ...updatedTask };
}

/**
 * Updates the tasks array in local storage.
 */
function updateTasksInLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

/**
 * Handles the successful edit process by showing a toast and updating the UI.
 */
function handleSuccessfulEdit() {
  showToast("The ticket was edited successfully", "success");
  setTimeout(() => {
    toggleOverlay();
    renderAllTickets(allTasks);
  }, 2500);
}

/**
 * Gets the new entries and returns a JSON Object
 * @param {strign} newTitle
 * @param {string} newDescription
 * @param {string} newDueDate
 * @param {string} newPrio
 * @param {Array} newAssignedUsers
 * @param {Array} newSubtasks
 * @returns a JSON Object
 */
function buildEditTask(newTitle, newDescription, newDueDate, newPrio, newAssignedUsers, newSubtasks) {
  let taskTitle = newTitle;
  let taskDate = newDueDate;
  let taskPrio = newPrio;
  let taskDescription = newDescription;
  let taskSubtasks = newSubtasks;
  let taskAssigned = newAssignedUsers;
  return editedTaskToJSON(taskTitle, taskDate, taskPrio, taskDescription, taskSubtasks, taskAssigned);
}

/**
 * Gets the new content of the variables and turns them into a JSON-Format
 * @param {string} taskTitle
 * @param {string} taskDate
 * @param {string} taskPrio
 * @param {string} taskDescription
 * @param {Array} taskSubtasks
 * @param {Array} taskAssigned
 * @returns a JSON Object
 */
function editedTaskToJSON(taskTitle, taskDate, taskPrio, taskDescription, taskSubtasks, taskAssigned) {
  return {
    title: taskTitle,
    due_date: taskDate,
    prio: taskPrio,
    description: taskDescription,
    subtasks: taskSubtasks,
    assigned_to: taskAssigned,
  };
}

/**
 * Renders the list of editable subtasks for a specific task.
 * @param {string} ticketID - The ID of the task for which to render the subtasks.
 */
function renderEditSubtaskList(ticketID) {
  let target = document.getElementById("subtasksList");
  target.innerHTML = "";
  localStorage.getItem("subtasks");
  for (let i = 0; i < subtasksArray.length; i++) {
    if (subtasksArray.length == 0) {
      break;
    } else {
      let itemID = subtasksArray[i].id;
      let itemContent = subtasksArray[i].content;
      target.innerHTML += renderEditSubtaskItem(itemID, itemContent, ticketID, i);
    }
  }
}

/**
 * Gets the numeric ID from a subtask ID string.
 * @param {string} id - The subtask ID.
 * @returns {string} The numeric ID.
 */
function getEditNumericID(id) {
  return id;
}

/**
 * Reindexes the subtasks array and updates their IDs.
 */
function reindexEditSubtasks() {
  subtasksArray.forEach((subtask, i) => {
    subtask.id = `subtask_${i + 1}`;
  });
}

/**
 * Retrieves the closest subtask item element from the event target.
 * @param {Event} event - The event object.
 * @returns {HTMLElement} The closest subtask item element.
 */
function getClosestEditSubtaskItem(event) {
  return event.target.closest(".subtask-item");
}

/**
 * Handles the delete click event for an editable subtask.
 * @param {Event} event - The event object.
 * @param {string} ticketID - The ID of the task the subtask belongs to.
 */
function handleDeleteEditClick(event, ticketID) {
  const subtaskItem = getClosestEditSubtaskItem(event);
  if (!subtaskItem) {
    console.error("Subtask item not found");
    return;
  }
  const index = Array.from(subtaskItem.parentElement.children).indexOf(subtaskItem);
  if (ticketID === undefined) {
    deleteEditSubtaskLocally(subtaskItem, index);
  } else {
    deleteSubtaskBoardEdit(subtaskItem, ticketID, index);
  }
  renderEditSubtaskList(ticketID);
}

/**
 * Deletes an editable subtask locally and updates the UI.
 * @param {HTMLElement} subtaskItem - The subtask item to delete.
 * @param {number} index - The index of the subtask to delete.
 */
function deleteEditSubtaskLocally(subtaskItem, index) {
  subtasksArray.splice(index, 1);
  subtaskItem.remove();
  if (subtasksArray.length < 4) {
    enableInputAndButton();
  }
}

/**
 * Deletes an editable subtask from the Firebase database and updates the UI.
 * @param {HTMLElement} subtaskItem - The subtask item to delete.
 * @param {string} ticketID - The ID of the task the subtask belongs to.
 * @param {number} index - The index of the subtask to delete.
 **/
function deleteSubtaskBoardEdit(subtaskItem, ticketID, index) {
  subtasksArray.splice(index, 1);
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
 * Extracts the numeric ID from a subtask item's ID.
 * @param {HTMLElement} subtaskItem - The subtask item.
 * @returns {number} The numeric ID.
 */
function getNumericID(subtaskItem) {
  return parseInt(subtaskItem.id.split("_")[1], 10);
}

/**
 * Reindexes the subtasks array and updates their IDs.
 */
function reindexSubtasks() {
  subtasksArray.forEach((subtask, i) => (subtask.id = i + 1));
}
