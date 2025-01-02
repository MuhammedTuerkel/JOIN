let allTasks = [];
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
    // subtaskInput();
}

/**
 * Gets all tasks which are saved in the firebase realtime database with its Firebase-ID
 */
async function getAllTasks() {
    let response = await fetch(BASE_URL + 'tasks' + '.json');
    let responseAsJSON = await response.json();
    
    allTasks = Object.entries(responseAsJSON).map(([id, task]) => {
        return { firebase_id: id, ...task };
    });
}

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
 * 
 */
function renderToDoTasks(array) {
    let tasks = array.filter(t => t['state'] == 'toDo');
    let target = document.getElementById('toDoColumn');
    target.innerHTML = '';
    if(tasks.length === 0) {
        target.innerHTML = noTasks('To do');
    } else {
        for(let i = 0; i < tasks.length; i++) {
            let category = tasks[i].category;
            let ticketTitle = tasks[i].title;
            let ticketDescription = shortenDescription(tasks[i].description);
            let longDescription = tasks[i].description;
            let prio = tasks[i].prio;
            let subtaskDone = subtasksClosed(tasks[i].id);
            let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
            let ticketID = tasks[i].id;
            let ticketDate = tasks[i].due_date;
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, longDescription, prio, subtaskDone, allSubtasks, ticketDate);
            updateProgressBar(ticketID);
            displaySubtasks(allSubtasks, ticketID);
            renderAssignedUsers(ticketID);
        }
    }
}

/**
 * Renders the tasks which are in the 'In progress'-Column
 * 
 */
function renderInProgressTasks(array) {
    let tasks = array.filter(t => t['state'] == 'inProgress');
    let target = document.getElementById('inProgressColumn');
    target.innerHTML = '';
    if(tasks.length === 0) {
        target.innerHTML = noTasks('In progress');
    } else {
        for(let i = 0; i < tasks.length; i++) {
            let category = tasks[i].category;
            let ticketTitle = tasks[i].title;
            let ticketDescription = shortenDescription(tasks[i].description);
            let longDescription = tasks[i].description;
            let prio = tasks[i].prio;
            let subtaskDone = subtasksClosed(tasks[i].id);
            let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
            let ticketID = tasks[i].id;
            let ticketDate = tasks[i].due_date;
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, longDescription, prio, subtaskDone, allSubtasks, ticketDate);
            updateProgressBar(ticketID);
            displaySubtasks(allSubtasks, ticketID);
            renderAssignedUsers(ticketID);
        }
    }
}

/**
 * Renders the tasks which are in the 'Await Feedback' Column
 * 
 */
function renderFeedbackTasks(array) {
    let tasks = array.filter(t => t['state'] == 'awaitFeedback');
    let target = document.getElementById('awaitFeedbackColumn');
    target.innerHTML = '';
    if(tasks.length === 0) {
        target.innerHTML = noTasks('Await feedback');
    } else {
        for(let i = 0; i < tasks.length; i++) {
            let category = tasks[i].category;
            let ticketTitle = tasks[i].title;
            let ticketDescription = shortenDescription(tasks[i].description);
            let longDescription = tasks[i].description;
            let prio = tasks[i].prio;
            let subtaskDone = subtasksClosed(tasks[i].id);
            let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
            let ticketID = tasks[i].id;
            let ticketDate = tasks[i].due_date;
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, longDescription, prio, subtaskDone, allSubtasks, ticketDate);
            updateProgressBar(ticketID);
            displaySubtasks(allSubtasks, ticketID);
            renderAssignedUsers(ticketID);
        }
    }
}

/**
 * Renders the tasks which are in the 'Done'-Column
 * 
 */
function renderDoneTasks(array) {
    let tasks = array.filter(t => t['state'] == 'done');
    let target = document.getElementById('doneColumn');
    target.innerHTML = '';
    if(tasks.length === 0) {
        target.innerHTML = noTasks('Done');
    } else {
        for(let i = 0; i < tasks.length; i++) {
            let category = tasks[i].category;
            let ticketTitle = tasks[i].title;
            let ticketDescription = shortenDescription(tasks[i].description);
            let longDescription = tasks[i].description;
            let prio = tasks[i].prio;
            let subtaskDone = subtasksClosed(tasks[i].id);
            let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
            let ticketID = tasks[i].id;
            let ticketDate = tasks[i].due_date;
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, longDescription, prio, subtaskDone, allSubtasks, ticketDate);
            updateProgressBar(ticketID);
            displaySubtasks(allSubtasks, ticketID);
            renderAssignedUsers(ticketID);
        }
    }
}

/**
 * Checks whether subtasks are present and hides the corresponding containers
 * 
 * @param {int} allSubtasks 
 * @param {string} ticketID 
 */
function displaySubtasks(allSubtasks, ticketID) {
    let progressBar = document.getElementById(`ticketSubtaskProgressBar_${ticketID}`);
    let progressCounter = document.getElementById(`ticketSubtaskCounter_${ticketID}`);
    if(allSubtasks === 0) {
        progressBar.classList.add('d_none');
        progressCounter.classList.add('d_none');
    }
}

function subtasksClosed(ticketID) {
    let task = allTasks.find(t => t['id'] === ticketID);
    if (!task || !task.subtasks) {
        return 0;
    }
    return task.subtasks.filter(st => st['status'] === 'closed').length;
}

function updateProgressBar(ticketID) {
    let closedTasks = subtasksClosed(ticketID);
    let task = allTasks.find(t => t['id'] === ticketID);
    let totalSubtasks = task && task.subtasks ? task.subtasks.length : 0;
    const progressPercentage = totalSubtasks > 0 ? (closedTasks / totalSubtasks) * 100 : 0;
    let progressBar = document.getElementById(`progress-bar_${ticketID}`);
    if (progressBar) {
        progressBar.style.width = progressPercentage + '%';
    }
}

function updateSubtaskCounter(ticketID) {
    let closedTasks = subtasksClosed(ticketID);
    let task = allTasks.find(t => t['id'] === ticketID);
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
    if(string.length > maxLength) {
        return string.slice(0, maxLength - 3) + '...';
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
    let ticketIndex = allTasks.findIndex(ix => ix['title'] === title);
    return ticketIndex;
}

/**
 * Places the assigned users of the ticket graphically onto the ticket-element
 * 
 * @param {string} ticketID - an unique identifier of the ticket
 */
async function renderAssignedUsers(ticketID) {
    let searchedTask = await allTasks.filter(t => t['id'] == ticketID)[0];
    let assignedUsers = await searchedTask.assigned_to;
    for(let i = 0; i < assignedUsers.length; i++) {
        let initials = assignedUsers[i].name.charAt(0).toUpperCase() + assignedUsers[i].name.charAt(assignedUsers[i].name.length - 1).toUpperCase();
        let bgColor = assignedUsers[i].color;
        document.getElementById(`ticketAssignedUsers_${ticketID}`).innerHTML += renderUserCircle(initials, bgColor);
    }
}

/**
 * Renders the assigned Users into the Overlay-Ticket
 * 
 * @param {int} ticketID 
 * @returns 
 */
function renderAssignedUsersOverlay(ticketID) {
    let searchedTask = allTasks.filter(t => t['id'] == ticketID)[0];
    let assignedUsers = searchedTask.assigned_to;
    let targetElement = document.getElementById(`overlayAssignedUserContent_${ticketID}`);
    if(!targetElement) {
        console.error(`Element with ID overlayAssignedUserContent_${ticketID} not found`);
        return;
    } else {
        for(let i = 0; i < assignedUsers.length; i++) {
            let initials = assignedUsers[i].name.charAt(0).toUpperCase() + assignedUsers[i].name.charAt(assignedUsers[i].name.length - 1).toUpperCase();
            let color = assignedUsers[i].color;
            let userName = assignedUsers[i].name;
            document.getElementById(`overlayAssignedUserContent_${ticketID}`).innerHTML += renderOverlayUserElement(userName, initials, color);
        }
    }
}

/**
 * Renders all Subtasks into the Overlay-Ticket
 * 
 * @param {int} ticketID 
 */
function renderSubtasksOverlay(ticketID) {
    let searchedTask = allTasks.find(t => t['id'] === ticketID);
    let allSubtasks = searchedTask.subtasks;
    let targetElement = document.getElementById(`overlaySubtasksContent_${ticketID}`);
    targetElement.innerHTML = '';
    allSubtasks.forEach((subtask, index) => {
        let taskStatus = subtask.status;
        let subtaskContent = subtask.content;
        targetElement.innerHTML += renderOverlaySubtaskElement(index, subtaskContent, ticketID, taskStatus);
    });
}

/**
 * Changes the Subtask Status in the front-end and on the Firebase DB
 * 
 * @param {int} subtaskIndex 
 * @param {string} ticketID 
 */
async function changeSubtaskStatus(subtaskIndex, ticketID) {
    let task = allTasks.find(t => t['id'] === ticketID);
    let firebaseID = task['firebase_id'];
    let subtask = task.subtasks[subtaskIndex];
    subtask.status = subtask.status === 'open' ? 'closed' : 'open';
    try {
        await fetch(`${BASE_URL}tasks/${firebaseID}/subtasks/${subtaskIndex}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ status: subtask.status }),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Failed to update subtask in Firebase:', error);
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
    let currentIndex = allTasks.findIndex(ix => ix['id'] === currentDraggedElement);
    if(currentIndex !== -1) {
        allTasks[currentIndex]['state'] = category;
        let firebaseID = allTasks[currentIndex]['firebase_id'];
        await fetch(`${BASE_URL}tasks/${firebaseID}.json`, {
            method: 'PATCH',
            body: JSON.stringify({state: category}),
            headers: {'Content-Type': 'application/json'}
        });
        renderFilteredTickets();
    } else {
        console.error('Task not found in allTasks array')
    }
}

/**
 * If there is a search term in the input field, only the ticket will be rendered
 * if it is moved
 */
function renderFilteredTickets() {
    let searchTerm = document.getElementById('boardSearchInput').value.trim();
    if (searchTerm) {
        let searchResults = allTasks.filter(task => {
            const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
            const descriptionMatch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
            return titleMatch || descriptionMatch;
        });
        renderAllTickets(searchResults);
    } else {
        renderAllTickets(allTasks);
    }
}

/**
 * Places a dummy ticket into the column which got a dragover
 * 
 * @param {string} id - The id of the column which got a dragover 
 */
function highlight(id) {
    let column = document.getElementById(id);
    if(!column.querySelector('.dummy-ticket-card')) {
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
    let dummyCard = column.querySelector('.dummy-ticket-card');
    if(dummyCard) {
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
    let taskIndex = allTasks.findIndex(task => task['id'] === ticketID);
    let firebaseID = allTasks[taskIndex]['firebase_id'];
    try {
        await fetch(`${BASE_URL}tasks/${firebaseID}.json`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Failed to delete ticket from Firebase:', error);
        return;
    }
    allTasks.splice(taskIndex, 1);
    renderAllTickets(allTasks);
    toggleOverlay();
}

/**
 * Closes the overlay, after clicking outside of the Overlay-Ticket
 * 
 * @param {*} event 
 */
function closeOverlayOnClick(event) {
    if (event.target === document.getElementById('overlayID')) {
        toggleOverlay();
    }
}

/**
 * Toggles the Overlay view
 */
function toggleOverlay() {
    let overlay = document.getElementById('overlayID');
    if (overlay.classList.contains('d_none')) {
        overlay.classList.remove('d_none');
        overlay.classList.add('d_flex');
        document.body.style.overflow = "hidden";
    } else {
        overlay.classList.remove('d_flex');
        overlay.classList.add('d_none');
        document.body.style.overflow = "auto";
    }
}

/**
 * Shows the ticket in the overlay when clicked on it
 * 
 * @param {string} category - The category of the ticket
 * @param {string} ticketTitle  - The Ticket title
 * @param {string} ticketDescription - The Ticket description
 * @param {string} ticketDate - The due date of the ticket
 * @param {string} prio - The Priority of the ticket
 * @param {string} ticketID - The exact ID which is based on the Firebase-ID
 */
function showOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID) {
    document.getElementById('overlayID').innerHTML = renderOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID);
    renderAssignedUsersOverlay(ticketID);
    renderSubtasksOverlay(ticketID);
}

function editTicket(ticketID, ticketTitle, ticketDescription, ticketDate, prio) {
    let target = document.getElementById('overlayCard');
    target.innerHTML = '';
    target.innerHTML = renderOverlayEditTicket();
    document.getElementById('task-title-overlay-edit').value = ticketTitle;
    document.getElementById('task-description-overlay-edit').value = ticketDescription;
    document.getElementById('task-due-date-overlay-edit').value = ticketDate;
    setPriorityOnEdit(prio);
}

/**
 * Sets the Priority on the Edit-Overlay based on the prio the task has
 * 
 * @param {string} prio 
 */
function setPriorityOnEdit(prio) {
    if(prio === 'urgent') {
        setUrgent();
    } else if(prio === 'medium') {
        setMedium();
    } else if(prio = 'low') {
        setLow();
    }
}

/**
 * Sets the Design of the Urgent-Button and temporarily saves the prio into the selectedPrio variable
 */
function setUrgent() {
    activateButton('urgent-btn', 'urgent-svg', 'urgent', 'urgent-icon');
    editedPrio = 'urgent';
}

/**
 * Sets the Design of the Medium-Button and temporarily saves the prio into the selectedPrio variable
 */
function setMedium() {
    activateButton('medium-btn', 'medium-svg', 'medium', 'medium-icon');
    editedPrio = 'medium';
}

/**
 * Sets the Design of the Low-Button and temporarily saves the prio into the selectedPrio variable
 */
function setLow() {
    activateButton('low-btn', 'low-svg', 'low', 'low-icon');
    editedPrio = 'low';
}

/**
 * Based on the clicked Prio-Button, the style of the button is changing. Makes sure, that only one Prio-Button could be active.
 * 
 * @param {string} buttonId 
 * @param {string} svgId 
 * @param {string} buttonClass 
 * @param {string} svgClass 
 */
function activateButton(buttonId, svgId, buttonClass, svgClass) {
    const buttons = document.querySelectorAll('.prio-btn');
    buttons.forEach((button) => {
        button.classList.remove('urgent', 'medium', 'low', 'active');
    });

    const svgs = document.querySelectorAll('svg');
    svgs.forEach((svg) => {
        svg.classList.remove('urgent-icon', 'medium-icon', 'low-icon');
    });

    document.getElementById(buttonId).classList.add(buttonClass, 'active');
    document.getElementById(svgId).classList.add(svgClass);
}

function saveEditonClick() {
    let newTitle = document.getElementById('task-title-overlay-edit').value;
    let newDescription = document.getElementById('task-description-overlay-edit').value;
    let newDueDate = document.getElementById('task-due-date-overlay-edit').value;
    let newPrio = editedPrio;
    let newAssignedUser = '';
    let newSubtasks = '';
    console.log(newTitle, newDescription, newDueDate, newPrio);
    //Nimm den Inhalt von Title und speichere ihn in das Overlay-Ticket und das Board-Ticket
    //Nimm den Inhalt von Description und speichere ihn in das Overlay-Ticket und das Board-Ticket
    //Nimm den Inhalt von Due date und speichere ihn in das Overlay-Ticket und das Board-Ticket
    //Nimm die gewählte Priority und speichere sie in das Overlay-Ticket und das Board-Ticket
    //Nimm die geänderten AssignedUser und speichere sie in das Overlay-Ticket und das Board-Ticket
    //Nimm die geänderten Subtasks und speichere sie in das Overlay-Ticket und das Board-Ticket
    //Leere das Overlay und stelle wieder das Overlay-Ticket dar
    //Aktualisiere die Firebase
}

function handleSearchInput() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        let searchTerm = document.getElementById('boardSearchInput').value.trim();
        if (searchTerm === '') {
            reloadBoard();
            return;
        }
        startSearch();
    }, 1000);
}

/**
 * Starts the search on the board based on the searched term
 * 
 * @returns Return ends the function if the search input is empty
 */
function startSearch() {
    let searchTerm = document.getElementById('boardSearchInput').value.trim();
    if(searchTerm === '') {
        reloadBoard();
        return;
    }
    clearBoard();
    let searchResults = [];
    allTasks.forEach(task => {
        const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
        if (titleMatch || descriptionMatch) {
          searchResults.push(task);
        }
    });
    if(searchResults.length === 0) {
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
    document.getElementById('toDoColumn').innerHTML = '';
    document.getElementById('inProgressColumn').innerHTML = '';
    document.getElementById('awaitFeedbackColumn').innerHTML = '';
    document.getElementById('doneColumn').innerHTML = '';
}

/**
 * Reloads the Board with all tickets
 */
function reloadBoard() {
    renderAllTickets(allTasks);
    document.getElementById('boardSearchInput').value = '';
}

/**
 * Shows the Failed Search Message in an overlay, if the search could not be found on the board
 * 
 * @param {string} searchTerm 
 */
function showFailedSearchMessage(searchTerm) {
    let target = document.getElementById('overlayID');
    target.classList.remove('d_none');
    target.innerHTML = renderFailedSearchBox(searchTerm);
}

function showAddTaskOnBoard(state) {
    let target = document.getElementById('overlayID');
    target.classList.remove('d_none');
    target.innerHTML = renderAddTaskFeatureOnBoard(state);
    addEventListeners();
}

/**
 * Adds event listeners to display and hide error messages for form fields.
 */
function addEventListeners() {
    let taskCategory = document.getElementById('task-category');
    let taskDueDate = document.getElementById('task-due-date');
    let taskTitle = document.getElementById('task-title');

    taskCategory.addEventListener('focus', function() {
        document.getElementById('addTaskCategoryErrorInput').style.display = 'block';
    });

    taskCategory.addEventListener('blur', function() {
        document.getElementById('addTaskCategoryErrorInput').style.display = 'none';
    });

    taskDueDate.addEventListener('focus', function() {
        document.getElementById('addTaskDateErrorInput').style.display = 'block';
    });

    taskDueDate.addEventListener('blur', function() {
        document.getElementById('addTaskDateErrorInput').style.display = 'none';
    });

    taskTitle.addEventListener('focus', function() {
        document.getElementById('addTaskTitleErrorInput').style.display = 'block';
    });

    taskTitle.addEventListener('blur', function() {
        document.getElementById('addTaskTitleErrorInput').style.display = 'none';
    });
}


