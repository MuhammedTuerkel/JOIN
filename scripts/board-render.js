/**
 * Renders all Tickets on the board
 */
async function renderAllTickets(array) {
  renderToDoTasks(array);
  renderInProgressTasks(array);
  renderFeedbackTasks(array);
  renderDoneTasks(array);
}

/**
 * Renders the tasks which are in the 'To do' Column
 */
function renderToDoTasks(array) {
  let tasks = array.filter((t) => t["state"] == "toDo");
  let target = document.getElementById("toDoColumn");
  target.innerHTML = "";
  if (tasks.length === 0) {
    target.innerHTML = noTasks("To do");
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let category = tasks[i].category;
      let ticketTitle = tasks[i].title;
      let ticketDescription = shortenDescription(tasks[i].description);
      let longDescription = tasks[i].description;
      let prio = tasks[i].prio;
      let subtaskDone = subtasksClosed(tasks[i].id);
      let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
      let ticketID = tasks[i].id;
      let ticketDate = tasks[i].due_date;
      target.innerHTML += ticketTemplate(
        ticketID,
        category,
        ticketTitle,
        ticketDescription,
        longDescription,
        prio,
        subtaskDone,
        allSubtasks,
        ticketDate
      );
      updateProgressBar(ticketID);
      displaySubtasks(allSubtasks, ticketID);
      renderAssignedUsers(ticketID);
    }
  }
}

/**
 * Renders the tasks which are in the 'In progress'-Column
 */
function renderInProgressTasks(array) {
  let tasks = array.filter((t) => t["state"] == "inProgress");
  let target = document.getElementById("inProgressColumn");
  target.innerHTML = "";
  if (tasks.length === 0) {
    target.innerHTML = noTasks("In progress");
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let category = tasks[i].category;
      let ticketTitle = tasks[i].title;
      let ticketDescription = shortenDescription(tasks[i].description);
      let longDescription = tasks[i].description;
      let prio = tasks[i].prio;
      let subtaskDone = subtasksClosed(tasks[i].id);
      let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
      let ticketID = tasks[i].id;
      let ticketDate = tasks[i].due_date;
      target.innerHTML += ticketTemplate(
        ticketID,
        category,
        ticketTitle,
        ticketDescription,
        longDescription,
        prio,
        subtaskDone,
        allSubtasks,
        ticketDate
      );
      updateProgressBar(ticketID);
      displaySubtasks(allSubtasks, ticketID);
      renderAssignedUsers(ticketID);
    }
  }
}

/**
 * Renders the tasks which are in the 'Await Feedback' Column
 */
function renderFeedbackTasks(array) {
  let tasks = array.filter((t) => t["state"] == "awaitFeedback");
  let target = document.getElementById("awaitFeedbackColumn");
  target.innerHTML = "";
  if (tasks.length === 0) {
    target.innerHTML = noTasks("Await feedback");
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let category = tasks[i].category;
      let ticketTitle = tasks[i].title;
      let ticketDescription = shortenDescription(tasks[i].description);
      let longDescription = tasks[i].description;
      let prio = tasks[i].prio;
      let subtaskDone = subtasksClosed(tasks[i].id);
      let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
      let ticketID = tasks[i].id;
      let ticketDate = tasks[i].due_date;
      target.innerHTML += ticketTemplate(
        ticketID,
        category,
        ticketTitle,
        ticketDescription,
        longDescription,
        prio,
        subtaskDone,
        allSubtasks,
        ticketDate
      );
      updateProgressBar(ticketID);
      displaySubtasks(allSubtasks, ticketID);
      renderAssignedUsers(ticketID);
    }
  }
}

/**
 * Renders the tasks which are in the 'Done'-Column
 */
function renderDoneTasks(array) {
  let tasks = array.filter((t) => t["state"] == "done");
  let target = document.getElementById("doneColumn");
  target.innerHTML = "";
  if (tasks.length === 0) {
    target.innerHTML = noTasks("Done");
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let category = tasks[i].category;
      let ticketTitle = tasks[i].title;
      let ticketDescription = shortenDescription(tasks[i].description);
      let longDescription = tasks[i].description;
      let prio = tasks[i].prio;
      let subtaskDone = subtasksClosed(tasks[i].id);
      let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
      let ticketID = tasks[i].id;
      let ticketDate = tasks[i].due_date;
      target.innerHTML += ticketTemplate(
        ticketID,
        category,
        ticketTitle,
        ticketDescription,
        longDescription,
        prio,
        subtaskDone,
        allSubtasks,
        ticketDate
      );
      updateProgressBar(ticketID);
      displaySubtasks(allSubtasks, ticketID);
      renderAssignedUsers(ticketID);
    }
  }
}

/**
 * Places the assigned users of the ticket graphically onto the ticket-element
 * @param {string} ticketID - an unique identifier of the ticket
 */
async function renderAssignedUsers(ticketID) {
  let searchedTask = await allTasks.filter((t) => t["id"] == ticketID)[0];
  let assignedUsers = await searchedTask.assigned_to;
  for (let i = 0; i < assignedUsers.length; i++) {
    let initials = assignedUsers[i].name.charAt(0).toUpperCase() + assignedUsers[i].name.charAt(assignedUsers[i].name.length - 1).toUpperCase();
    let bgColor = assignedUsers[i].color;
    document.getElementById(`ticketAssignedUsers_${ticketID}`).innerHTML += renderUserCircle(initials, bgColor);
  }
}

/**
 * Renders the assigned Users into the Overlay-Ticket
 * @param {int} ticketID
 * @returns
 */
function renderAssignedUsersOverlay(ticketID) {
  let searchedTask = allTasks.filter((t) => t["id"] == ticketID)[0];
  let assignedUsers = searchedTask.assigned_to;
  selectedUsers = assignedUsers;
  let targetElement = document.getElementById(`overlayAssignedUserContent_${ticketID}`);
  if (!targetElement) {
    console.error(`Element with ID overlayAssignedUserContent_${ticketID} not found`);
    return;
  } else {
    for (let i = 0; i < assignedUsers.length; i++) {
      let initials = assignedUsers[i].name.charAt(0).toUpperCase() + assignedUsers[i].name.charAt(assignedUsers[i].name.length - 1).toUpperCase();
      let color = assignedUsers[i].color;
      let userName = assignedUsers[i].name;
      document.getElementById(`overlayAssignedUserContent_${ticketID}`).innerHTML += renderOverlayUserElement(userName, initials, color);
    }
  }
}

/**
 * Renders all Subtasks into the Overlay-Ticket
 * @param {int} ticketID
 */
function renderSubtasksOverlay(ticketID) {
  let searchedTask = allTasks.find((t) => t["id"] === ticketID);
  let allSubtasks = searchedTask.subtasks;
  let targetElement = document.getElementById(`overlaySubtasksContent_${ticketID}`);
  targetElement.innerHTML = "";
  if (allSubtasks === undefined) {
    targetElement.innerHTML = `<p class="subtask_error">no Subtasks added</p>`;
  } else {
    allSubtasks.forEach((subtask, index) => {
      let taskStatus = subtask.status;
      let subtaskContent = subtask.content;
      targetElement.innerHTML += renderOverlaySubtaskElement(index, subtaskContent, ticketID, taskStatus);
    });
  }
}

/**
 * Renders all Subtasks into the Edit Overlay
 * @param {int} ticketID
 */
function renderSubtasksEditOverlay(ticketID) {
  let searchedTask = allTasks.find((t) => t["id"] === ticketID);
  let allSubtasks = searchedTask.subtasks || [];
  subtasksArray = allSubtasks;
  let targetElement = document.getElementById("subtasksList");
  targetElement.innerHTML = "";
  if (allSubtasks.length >= 4) {
    disableInputAndButton();
  }
  if (allSubtasks.length === 0) {
    targetElement.innerHTML = "";
    return;
  }
  allSubtasks.forEach((subtask) => {
    let subtaskContent = subtask.content;
    let subtaskID = subtask.id;
    targetElement.innerHTML += renderSubtaskItem(subtaskID, subtaskContent);
  });
}

/**
 * If there is a search term in the input field, only the ticket will be rendered
 * if it is moved
 */
function renderFilteredTickets() {
  let searchTerm = document.getElementById("boardSearchInput").value.trim();
  if (searchTerm) {
    let searchResults = allTasks.filter((task) => {
      const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || descriptionMatch;
    });
    renderAllTickets(searchResults);
  } else {
    renderAllTickets(allTasks);
  }
}
