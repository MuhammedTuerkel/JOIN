let selectedUsers = [];
let selectedPrio;
let subtasksArray = [];

/**
 * Initializes the task form by calling necessary setup functions.
 */
function addTaskOnInit() {
    sideNavigation();
    onloadFunction();
    setMedium();
    subtaskInput();
    addTaskClearTask();
}

/**
 * Saves the task and redirects to the board page.
 * @param {Event} event - The event object.
 */
function saveTaskGoToBoard(event) {
    event.preventDefault();
    postTask();
    buildTask();
    window.location.href = "/board.html";
}

/**
 * Saves the task and resets the form to create a new task.
 * @param {Event} event - The event object.
 */
function saveTaskCreateNewTask(event) {
    event.preventDefault();
    let data = buildTask();
    postTask('tasks', data);
    document.getElementById('addTaskForm').reset();
    document.getElementById('addTaskOverlayNextStep').style.display = 'none';
    document.body.style.overflow = 'auto';
    addTaskClearTask();
}

/**
 * Saves the task and closes the overlay on the board
 * @param {Event} event 
 */
function saveTaskCloseOverlay(event) {
    event.preventDefault();
    let data = buildTaskOnBoard();
    postTask('tasks', data);
    addTaskClearTask();
    toggleOverlay();
    location.reload();
}

/**
 * clears the list from all subtasks
 *  clears the list of all assigned users 
 */
function addTaskClearTask(){
    let list = document.getElementById('subtasksList');
    let assignedList = document.getElementById('selectedUsers');
    document.getElementById('urgent-btn').classList.remove('urgent');
    document.getElementById('urgent-btn').classList.remove('active');
    document.getElementById('medium-btn').classList.add('medium');
    document.getElementById('medium-btn').classList.add('active');
    document.getElementById('low-btn').classList.remove('low');
    document.getElementById('low-btn').classList.remove('active');
    selectedUsers = [];
    list.innerHTML = "" ;
    assignedList.innerHTML = "";
}

/**
 * Goes back to the add task step in the overlay.
 * @param {Event} event - The event object.
 */
function goBackToAddTask(event) {
    document.getElementById('addTaskOverlayNextStep').style.display = 'none';
    document.body.style.overflow = 'auto';
    event.preventDefault();
}

/**
 * Posts a task to the server.
 * @param {string} [path=""] - The path to append to the base URL.
 * @param {Object} [data={}] - The data to be sent in the request body.
 * @returns {Promise<Object>} - The response JSON.
 */
async function postTask(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: 'POST',
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJSON = await response.json();
}

/**
 * Builds a task object from form input values
 * @returns {Object} - The task object in JSON format.
 */
function buildTask() {
    let taskTitle = document.getElementById('task-title').value;
    let taskDate = document.getElementById('task-due-date').value;
    let taskPrio = selectedPrio;
    let taskDescription = document.getElementById('task-description').value;
    let taskCategory = document.getElementById('task-category').value;
    let taskSubtasks = subtasksArray;
    let taskState = "toDo";
    let taskAssigned = selectedUsers;
    return taskToJSON(taskTitle, taskDate, taskPrio, taskDescription, taskCategory, taskSubtasks, taskAssigned, taskState);
}

/**
 * Builds a task object from form input values.
 * @returns {Object} - The task object in JSON format.
 */
function buildTaskOnBoard() {
    let taskTitle = document.getElementById('task-title').value;
    let taskDate = document.getElementById('task-due-date').value;
    let taskPrio = selectedPrioOnBoard;
    let taskDescription = document.getElementById('task-description').value;
    let taskCategory = document.getElementById('task-category').value;
    let taskSubtasks = subtasksArray;
    let taskState = "toDo";
    let taskAssigned = selectedUsers;
    return taskToJSON(taskTitle, taskDate, taskPrio, taskDescription, taskCategory, taskSubtasks, taskAssigned, taskState);
}

/**
 * Handles the input event for the subtask input field.
 */
function subtaskInput() {
    const input = document.getElementById('task-subtasks');
    const iconsContainer = document.getElementById('iconsContainer');
    const addSubtaskBtn = document.getElementById('add-subtask-btn');
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            iconsContainer.style.visibility = 'visible';
            addSubtaskBtn.style.visibility = 'hidden';
        } else {
            iconsContainer.style.visibility = 'hidden';
            addSubtaskBtn.style.visibility = 'visible';
        }
    });
}

/**
 * Clears the subtask input field and updates the UI accordingly.
 */
function clearSubtaskInput() {
    const input = document.getElementById('task-subtasks');
    const clearIcon = document.getElementById('clearIcon');
    const iconsContainer = document.getElementById('iconsContainer');
    const addSubtaskBtn = document.getElementById('add-subtask-btn');
    clearIcon.addEventListener('click', () => {
        input.value = '';
        input.focus();
        iconsContainer.style.visibility = 'hidden';
        addSubtaskBtn.style.visibility = 'visible';
    });
}

/**
 * Adds a new subtask to the subtasks array and updates the UI.
 */
function pushSubtaskArray() {
    let subTaskInput = document.getElementById('task-subtasks');
    let arrayLength = subtasksArray.length;
    let content = subTaskInput.value.trim();
    if (subtasksArray.length < 4 && content !== '') {
        subtasksArray.push({
            'id': arrayLength + 1,
            'content': content,
            'status': 'open'
        });
        subTaskInput.value = '';
        renderSubtaskList();
        if (subtasksArray.length >= 4) {
            disableInputAndButton();
        }
    } else if (arrayLength >= 4) {
        disableInputAndButton();
    }
    console.log(subtasksArray);
    document.getElementById('iconsContainer').style.visibility = 'hidden';
    document.getElementById('add-subtask-btn').style.visibility = 'visible';
}

/**
 * Disables the subtask input field and add button.
 */
function disableInputAndButton() {
    let subtaskInput = document.getElementById('task-subtasks');
    let addButton = document.getElementById('add-subtask-btn');
    subtaskInput.placeholder = 'maximum 4 Subtasks reached';
    subtaskInput.disabled = true;
    addButton.disabled = true;
    subtaskInput.classList.add('disabled');
    addButton.classList.add('disabled');
}

/**
 * Enables the subtask input field and add button.
 */
function enableInputAndButton() {
    let subtaskInput = document.getElementById('task-subtasks');
    let addButton = document.getElementById('add-subtask-btn');
    subtaskInput.placeholder = 'Add new subtask';
    subtaskInput.disabled = false;
    addButton.disabled = false;
    subtaskInput.classList.remove('disabled');
    addButton.classList.remove('disabled');
}

/**
 * Renders the list of subtasks.
 */
function renderSubtaskList() {
    let target = document.getElementById('subtasksList');
    target.innerHTML = '';
    for (let i = 0; i < subtasksArray.length; i++) {
        if (subtasksArray.length == 0) {
            break;
        } else {
            let itemID = subtasksArray[i].id;
            let itemContent = subtasksArray[i].content;
            target.innerHTML += renderSubtaskItem(itemID, itemContent);
        }
    }
}

/**
 * Handles click events on subtask action icons.
 */
document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('edit-icon')) {
        handleEditClick(target);
    } else if (target.classList.contains('save-icon')) {
        handleSaveClick(target);
    } else if (target.classList.contains('delete-icon')) {
        handleDeleteClick(target);
    }
});

/**
 * Handles the edit click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleEditClick(target) {
    const subtaskItem = target.closest('.subtask-item');
    const contentWrapper = subtaskItem.querySelector('.subtask-content-wrapper');
    const contentSpan = subtaskItem.querySelector('.subtask-content');
    subtaskItem.classList.add('editing');
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    const input = createInputField(contentSpan.textContent);
    const deleteIcon = createIcon('delete-icon', './assets/icons/subtask-delete.png');
    const saveIcon = createIcon('save-icon', './assets/icons/subtask-save.png');
    inputContainer.appendChild(input);
    inputContainer.appendChild(deleteIcon);
    inputContainer.appendChild(saveIcon);
    contentWrapper.innerHTML = '';
    contentWrapper.appendChild(inputContainer);
    const actions = subtaskItem.querySelector('.subtask-actions');
    actions.style.visibility = 'hidden';
}

/**
 * Creates an icon element.
 * @param {string} className - The class name for the icon.
 * @param {string} src - The source URL for the icon image.
 * @returns {HTMLElement} - The created icon element.
 */
function createIcon(className, src) {
    const icon = document.createElement('img');
    icon.setAttribute('src', src);
    icon.setAttribute('alt', className);
    icon.classList.add(className);
    return icon;
}

/**
 * Creates an input field element for editing a subtask.
 * @param {string} currentText - The current text of the subtask.
 * @returns {HTMLElement} - The created input field element.
 */
function createInputField(currentText) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('subtask-input');
    return input;
}

/**
 * Edits an entry in the subtasks array.
 * @param {number} subtaskID - The ID of the subtask to edit.
 * @param {string} updatedText - The updated text for the subtask.
 */
function editArrayEntry(subtaskID, updatedText) {
    const subtask = subtasksArray.find(item => item.id === subtaskID);
    if (subtask) {
        subtask.content = updatedText;
    }
}

/**
 * Deletes an entry from the subtasks array.
 * @param {number} subtaskID - The ID of the subtask to delete.
 */
function deleteArrayEntry(subtaskID) {
    const index = subtasksArray.findIndex(item => item.id === subtaskID);
    if (index !== -1) {
        subtasksArray.splice(index, 1);
    }
}

/**
 * Handles the save click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleSaveClick(target) {
    const subtaskItem = target.closest('.subtask-item');
    const targetID = subtaskItem.id;
    const numericID = parseInt(targetID.split('_')[1], 10);
    const contentWrapper = subtaskItem.querySelector('.subtask-content-wrapper');
    const inputContainer = subtaskItem.querySelector('.input-container');
    const input = inputContainer.querySelector('.subtask-input');
    const updatedText = input.value;
    contentWrapper.innerHTML = saveSubtaskItem(updatedText);
    const actions = subtaskItem.querySelector('.subtask-actions');
    actions.style.visibility = 'visible';
    inputContainer.remove();
    subtaskItem.classList.remove('editing');
    editArrayEntry(numericID, updatedText);
}

/**
 * Handles the cancel click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleCancelClick(target) {
    const subtaskItem = target.closest('.subtask-item');
    const contentWrapper = subtaskItem.querySelector('.subtask-content-wrapper');
    const inputContainer = subtaskItem.querySelector('.input-container');
    const contentSpan = subtaskItem.querySelector('.subtask-content');
    contentWrapper.innerHTML = cancelSubtaskItem(contentSpan.textContent);
    const actions = subtaskItem.querySelector('.subtask-actions');
    actions.style.visibility = 'visible';
    inputContainer.remove();
}

/**
 * Handles the delete click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleDeleteClick(target) {
    enableInputAndButton();
    const subtaskItem = target.closest('.subtask-item');
    const targetID = subtaskItem.id;
    const numericID = parseInt(targetID.split('_')[1], 10);
    subtaskItem.remove();
    deleteArrayEntry(numericID);
}

/**
 * Generates a unique ID based on the current timestamp and random values.
 * @returns {string} - The generated unique ID.
 */
function generateUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

/**
 * Shows the next step overlay for adding a task.
 * @param {Event} event - The event object.
 */
function showAddTaskOverlayNextStep(event) {
    event.preventDefault();
    document.getElementById('addTaskOverlayNextStep').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Checks the validity of the form fields and enables/disables the create task button accordingly.
 */
function checkFormValidity() {
    let taskTitle = document.getElementById('task-title').value;
    let taskDueDate = document.getElementById('task-due-date').value;
    let taskCategory = document.getElementById('task-category').value;
    let createTaskButton = document.getElementById('createTaskButton');
    if (taskTitle && taskDueDate && taskCategory) {
        createTaskButton.disabled = false;
    } else {
        createTaskButton.disabled = true;
    }
}