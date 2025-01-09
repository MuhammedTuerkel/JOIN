let actualFirebaseID;

/**
 * Finds the unique Firebase ID of the chosen ticket and returns it
 * @param {string} targetID
 * @returns the firebase ID of the ticket
 */
async function findFirebaseIdById(targetID) {
  try {
    const response = await fetch(BASE_URL + "tasks.json");
    if (!response.ok) {
      throw new Error("Error by fetching data from database");
    }
    const tasks = await response.json();
    if (tasks) {
      for (const [firebaseId, task] of Object.entries(tasks)) {
        if (task.id === targetID) {
          return firebaseId;
        }
      }
    }
  } catch (error) {
    console.error("Error by fetching data:", error);
    return null;
  }
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
    location.reload();
  }
}

/**
 * Shows the ticket in the overlay when clicked on it
 * @param {string} category - The category of the ticket
 * @param {string} ticketTitle  - The Ticket title
 * @param {string} ticketDescription - The Ticket description
 * @param {string} ticketDate - The due date of the ticket
 * @param {string} prio - The Priority of the ticket
 * @param {string} ticketID - The exact ID which is based on the Firebase-ID
 */
async function showOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID) {
  document.getElementById("overlayID").innerHTML = renderOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID);
  renderAssignedUsersOverlay(ticketID);
  renderSubtasksOverlay(ticketID);
  actualFirebaseID = await findFirebaseIdById(ticketID);
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
  toggleOverlay();
  location.reload();
}

/**
 * Patches the task in the Firebase Realtime Database
 * @param {string} firebaseID
 * @param {object} data
 * @returns
 */
async function patchTask(firebaseID, data) {
  let url = BASE_URL + "tasks/" + firebaseID + ".json";
  let response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJSON = await response.json());
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
    renderSubtaskList();
    if (subtasksArray.length >= 4) {
      disableInputAndButton();
    }
  } else if (subtasksArray.length >= 4) {
    disableInputAndButton();
  }
  document.getElementById("iconsContainer").style.visibility = "hidden";
  document.getElementById("add-subtask-btn").style.visibility = "visible";
}
