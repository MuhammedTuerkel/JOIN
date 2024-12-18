let FIREBASE_URL = 'https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/';

let allTasks = [];

/**
 * Initialize the board features which should be active at site load
 */
async function onInit() {
    await getAllTasks();
    await renderAllTickets();
}

/**
 * Get all Tasks which are saved in the Firebase
 */
async function getAllTasks() {
    let response = await fetch(FIREBASE_URL + 'tasks' + '.json');
    let responseAsJSON = await response.json();
    allTasks = Object.values(responseAsJSON);
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
            let subtaskDone = subtasksClosed(tasks[i].title);
            let allSubtasks = tasks[i].subtasks.length;
            let ticketID = findTicketIndex(tasks[i].title);
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks);
            updateProgressBar(ticketTitle, ticketID);
            renderAssignedUsers(ticketTitle, ticketID);
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
            let subtaskDone = subtasksClosed(tasks[i].title);
            let allSubtasks = tasks[i].subtasks.length;
            let ticketID = findTicketIndex(tasks[i].title);
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks);
            updateProgressBar(ticketTitle, ticketID);
            renderAssignedUsers(ticketTitle, ticketID);
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
            let subtaskDone = subtasksClosed(tasks[i].title);
            let allSubtasks = tasks[i].subtasks.length;
            let ticketID = findTicketIndex(tasks[i].title);
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks);
            updateProgressBar(ticketTitle, ticketID);
            renderAssignedUsers(ticketTitle, ticketID);
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
            let subtaskDone = subtasksClosed(tasks[i].title);
            let allSubtasks = tasks[i].subtasks.length;
            let ticketID = findTicketIndex(tasks[i].title);
            target.innerHTML += ticketTemplate(ticketID, category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks);
            updateProgressBar(ticketTitle, ticketID);
            renderAssignedUsers(ticketTitle, ticketID);
        }
    }
}

/**
 * Returns the amount of subtasks which are already done, based on the ticket title
 * 
 * @param {string} title 
 * @returns The amount of subtasks, which are already done
 */
function subtasksClosed(title) {
    let searchedTask = allTasks.filter(t => t['title'] == title);
    let searchedSubTasks = searchedTask.filter(st => st['status'] == 'closed');
    return searchedSubTasks.length;
}

/**
 * Updates the width of the progress-bar, based on the done subtasks of the ticket
 * 
 * @param {string} title - Title of the ticket
 * @param {int} ticketID - Identifier of the ticket based on the index of the ticket in the allTasks-Array
 */
function updateProgressBar(title, ticketID) {
    let closedTasks = subtasksClosed(title);
    let searchedTask = allTasks.filter(t => t['title'] == title);
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

function renderAssignedUsers(title, ticketID) {
    let searchedTask = allTasks.filter(t => t['title'] == title)[0];
    let assignedUsers = searchedTask.assigned_to;
    for(let i = 0; i < assignedUsers.length; i++) {
        let initials = assignedUsers[i].name.charAt(0).toUpperCase() + assignedUsers[i].name.charAt(assignedUsers[i].name.length - 1).toUpperCase();
        let bgColor = assignedUsers[i].color;
        document.getElementById(`ticketAssignedUsers_${ticketID}`).innerHTML += renderUserCircle(initials, bgColor);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function move(category) {
    //MaSc: Code einfügen NACHDEM die Firebase verknüpft wurde
}
