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
 * Shows the ticket in the overlay when clicked on it
 * @param {string} category - The category of the ticket
 * @param {string} ticketTitle  - The Ticket title
 * @param {string} ticketDescription - The Ticket description
 * @param {string} ticketDate - The due date of the ticket
 * @param {string} prio - The Priority of the ticket
 * @param {string} ticketID - The exact ID which is based on the localStorage ID
 */
function showOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID) {
  document.getElementById("overlayID").innerHTML = renderOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID);
  renderAssignedUsersOverlay(ticketID);
  renderSubtasksOverlay(ticketID);
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
 * Gets the new variables content and saves it to localStorage while accordingly updating the board UI
 * @param {string} ticketID
 */
function saveEditOnClick(ticketID) {
  let newTitle = document.getElementById("task-title-overlay-edit").value;
  let newDescription = document.getElementById("task-description-overlay-edit").value;
  let newDueDate = document.getElementById("task-due-date-overlay-edit").value;
  let newPrio = editedPrio;
  let newAssignedUsers = selectedUsers;
  let newSubtasks = subtasksArray;

  let taskIndex = allTasks.findIndex((task) => task.id === ticketID);
  if (taskIndex !== -1) {
    allTasks[taskIndex] = {
      ...allTasks[taskIndex],
      title: newTitle,
      description: newDescription,
      due_date: newDueDate,
      prio: newPrio,
      assigned_to: newAssignedUsers,
      subtasks: newSubtasks,
    };
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showToast("The ticket was edited successfully", "success");
    setTimeout(() => {
      toggleOverlay();
      renderAllTickets(allTasks);
    }, 2500);
  } else {
    console.error("Task not found in allTasks array");
  }
}

/**
 * Patches the task in the localStorage
 * @param {string} taskID
 * @param {object} data
 */
function patchTask(taskID, data) {
  let tasksString = localStorage.getItem("tasks");
  if (tasksString) {
    let tasks = JSON.parse(tasksString);
    let taskIndex = tasks.findIndex((task) => task.id === taskID);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...data };
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      console.error("Task not found in tasks array");
    }
  }
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
 * Puts the ticket subtasks into the subtasksArray inclusive new subtasks and updates the UI accordingly
 * @param {string} ticketID
 */
function pushEditSubtasksArray(ticketID) {
  let targetTicket = allTasks.filter((i) => i.id === ticketID);
  subtasksArray = targetTicket[0].subtasks || [];
  if (!targetTicket[0].subtasks) {
    targetTicket[0].subtasks = subtasksArray;
  }
  let newSubtask = document.getElementById("task-subtasks");
  if (subtasksArray.length < 4 && newSubtask.value != "") {
    subtasksArray.push({
      id: subtasksArray.length + 1,
      content: newSubtask.value,
      status: "open",
    });
    newSubtask.value = "";
    renderSubtaskList(ticketID);
    if (subtasksArray.length >= 4) {
      disableInputAndButton();
    }
  } else if (subtasksArray.length >= 4) {
    disableInputAndButton();
  }
  document.getElementById("iconsContainer").style.visibility = "hidden";
  document.getElementById("add-subtask-btn").style.visibility = "visible";
}
