let FIREBASE_URL = 'https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/';

let allTasks = [];

async function onInit() {
    await getAllTasks();
    await renderAllTickets();
}

async function getAllTasks() {
    let response = await fetch(FIREBASE_URL + 'tasks' + '.json');
    let responseAsJSON = await response.json();
    allTasks = Object.values(responseAsJSON);
}

async function renderAllTickets() {
    renderToDoTasks();
    renderInProgressTasks();
    renderFeedbackTasks();
    renderDoneTasks();
}

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
            let subtaskDone = subtasksDone(tasks[i].title);
            let allSubtasks = tasks[i].subtasks.length;
            target.innerHTML += ticketTemplate(category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks);
        }
    }
}

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
            let subtaskDone = subtasksDone(tasks[i].title);
            let allSubtasks = tasks[i].subtasks.length;
            target.innerHTML += ticketTemplate(category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks);
        }
    }
}

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
            let subtaskDone = subtasksDone(tasks[i].title);
            let allSubtasks = tasks[i].subtasks.length;
            target.innerHTML += ticketTemplate(category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks);
        }
    }
}

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
            let subtaskDone = subtasksDone(tasks[i].title);
            let allSubtasks = tasks[i].subtasks.length;
            target.innerHTML += ticketTemplate(category, ticketTitle, ticketDescription, prio, subtaskDone, allSubtasks);
        }
    }
}

function subtasksDone(title) {
    let searchedTask = allTasks.filter(t => t['title'] == title);
    let searchedSubTasks = searchedTask.filter(st => st['status'] == 'closed');
    return searchedSubTasks.length;
}

function shortenDescription(string, maxLength = 44) {
    if(string.length > maxLength) {
        return string.slice(0, maxLength - 3) + '...';
    }
    return string;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function move(category) {
    //MaSc: Code einfügen NACHDEM die Firebase verknüpft wurde
}
