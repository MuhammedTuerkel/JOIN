let selectedUsers = [];
let selectedPrio;

/**
 * Initializes the task form by calling necessary setup functions.
 */
function addTaskOnInit() {
    onloadFunction();
    setMedium();
    subtaskInput();
    clearSubtaskInput();
}

/**
 * Saves the task and redirects to the board page.
 * 
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
 * 
 * @param {Event} event - The event object.
 */
function saveTaskCreateNewTask(event) {
    event.preventDefault();
    postTask();
    buildTask();
    document.getElementById('addTaskForm').reset();
    document.getElementById('addTaskOverlayNextStep').style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Goes back to the add task step in the overlay.
 * 
 * @param {Event} event - The event object.
 */
function goBackToAddTask(event) {
    document.getElementById('addTaskOverlayNextStep').style.display = 'none';
    document.body.style.overflow = 'auto';
    event.preventDefault();
}

/**
 * Posts a task to the server.
 * 
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
 * Builds a task object from form input values.
 * 
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
 * Handles the click event for the dropdown.
 * Opens the dropdown container and updates the dropdown arrow.
 * 
 * @param {Event} event - The event object.
 */
function openDropdown(event) {
    event.stopPropagation();
    document.getElementById('assigned').classList.add('add_task_dropdown_active');
    let dropdownContainer = document.getElementById('addTaskDropdown');
    let dropdownImage = document.getElementById('dropDownArrow');

    if (dropdownContainer.style.display === 'none' || dropdownContainer.style.display === '') {
        dropdownContainer.style.display = 'block';
        dropdownImage.style.transform = 'rotate(180deg)';
        loadUserInAssignedToDropdown();
    } else {
        closeDropdown();
    }
}

/**
 * Handles the click event for the dropdown.
 * Closes the dropdown container and updates the dropdown arrow.
 */
function closeDropdown() {
    document.getElementById('assigned').classList.remove('add_task_dropdown_active');
    let dropdownContainer = document.getElementById('addTaskDropdown');
    let dropdownImage = document.getElementById('dropDownArrow');
    dropdownContainer.style.display = 'none';
    dropdownImage.style.transform = 'rotate(0deg)';
}

/**
 * Closes the dropdown list if the user clicks outside of it.
 */
function handleDropdownBodyClick() {
    let dropdownContainer = document.getElementById('addTaskDropdown');
    if (dropdownContainer.style.display === 'block') {
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
 * Toggles user selection based on checkbox status.
 * 
 * @param {string} email - The email of the user to toggle selection.
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
 * @param {string} email - The email of the user to be assigned.
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
 * @param {string} email - The email of the user to be unassigned.
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

/**
 * Filters and loads users based on the search input value.
 */
function addTaskSearchUser() {    
    let input = document.getElementById('addTaskSearchContacts').value.toLowerCase(); 
    let filteredUsers = users.filter(user => user.name.toLowerCase().startsWith(input)); 
    loadSearchedUsers(filteredUsers); 
}

/**
 * Loads the filtered users into the dropdown container.
 * 
 * @param {Array<Object>} filteredUsers - The filtered list of users.
 */
function loadSearchedUsers(filteredUsers){
    let findUser = document.getElementById('addTaskDropdown');
    findUser.innerHTML = "";

    for(let index = 0; index < filteredUsers.length; index++){
        const user = filteredUsers[index];
        findUser.innerHTML += createUserTemplate(user);
    }
}

/**
 * Ensures that only one button is active and assigns the selected button its appearance.
 * 
 * @param {string} buttonId - The id of the selected button.
 * @param {string} svgId - The id of the corresponding svg.
 * @param {string} buttonClass - The class of the selected button.
 * @param {string} svgClass - The class of the corresponding svg.
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
 * Sets the design of the Urgent button and temporarily saves the priority into the selectedPrio variable.
 */
function setUrgent() {
    activateButton('urgent-btn', 'urgent-svg', 'urgent', 'urgent-icon');
    selectedPrio = 'urgent';
}

/**
 * Sets the design of the Medium button and temporarily saves the priority into the selectedPrio variable.
 */
function setMedium() {
    activateButton('medium-btn', 'medium-svg', 'medium', 'medium-icon');
    selectedPrio = 'medium';
}

/**
 * Sets the design of the Low button and temporarily saves the priority into the selectedPrio variable.
 */
function setLow() {
    activateButton('low-btn', 'low-svg', 'low', 'low-icon');
    selectedPrio = 'low';
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
