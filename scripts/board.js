let FIREBASE_URL = 'https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/';

let allTasks = [];
let currentDraggedElement;

/**
 * Initialize the board features which should be active at site load
 */

async function onInit() {
    await getAllTasks();
    await renderAllTickets();
}

/**
 * Get all tasks which are saved in the firebase realtime database
 */
async function getAllTasks() {
    let response = await fetch(FIREBASE_URL + 'tasks' + '.json');
    let responseAsJSON = await response.json();
    
    allTasks = Object.entries(responseAsJSON).map(([id, task]) => {
        return { firebase_id: id, ...task };
    });
}

/**
 * Renders all Tickets on the board
 */
async function renderAllTickets() {
    renderToDoTasks();
    renderInProgressTasks();
    renderFeedbackTasks();
    renderDoneTasks();
}

/**
 * Renders the tasks which are in the 'To do' Column
 * 
 */
function renderToDoTasks() {
    let tasks = allTasks.filter(t => t['state'] == 'toDo');
    let target = document.getElementById('toDoColumn');
    target.innerHTML = '';
    if(tasks.length === 0) {
        target.innerHTML = noTasks('To do');
    } else {
        for(let i = 0; i < tasks.length; i++) {
            let category = tasks[i].category;
            let ticketTitle = tasks[i].title;
            let ticketDescription = shortenDescription(tasks[i].description);
            let prio = tasks[i].prio;
            let subtaskDone = subtasksClosed(tasks[i].id);
            let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
            let ticketID = tasks[i].id;
            let ticketDate = tasks[i].due_date;
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks, ticketDate);
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
function renderInProgressTasks() {
    let tasks = allTasks.filter(t => t['state'] == 'inProgress');
    let target = document.getElementById('inProgressColumn');
    target.innerHTML = '';
    if(tasks.length === 0) {
        target.innerHTML = noTasks('In progress');
    } else {
        for(let i = 0; i < tasks.length; i++) {
            let category = tasks[i].category;
            let ticketTitle = tasks[i].title;
            let ticketDescription = shortenDescription(tasks[i].description);
            let prio = tasks[i].prio;
            let subtaskDone = subtasksClosed(tasks[i].id);
            let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
            let ticketID = tasks[i].id;
            let ticketDate = tasks[i].due_date;
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks, ticketDate);
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
function renderFeedbackTasks() {
    let tasks = allTasks.filter(t => t['state'] == 'awaitFeedback');
    let target = document.getElementById('awaitFeedbackColumn');
    target.innerHTML = '';
    if(tasks.length === 0) {
        target.innerHTML = noTasks('Await feedback');
    } else {
        for(let i = 0; i < tasks.length; i++) {
            let category = tasks[i].category;
            let ticketTitle = tasks[i].title;
            let ticketDescription = shortenDescription(tasks[i].description);
            let prio = tasks[i].prio;
            let subtaskDone = subtasksClosed(tasks[i].id);
            let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
            let ticketID = tasks[i].id;
            let ticketDate = tasks[i].due_date;
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks, ticketDate);
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
function renderDoneTasks() {
    let tasks = allTasks.filter(t => t['state'] == 'done');
    let target = document.getElementById('doneColumn');
    target.innerHTML = '';
    if(tasks.length === 0) {
        target.innerHTML = noTasks('Done');
    } else {
        for(let i = 0; i < tasks.length; i++) {
            let category = tasks[i].category;
            let ticketTitle = tasks[i].title;
            let ticketDescription = shortenDescription(tasks[i].description);
            let prio = tasks[i].prio;
            let subtaskDone = subtasksClosed(tasks[i].id);
            let allSubtasks = tasks[i].subtasks ? tasks[i].subtasks.length : 0;
            let ticketID = tasks[i].id;
            let ticketDate = tasks[i].due_date;
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks, ticketDate);
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

/**
 * Returns the amount of subtasks which are already done, based on the ticket title
 * 
 * @param {string} title 
 * @returns The amount of subtasks, which are already done
 */
function subtasksClosed(ticketID) {
    let searchedTask = allTasks.filter(t => t['id'] == ticketID);
    let searchedSubTasks = searchedTask.filter(st => st['status'] == 'closed');
    return searchedSubTasks.length;
}

/**
 * Updates the width of the progress-bar, based on the done subtasks of the ticket
 * 
 * @param {string} title - Title of the ticket
 * @param {int} ticketID - Identifier of the ticket based on the index of the ticket in the allTasks-Array
 */
function updateProgressBar(ticketID) {
    let closedTasks = subtasksClosed(ticketID);
    let searchedTask = allTasks.filter(t => t['id'] == ticketID);
    let allSubtasks = searchedTask.filter(st => st['subtasks']).length;
    const progressPercentage = allSubtasks > 0 ? (closedTasks / allSubtasks) * 100 : 0;
    let progressBar = document.getElementById(`progress-bar_${ticketID}`);
    progressBar.style.width = progressPercentage + '%';
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
function renderAssignedUsers(ticketID) {
    let searchedTask = allTasks.filter(t => t['id'] == ticketID)[0];
    let assignedUsers = searchedTask.assigned_to;
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
        await fetch(`${FIREBASE_URL}tasks/${firebaseID}/subtasks/${subtaskIndex}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ status: subtask.status }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(`Subtask status updated in Firebase: ${subtask.status}`);
    } catch (error) {
        console.error('Failed to update subtask in Firebase:', error);
    }
    renderSubtasksOverlay(ticketID);
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
        await fetch(`${FIREBASE_URL}tasks/${firebaseID}.json`, {
            method: 'PATCH',
            body: JSON.stringify({state: category}),
            headers: {'Content-Type': 'application/json'}
        });
        renderAllTickets();
    } else {
        console.error('Task not found in allTasks array')
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