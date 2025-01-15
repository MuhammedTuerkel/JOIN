let allTasks = [];
let ticketAssignedUsers = [];
let currentDraggedElement;
let editedPrio;
let debounceTimeout;
let selectedPrioOnBoard = "medium";
const formVisibilityCheck = setInterval(checkFormVisibility, 100);
const formVisibilityCheckOnEdit = setInterval(checkFormVisibilityOnEdit, 100);

/**
 * Initialize the board features which should be active at site load
 */
function onInit() {
  getAllTasks();
  renderAllTickets(allTasks);
  getLoggedInUserData();
  sideNavigation();
}

/**
 * Checks whether subtasks are present and hides the corresponding containers
 * @param {int} allSubtasks
 * @param {string} ticketID
 */
function displaySubtasks(allSubtasks, ticketID) {
  let progressBar = document.getElementById(`ticketSubtaskProgressBar_${ticketID}`);
  let progressCounter = document.getElementById(`ticketSubtaskCounter_${ticketID}`);
  if (allSubtasks === 0) {
    progressBar.classList.add("d_none");
    progressCounter.classList.add("d_none");
  }
}

/**
 * Returns the amount of closed subtasks for a certain ticket
 * @param {string} ticketID
 * @returns an int
 */
function subtasksClosed(ticketID) {
  let task = allTasks.find((t) => t["id"] === ticketID);
  if (!task || !task.subtasks) {
    return 0;
  }
  return task.subtasks.filter((st) => st["status"] === "closed").length;
}

/**
 * Updates the progress-bar on the UI related to the closed subtasks of a certain ticket
 * @param {string} ticketID
 */
function updateProgressBar(ticketID) {
  let closedTasks = subtasksClosed(ticketID);
  let task = allTasks.find((t) => t["id"] === ticketID);
  let totalSubtasks = task && task.subtasks ? task.subtasks.length : 0;
  const progressPercentage = totalSubtasks > 0 ? (closedTasks / totalSubtasks) * 100 : 0;
  let progressBar = document.getElementById(`progress-bar_${ticketID}`);
  if (progressBar) {
    progressBar.style.width = progressPercentage + "%";
  }
}

/**
 * Shortens a string and adds some points at the end of the sentence
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
 * @param {string} title
 * @returns The Index of the searched Task in the allTasks-Array
 */
function findTicketIndex(title) {
  let ticketIndex = allTasks.findIndex((ix) => ix["title"] === title);
  return ticketIndex;
}

/**
 * Changes the Subtask Status in the front-end and updates it in localStorage
 * @param {int} subtaskIndex
 * @param {string} ticketID
 */
function changeSubtaskStatus(subtaskIndex, ticketID) {
  let task = allTasks.find((t) => t["id"] === ticketID);
  if (task) {
    let subtask = task.subtasks[subtaskIndex];
    subtask.status = subtask.status === "open" ? "closed" : "open";
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    renderSubtasksOverlay(ticketID);
    updateProgressBar(ticketID);
    renderAllTickets(allTasks);
  } else {
    console.error("Task not found in allTasks array");
  }
}

/**
 * Saves the ticketID into a variable for further jobs
 * @param {string} ticketID - an unique identifier of the ticket which got moved
 */
function startDragging(ticketID) {
  currentDraggedElement = `${ticketID}`;
}

/**
 * Sets the dropzone into a default-mode
 * @param {*} ev
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Changes the Subtask Status in the front-end and updates it in localStorage
 * @param {int} subtaskIndex
 * @param {string} ticketID
 */
function changeSubtaskStatus(subtaskIndex, ticketID) {
  let task = allTasks.find((t) => t["id"] === ticketID);
  if (task) {
    let subtask = task.subtasks[subtaskIndex];
    subtask.status = subtask.status === "open" ? "closed" : "open";

    // Update localStorage with the new task status
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    renderSubtasksOverlay(ticketID);
    updateProgressBar(ticketID);
    renderAllTickets(allTasks);
  } else {
    console.error("Task not found in allTasks array");
  }
}

/**
 * Moves the ticket into another column and updates the state in localStorage
 * @param {string} category - describes in which column the ticket was moved
 */
function move(category) {
  let currentIndex = allTasks.findIndex((ix) => ix["id"] === currentDraggedElement);
  if (currentIndex !== -1) {
    allTasks[currentIndex]["state"] = category;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    renderFilteredTickets();
  } else {
    console.error("Task not found in allTasks array");
  }
}

/**
 * Moves the ticket into another column and updates the state in localStorage. Function as a longtap for mobile use.
 * @param {string} category - describes in which column the ticket was moved
 * @param {string} ticketID - unique identifier of the ticket
 */
function moveToOverlay(category, ticketID) {
  let currentIndex = allTasks.findIndex((ix) => ix["id"] === ticketID);
  if (currentIndex !== -1) {
    allTasks[currentIndex]["state"] = category;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    renderFilteredTickets();
  } else {
    console.error("Task not found in allTasks array");
  }
  toggleOverlay();
}

/**
 * Adds a longtap listener to every ticket on the board to use the Move to Options feature
 */
function addLongTapListeners() {
  const tickets = document.querySelectorAll(".ticket-card");
  tickets.forEach((ticket) => {
    let timer = null;
    const ticketID = ticket.getAttribute("ondragstart").match(/'(.*?)'/)[1];
    ticket.addEventListener("touchstart", () => {
      timer = setTimeout(() => {
        showMoveToOptions(ticketID);
      }, 750);
    });
    ticket.addEventListener("touchend", () => clearTimeout(timer));
    ticket.addEventListener("touchcancel", () => clearTimeout(timer));
  });
}

/**
 * Shows the overlay on the board and renders the Move To Options feature
 * @param {string} ticketID
 */
function showMoveToOptions(ticketID) {
  toggleOverlay();
  document.getElementById("overlayID").innerHTML = renderMoveToOptions(ticketID);
}

/**
 * Places a dummy ticket into the column which got a dragover
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
 * Moves the ticket into another column and updates the state in localStorage. Function as a longtap for mobile use.
 * @param {string} category - describes in which column the ticket was moved
 * @param {string} ticketID - unique identifier of the ticket
 */
function moveToOverlay(category, ticketID) {
  let currentIndex = allTasks.findIndex((ix) => ix["id"] === ticketID);
  if (currentIndex !== -1) {
    allTasks[currentIndex]["state"] = category;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    renderFilteredTickets();
  } else {
    console.error("Task not found in allTasks array");
  }
  toggleOverlay();
}

/**
 * Handles the input event for the search field with a debounce mechanism.
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
    const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
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
    document.getElementById("addTaskCategoryErrorInput").style.display = "block";
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

/**
 * Checks if the form is visible and DOM-loaded, so the initializeKeyDown-function can be started
 */
function checkFormVisibility() {
  const form = document.getElementById("addTaskForm");
  if (form && form.offsetHeight > 0 && form.offsetWidth > 0) {
    initializeKeyDown();
    setMediumOnBoard();
    clearInterval(formVisibilityCheck);
  }
}

/**
 * Checks if the form is visible and DOM-loaded on edit feature, so the initializeKeyDown-function can be started
 */
function checkFormVisibilityOnEdit() {
  const form = document.getElementById("overlayEditForm");
  if (form && form.offsetHeight > 0 && form.offsetWidth > 0) {
    initializeKeyDownOnEdit();
    setMediumOnBoard();
    clearInterval(formVisibilityCheckOnEdit);
  }
}
