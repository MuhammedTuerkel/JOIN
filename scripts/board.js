let allTasks = [];
let ticketAssignedUsers = [];
let currentDraggedElement;
let editedPrio;
let debounceTimeout;
let selectedPrioOnBoard;

/**
 * Initialize the board features which should be active at site load
 */
async function onInit() {
  await getAllTasks();
  await renderAllTickets(allTasks);
  onloadFunction();
  getLoggedInUserData();
}

/**
 * Gets all tasks which are saved in the firebase realtime database with its Firebase-ID
 */
async function getAllTasks() {
  let response = await fetch(BASE_URL + "tasks" + ".json");
  let responseAsJSON = await response.json();

  allTasks = Object.entries(responseAsJSON).map(([id, task]) => {
    return { firebase_id: id, ...task };
  });
}

/**
 * Checks whether subtasks are present and hides the corresponding containers
 *
 * @param {int} allSubtasks
 * @param {string} ticketID
 */
function displaySubtasks(allSubtasks, ticketID) {
  let progressBar = document.getElementById(
    `ticketSubtaskProgressBar_${ticketID}`
  );
  let progressCounter = document.getElementById(
    `ticketSubtaskCounter_${ticketID}`
  );
  if (allSubtasks === 0) {
    progressBar.classList.add("d_none");
    progressCounter.classList.add("d_none");
  }
}

function subtasksClosed(ticketID) {
  let task = allTasks.find((t) => t["id"] === ticketID);
  if (!task || !task.subtasks) {
    return 0;
  }
  return task.subtasks.filter((st) => st["status"] === "closed").length;
}

function updateProgressBar(ticketID) {
  let closedTasks = subtasksClosed(ticketID);
  let task = allTasks.find((t) => t["id"] === ticketID);
  let totalSubtasks = task && task.subtasks ? task.subtasks.length : 0;
  const progressPercentage =
    totalSubtasks > 0 ? (closedTasks / totalSubtasks) * 100 : 0;
  let progressBar = document.getElementById(`progress-bar_${ticketID}`);
  if (progressBar) {
    progressBar.style.width = progressPercentage + "%";
  }
}

function updateSubtaskCounter(ticketID) {
  let closedTasks = subtasksClosed(ticketID);
  let task = allTasks.find((t) => t["id"] === ticketID);
  let totalSubtasks = task.subtasks ? task.subtasks.length : 0;
  let counterElement = document.getElementById(`subtask-counter_${ticketID}`);
  if (counterElement) {
    counterElement.textContent = `${closedTasks}/${totalSubtasks}`;
  }
}

/**
 * Shortens a string and adds some points at the end of the sentence
 *
 * @param {string} string - The string which should be shortened
 * @param {int} maxLength - Maximum Length of the text
 * @returns
 */
function shortenDescription(string, maxLength = 44) {
  if (string.length > maxLength) {
    return string.slice(0, maxLength - 3) + "...";
  }
  return string;
}

/**
 * Returns the index of the searched Task based on its title in the allTasks-Array
 *
 * @param {string} title
 * @returns The Index of the searched Task in the allTasks-Array
 */
function findTicketIndex(title) {
  let ticketIndex = allTasks.findIndex((ix) => ix["title"] === title);
  return ticketIndex;
}

/**
 * Changes the Subtask Status in the front-end and on the Firebase DB
 *
 * @param {int} subtaskIndex
 * @param {string} ticketID
 */
async function changeSubtaskStatus(subtaskIndex, ticketID) {
  let task = allTasks.find((t) => t["id"] === ticketID);
  let firebaseID = task["firebase_id"];
  let subtask = task.subtasks[subtaskIndex];
  subtask.status = subtask.status === "open" ? "closed" : "open";
  try {
    await fetch(
      `${BASE_URL}tasks/${firebaseID}/subtasks/${subtaskIndex}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ status: subtask.status }),
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to update subtask in Firebase:", error);
  }
  renderSubtasksOverlay(ticketID);
  updateProgressBar(ticketID);
  updateSubtaskCounter(ticketID);
}

/**
 * Saves the ticketID into a variable for further jobs
 *
 * @param {string} ticketID - an unique identifier of the ticket which got moved
 */
function startDragging(ticketID) {
  currentDraggedElement = `${ticketID}`;
}

/**
 * Sets the dropzone into a default-mode
 *
 * @param {*} ev
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Moves the ticket into another column and update the state in the firebase database
 *
 * @param {string} category - describes in which column the ticket was moved
 */
async function move(category) {
  let currentIndex = allTasks.findIndex(
    (ix) => ix["id"] === currentDraggedElement
  );
  if (currentIndex !== -1) {
    allTasks[currentIndex]["state"] = category;
    let firebaseID = allTasks[currentIndex]["firebase_id"];
    await fetch(`${BASE_URL}tasks/${firebaseID}.json`, {
      method: "PATCH",
      body: JSON.stringify({ state: category }),
      headers: { "Content-Type": "application/json" },
    });
    renderFilteredTickets();
  } else {
    console.error("Task not found in allTasks array");
  }
}

/**
 * Places a dummy ticket into the column which got a dragover
 *
 * @param {string} id - The id of the column which got a dragover
 */
function highlight(id) {
  let column = document.getElementById(id);
  if (!column.querySelector(".dummy-ticket-card")) {
    column.innerHTML += renderDummyTicket();
  }
}

/**
 * Removes the dummy ticket from the column which got a dragleave
 *
 * @param {string} id - The id of the column which got a dragleave
 */
function removeHighlight(id) {
  let column = document.getElementById(id);
  let dummyCard = column.querySelector(".dummy-ticket-card");
  if (dummyCard) {
    column.removeChild(dummyCard);
  }
}

/**
 * Deletes the task from the board, the array and from the Firebase-DB
 *
 * @param {string} ticketID
 * @returns
 */
async function deleteTicket(ticketID) {
  let taskIndex = allTasks.findIndex((task) => task["id"] === ticketID);
  let firebaseID = allTasks[taskIndex]["firebase_id"];
  try {
    await fetch(`${BASE_URL}tasks/${firebaseID}.json`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to delete ticket from Firebase:", error);
    return;
  }
  allTasks.splice(taskIndex, 1);
  renderAllTickets(allTasks);
  toggleOverlay();
}

/**
 *
 */
function handleSearchInput() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    let searchTerm = document.getElementById("boardSearchInput").value.trim();
    if (searchTerm === "") {
      reloadBoard();
      return;
    }
    startSearch();
  }, 1000);
}

/**
 * Starts the search on the board based on the searched term
 * @returns Return ends the function if the search input is empty
 */
function startSearch() {
  let searchTerm = document.getElementById("boardSearchInput").value.trim();
  if (searchTerm === "") {
    reloadBoard();
    return;
  }
  clearBoard();
  let searchResults = [];
  allTasks.forEach((task) => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = task.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (titleMatch || descriptionMatch) {
      searchResults.push(task);
    }
  });
  if (searchResults.length === 0) {
    showFailedSearchMessage(searchTerm);
    reloadBoard();
  } else {
    renderAllTickets(searchResults);
  }
}

/**
 * Clears the Board
 */
function clearBoard() {
  document.getElementById("toDoColumn").innerHTML = "";
  document.getElementById("inProgressColumn").innerHTML = "";
  document.getElementById("awaitFeedbackColumn").innerHTML = "";
  document.getElementById("doneColumn").innerHTML = "";
}

/**
 * Reloads the Board with all tickets
 */
function reloadBoard() {
  renderAllTickets(allTasks);
  document.getElementById("boardSearchInput").value = "";
}

/**
 * Shows the Failed Search Message in an overlay, if the search could not be found on the board
 * @param {string} searchTerm
 */
function showFailedSearchMessage(searchTerm) {
  let target = document.getElementById("overlayID");
  target.classList.remove("d_none");
  target.innerHTML = renderFailedSearchBox(searchTerm);
}

/**
 * open the add task overlay
 * @param {*} state
 */
function showAddTaskOnBoard(state) {
  let target = document.getElementById("overlayID");
  target.classList.remove("d_none");
  target.innerHTML = renderAddTaskFeatureOnBoard(state);
  addEventListeners();
}

/**
 * Adds event listeners to display and hide error messages for form fields.
 */
function addEventListeners() {
  let taskCategory = document.getElementById("task-category");
  let taskDueDate = document.getElementById("task-due-date");
  let taskTitle = document.getElementById("task-title");
  taskCategory.addEventListener("focus", function () {
    document.getElementById("addTaskCategoryErrorInput").style.display =
      "block";
  });
  taskCategory.addEventListener("blur", function () {
    document.getElementById("addTaskCategoryErrorInput").style.display = "none";
  });
  taskDueDate.addEventListener("focus", function () {
    document.getElementById("addTaskDateErrorInput").style.display = "block";
  });
  taskDueDate.addEventListener("blur", function () {
    document.getElementById("addTaskDateErrorInput").style.display = "none";
  });
  taskTitle.addEventListener("focus", function () {
    document.getElementById("addTaskTitleErrorInput").style.display = "block";
  });
  taskTitle.addEventListener("blur", function () {
    document.getElementById("addTaskTitleErrorInput").style.display = "none";
  });
}
