let selectedUsers = [];

/**
 * Initializes the add task functionality.
 */
function addTaskInit() {
    onloadFunction();
    activateButton('medium-btn', 'medium-svg', 'medium', 'medium-icon');
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