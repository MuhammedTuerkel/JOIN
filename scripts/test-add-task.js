let selectedUsers = [];
let selectedPrio;

/**
 * Initializes the add task functionality.
 */
function addTaskOnInit() {
    onloadFunction();
    setMedium();
    subtaskInput();
    clearSubtaskInput();
}

function saveTaskGoToBoard(event){
    event.preventDefault();
    postTask();
    buildTask();
    window.location.href = "/board.html";
}

function saveTaskCreateNewTask(event){
    event.preventDefault();
    postTask();
    buildTask();
    document.getElementById('addTaskForm').reset();
    document.getElementById('addTaskOverlayNextStep').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function goBackToAddTask(event){
    document.getElementById('addTaskOverlayNextStep').style.display = 'none';
    document.body.style.overflow = 'auto';
    event.preventDefault();
}

async function postTask(path = "", data={}) {
    let response = await fetch(BASE_URL + path + ".json",{
       method: 'POST',
       header: {
            "Content-Type": "application/json", 
       },
       body: JSON.stringify(data) 
    });
    return responseToJSON = await response.json();
}

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
 * Handles the click event for the dropdown.
 * * open the dropdown container and updates the dropdown arrow.
 */
function openDropdown(event) {
    event.stopPropagation();
    document.getElementById('assigned').classList.add('add_task_dropdown_active')
    let dropdownContainer = document.getElementById('addTaskDropdown');
    let dropdownImage = document.getElementById('dropDownArrow');

    if (dropdownContainer.style.display === 'none' || dropdownContainer.style.display === '') {
        dropdownContainer.style.display = 'block';
        dropdownImage.style.transform = 'rotate(180deg)';
        loadUserInAssignedToDropdown();
    } else {
        closeDropdown()
    }
}

/**
 * Handles the click event for the dropdown.
 * * close the dropdown container and updates the dropdown arrow.
 */
function closeDropdown(){
    document.getElementById('assigned').classList.remove('add_task_dropdown_active');
    let dropdownContainer = document.getElementById('addTaskDropdown');
    let dropdownImage = document.getElementById('dropDownArrow');
    dropdownContainer.style.display = 'none';
    dropdownImage.style.transform = 'rotate(0deg)';
}

/**
 * * if the user click outside of the Dropdown list the dropdown list will be closed
 */
function handleDropdownBodyClick(){
    let dropdownContainer = document.getElementById('addTaskDropdown');   
    if(dropdownContainer.style.display === 'block'){
        closeDropdown();
    }
}

/**
 * Loads the users into the dropdown container.
 * Updates the dropdown selections based on previously selected users.
 */
function loadUserInAssignedToDropdown() {
    let dropdownContainer = document.getElementById('addTaskDropdown');
    dropdownContainer.innerHTML = "";

    for (let index = 0; index < users.length; index++) {
        let user = users[index];
        dropdownContainer.innerHTML += createUserTemplate(user);
    }
    updateDropdownSelections();
}

/**
 * Creates a user template with the user's initials.
 * 
 */
function createUserTemplate(user) {
    let initials = user.name.charAt(0).toUpperCase() + user.name.charAt(user.name.length - 1).toUpperCase();

    return `
        <div onclick="toggleUserSelection('${user.email}')" class="user_template_not_selected" id="template-${user.email}" >
            <div onclick="toggleUserSelection('${user.email}')" class="user_template_circle_name">
                <div onclick="toggleUserSelection('${user.email}')" class="user_circle" style="background-color: ${user.color};">
                    ${initials}
                </div>
                <p onclick="toggleUserSelection('${user.email}')">${user.name}</p>
            </div>
            <input onclick="toggleUserSelection('${user.email}')" type="checkbox" class="user_checkbox" id="checkbox-${user.email}">
            <label onclick="toggleUserSelection('${user.email}')" class="user_template_label" for="checkbox-${user.email}">
                <img src="./assets/img/check button.png" alt="" id="img-${user.email}">
            </label>
        </div>
    `;
}

/**
 * Toggles the selection of a user.
 *
 */
function toggleUserSelection(email) {
    let template = document.getElementById(`template-${email}`);
    let checkbox = document.getElementById(`checkbox-${email}`);
    let isChecked = checkbox.checked;

    if (isChecked) {
        notAssignedUser(email);
    } else {
        assignedUserDropDown(email);
    }
}

/**
 * Assigns a user and updates the UI accordingly.
 * 
 */
function assignedUserDropDown(email) {
    let template = document.getElementById(`template-${email}`);
    let checkedImg = document.getElementById(`img-${email}`);
    let checkbox = document.getElementById(`checkbox-${email}`);

    template.classList.remove('user_template_not_selected');
    template.classList.add('user_template_selected');
    checkedImg.src = "./assets/img/checked button.png";
    checkbox.checked = true;

    let user = users.find(user => user.email === email);
    selectedUsers.push(user);
    updateSelectedUsersContainer();
}

/**
 * Unassigns a user and updates the UI accordingly.
 * 
 */
function notAssignedUser(email) {
    let template = document.getElementById(`template-${email}`);
    let checkedImg = document.getElementById(`img-${email}`);
    let checkbox = document.getElementById(`checkbox-${email}`);

    template.classList.remove('user_template_selected');
    template.classList.add('user_template_not_selected');
    checkedImg.src = "./assets/img/check button.png";
    checkbox.checked = false;

    selectedUsers = selectedUsers.filter(user => user.email !== email);
    updateSelectedUsersContainer();
}

/**
 * Updates the dropdown selections based on the selected users.
 */
function updateDropdownSelections() {
    selectedUsers.forEach(user => {
        let checkbox = document.getElementById(`checkbox-${user.email}`);
        let template = document.getElementById(`template-${user.email}`);
        let img = document.getElementById(`img-${user.email}`);

        if (checkbox) {
            checkbox.checked = true;
            template.classList.remove('user_template_not_selected');
            template.classList.add('user_template_selected');
            img.src = "./assets/img/checked button.png";
        }
    });
}

/**
 * Updates the container with the selected users' initials.
 */
function updateSelectedUsersContainer() {
    let container = document.getElementById('selectedUsers');
    container.innerHTML = "";

    for (let index = 0; index < selectedUsers.length; index++) {
        let user = selectedUsers[index];
        let initials = user.name.charAt(0).toUpperCase() + user.name.charAt(user.name.length - 1).toUpperCase();
        container.innerHTML += `
            <div class="selected_user_circle" style="background-color: ${user.color};">
                ${initials}
            </div>
        `;
    }
}

function addTaskSearchUser() {    
    let input = document.getElementById('addTaskSearchContacts').value.toLowerCase(); 
    let filteredUsers = users.filter(user => user.name.toLowerCase().startsWith(input)); 
    loadSearchedUsers(filteredUsers); 
}

function loadSearchedUsers(filteredUsers){
    let findUser = document.getElementById('addTaskDropdown');
    findUser.innerHTML = "";

    for(let index = 0; index < filteredUsers.length; index++){
        const user = filteredUsers[index];
        findUser.innerHTML += createUserTemplate(user);
    }
}

/**
 * Ensures that only one button is active and assigns the selected button its appearance
 * 
 * @param {string} buttonId - id of the selected button
 * @param {string} svgId - id of the corresponding svg
 * @param {string} buttonClass - class of the selected button
 * @param {string} svgClass - class of the corresponding svg
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

/**
 * Sets the Design of the Urgent-Button and temporarily saves the prio into the selectedPrio variable
 */
function setUrgent() {
    activateButton('urgent-btn', 'urgent-svg', 'urgent', 'urgent-icon');
    selectedPrio = 'urgent';
}

/**
 * Sets the Design of the Medium-Button and temporarily saves the prio into the selectedPrio variable
 */
function setMedium() {
    activateButton('medium-btn', 'medium-svg', 'medium', 'medium-icon');
    selectedPrio = 'medium';
}

/**
 * Sets the Design of the Low-Button and temporarily saves the prio into the selectedPrio variable
 */
function setLow() {
    activateButton('low-btn', 'low-svg', 'low', 'low-icon');
    selectedPrio = 'low';
}

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

let subtasksArray = [];

function pushSubtaskArray() {
    let subTaskInput = document.getElementById('task-subtasks');
    let arrayLength = subtasksArray.length;
    let content = subTaskInput.value.trim();
    if(subtasksArray.length < 4 && content !== ''){
        subtasksArray.push(            {
                'id' : arrayLength + 1,
                'content' : content,
                'status' : 'open'
            });
            subTaskInput.value = '';
            renderSubtaskList();
        if(subtasksArray.length >= 4){
            disableInputAndButton();
        }       
    }else if(arrayLength >= 4){
        disableInputAndButton();
    }
    console.log(subtasksArray);
    document.getElementById('iconsContainer').style.visibility = 'hidden';
    document.getElementById('add-subtask-btn').style.visibility = 'visible';
}

function disableInputAndButton(){
    let subtaskInput = document.getElementById('task-subtasks');
    let addButton = document.getElementById('add-subtask-btn');
    subtaskInput.placeholder = 'maximum 4 Subtasks reached';
    subtaskInput.disabled = true;
    addButton.disabled = true;
    subtaskInput.classList.add('disabled');
    addButton.classList.add('disabled');
}

function enableInputAndButton(){
    let subtaskInput = document.getElementById('task-subtasks');
    let addButton = document.getElementById('add-subtask-btn');
    subtaskInput.placeholder = 'Add new subtask';
    subtaskInput.disabled = false;
    addButton.disabled = false;
    subtaskInput.classList.remove('disabled');
    addButton.classList.remove('disabled');
}

function renderSubtaskList() {
    let target = document.getElementById('subtasksList');
    target.innerHTML = '';
    for(let i = 0; i < subtasksArray.length; i++) {
        if(subtasksArray.length == 0) {
            break;
        } else {
            let itemID = subtasksArray[i].id;
            let itemContent = subtasksArray[i].content;
            target.innerHTML += renderSubtaskItem(itemID, itemContent);
        }
    }
}

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

function createIcon(className, src) {
    const icon = document.createElement('img');
    icon.setAttribute('src', src);
    icon.setAttribute('alt', className);
    icon.classList.add(className);
    return icon;
}

function createInputField(currentText) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('subtask-input');
    return input;
}

function createEditIcons() {
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './assets/icons/subtask-delete.png';
    deleteIcon.classList.add('delete-icon');
    deleteIcon.title = 'Löschen';
    const divider = document.createElement('span');
    divider.classList.add('divider');
    const saveIcon = document.createElement('img');
    saveIcon.src = './assets/icons/subtask-save.png';
    saveIcon.classList.add('save-icon');
    saveIcon.title = 'Speichern';
    return [deleteIcon, divider, saveIcon];
}

function editArrayEntry(subtaskID, updatedText) {
    const subtask = subtasksArray.find(item => item.id === subtaskID);
    if (subtask) {
        subtask.content = updatedText;
    } else {
        console.log('Could not find subtask with this ID')
    }
}

function deleteArrayEntry(subtaskID) {
    const index = subtasksArray.findIndex(item => item.id === subtaskID);
    if(index !== -1) {
        subtasksArray.splice(index, 1);
    }
}

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

function handleDeleteClick(target) {
    enableInputAndButton();
    const subtaskItem = target.closest('.subtask-item');
    const targetID = subtaskItem.id;
    const numericID = parseInt(targetID.split('_')[1], 10);
    subtaskItem.remove();
    deleteArrayEntry(numericID);
}

function generateUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

function showAddTaskOverlayNextStep(event){
    event.preventDefault();
    document.getElementById('addTaskOverlayNextStep').style.display = 'flex';
    document.body.style.overflow = 'hidden';

}

function checkFormValidity() {
    var taskTitle = document.getElementById('task-title').value;
    var taskDueDate = document.getElementById('task-due-date').value;
    var taskCategory = document.getElementById('task-category').value;

    var createTaskButton = document.getElementById('createTaskButton');

    if (taskTitle && taskDueDate && taskCategory) {
        createTaskButton.disabled = false; 
    } else {
        createTaskButton.disabled = true; 
    }
}

document.addEventListener('DOMContentLoaded', function() {
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
});

