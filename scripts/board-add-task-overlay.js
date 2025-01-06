let actualFirebaseID;

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
 *
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
async function showOverlayTicket(
  category,
  ticketTitle,
  ticketDescription,
  ticketDate,
  prio,
  ticketID
) {
  document.getElementById("overlayID").innerHTML = renderOverlayTicket(
    category,
    ticketTitle,
    ticketDescription,
    ticketDate,
    prio,
    ticketID
  );
  renderAssignedUsersOverlay(ticketID);
  renderSubtasksOverlay(ticketID);
  actualFirebaseID = await findFirebaseIdById(ticketID);
}

/**
 *
 * @param {*} ticketID
 * @param {*} ticketTitle
 * @param {*} ticketDescription
 * @param {*} ticketDate
 * @param {*} prio
 */
function editTicket(
  ticketID,
  ticketTitle,
  ticketDescription,
  ticketDate,
  prio
) {
  let target = document.getElementById("overlayCard");
  target.innerHTML = "";
  target.innerHTML = renderOverlayEditTicket(ticketID);
  document.getElementById("task-title-overlay-edit").value = ticketTitle;
  document.getElementById("task-description-overlay-edit").value =
    ticketDescription;
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
 *
 */
// function saveEditonClick() {
//   let newTitle = document.getElementById("task-title-overlay-edit").value;
//   let newDescription = document.getElementById(
//     "task-description-overlay-edit"
//   ).value;
//   let newDueDate = document.getElementById("task-due-date-overlay-edit").value;
//   let newPrio = editedPrio;
//   let newAssignedUser = selectedUsers;
//   console.log(newTitle, newDescription, newDueDate, newPrio, newAssignedUser);

//   let task = allTasks.find((t) => t["id"] === ticketID);
//   let firebaseID = task["firebase_id"];
//   let subtask = task.subtasks[subtaskIndex];
//   subtask.status = subtask.status === "open" ? "closed" : "open";
//   try {
//     await fetch(
//       `${BASE_URL}tasks/${firebaseID}/subtasks/${subtaskIndex}.json`,
//       {
//         method: "PATCH",
//         body: JSON.stringify({ status: subtask.status }),
//         headers: { "Content-Type": "application/json" },
//       }
//     )
// }
// }

function buildTask() {
  let taskTitle = document.getElementById("task-title").value;
  let taskDate = document.getElementById("task-due-date").value;
  let taskPrio = selectedPrio;
  let taskDescription = document.getElementById("task-description").value;
  let taskCategory = document.getElementById("task-category").value;
  let taskSubtasks = subtasksArray;
  let taskState = "toDo";
  let taskAssigned = selectedUsers;
  let taskCreator = userName;
  console.log(taskCreator);

  return taskToJSON(
    taskTitle,
    taskDate,
    taskPrio,
    taskDescription,
    taskCategory,
    taskSubtasks,
    taskAssigned,
    taskState,
    taskCreator
  );
}

function pushEditSubtaskArray(id) {
  let newSubtask = document.getElementById("task-subtasks").value;
  idIndex = allTasks.findIndex((i) => i.id === id);
  idArray = allTasks[idIndex];
  console.log("ticket Id", id);
  console.log("index", idIndex);

  console.log(idArray.subtasks);

  idArray.subtasks.push({
    newSubtask,
  });
}

//FUNKTION --> Bereitstellen des subtasksArrays und updaten des UI
//Hole mir die Subtasks des Tickets
//Speichere diese bestehenden Subtasks in die subtasksArray
//Füge den neuen Subtask zum subtasksArray hinzu
//Rendere die Subtasks-Liste im Front-End neu
// ERGEBNIS --> Alle Subtasks inkl. der neuen, sind in einer Array gebündelt, die es bereits gibt. Die UI des Overlay Edit Tickets wird aktualisiert.

function pushEditSubtasksArray(ticketID) {
  let targetTicket = allTasks.filter((i) => i.id === ticketID);
  subtasksArray = targetTicket[0].subtasks;
  let newSubtask = document.getElementById("task-subtasks").value;
  subtasksArray.push({
    id: subtasksArray.length + 1,
    content: newSubtask,
    status: "open",
  });
  newSubtask = "";
  renderSubtaskList();
  document.getElementById("iconsContainer").style.visibility = "hidden";
  document.getElementById("add-subtask-btn").style.visibility = "visible";
  console.log("TEST", subtasksArray);
}
