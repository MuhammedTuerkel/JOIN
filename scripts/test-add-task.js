let selectedUsers = [];

/**
 * Initializes the add task functionality.
 */
function addTaskInit() {
    onloadFunction();
    activateButton('medium-btn', 'medium-svg', 'medium', 'medium-icon');
    subtaskInput();
    clearSubtaskInput();
    // checkSubtaskInput();
    // initSubtaskFunctions();
}

/**
 * Handles the click event for the dropdown.
 * Toggles the visibility of the dropdown container and updates the dropdown arrow.
 */
function handleDropdownClick() {
    let dropdownContainer = document.getElementById('addTaskDropdown');
    let dropdownImage = document.getElementById('dropDownArrow');

    if (dropdownContainer.style.display === 'none' || dropdownContainer.style.display === '') {
        dropdownContainer.style.display = 'block';
        dropdownImage.style.transform = 'rotate(180deg)';
        loadUserInAssignedToDropdown();
    } else {
        dropdownContainer.style.display = 'none';
        dropdownImage.style.transform = 'rotate(0deg)';
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
    let initials = user.name.charAt(0).toUpperCase() + user.name.charAt(user.name.length - 1).toUpperCase(); // Anfangs- und Endbuchstabe

    return `
        <div class="user_template_not_selected" id="template-${user.email}" >
            <div onclick="toggleUserSelection('${user.email}')" class="user_template_circle_name">
                <div class="user_circle" style="background-color: ${user.color};">
                    ${initials}
                </div>
                <p>${user.name}</p>
            </div>
            <input type="checkbox" class="user_checkbox" id="checkbox-${user.email}">
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
 * Sets the Design of the Urgent-Button
 */
function setUrgent() {
    activateButton('urgent-btn', 'urgent-svg', 'urgent', 'urgent-icon');
}

/**
 * Sets the Design of the Medium-Button
 */
function setMedium() {
    activateButton('medium-btn', 'medium-svg', 'medium', 'medium-icon');
}

/**
 * Sets the Design of the Low-Button
 */
function setLow() {
    activateButton('low-btn', 'low-svg', 'low', 'low-icon');
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
    let arrayLength = subtasksArray.length;
    let content = document.getElementById('task-subtasks');
    subtasksArray.push(
        {
            'id' : arrayLength + 1,
            'content' : content.value 
        }
    );
    renderSubtaskList();
    content.value = '';
    document.getElementById('iconsContainer').style.visibility = 'hidden';
    document.getElementById('add-subtask-btn').style.visibility = 'visible';
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

function editArrayEntry() {
    //Hole mir die ID des bearbeiteten Eintrags
    //Hole mir den geänderten Eintrag
    //Finde den ursprünglichen Eintrag im Array
    //Setze den Eintrag im Array den neuen Inhalt ein
    //Rendere die Subtask-List
}

function deleteArrayEntry() {
    //Hole mir die ID des gelöschten Eintrags
    //Finde den ursprünglichen Eintrag im Array
    //Entferne den Eintrag im Array
    //Rendere die Subtask-List
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
    // input.focus();
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

function handleSaveClick(target) {
    const subtaskItem = target.closest('.subtask-item');
    const targetID = target.closest('itemID');
    const contentWrapper = subtaskItem.querySelector('.subtask-content-wrapper');
    const inputContainer = subtaskItem.querySelector('.input-container');
    const input = inputContainer.querySelector('.subtask-input');
    const updatedText = input.value;
    contentWrapper.innerHTML = `
        <span class="bullet-point">•</span>
        <span class="subtask-content">${updatedText}</span>
    `;
    const actions = subtaskItem.querySelector('.subtask-actions');
    actions.style.visibility = 'visible';
    inputContainer.remove();
    subtaskItem.classList.remove('editing');
}

function handleCancelClick(target) {
    const subtaskItem = target.closest('.subtask-item');
    const contentWrapper = subtaskItem.querySelector('.subtask-content-wrapper');
    const inputContainer = subtaskItem.querySelector('.input-container');
    const contentSpan = subtaskItem.querySelector('.subtask-content');
    contentWrapper.innerHTML = `
        <span class="bullet-point">•</span>
        <span class="subtask-content">${contentSpan.textContent}</span>
    `;
    const actions = subtaskItem.querySelector('.subtask-actions');
    actions.style.visibility = 'visible';
    inputContainer.remove();
}


function handleDeleteClick(target) {
    const subtaskItem = target.closest('.subtask-item');
    subtaskItem.remove();
}