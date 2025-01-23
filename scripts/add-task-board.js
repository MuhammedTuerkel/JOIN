let selectedUsersOnBoard = [];

/**
 * Handles the click event for the dropdown.
 * Opens the dropdown container and updates the dropdown arrow.
 * @param {Event} event - The event object.
 */
function openEditDropdown(ticketID, event) {
  event.stopPropagation();
  document.getElementById("assigned").classList.add("add_task_dropdown_active");
  let dropdownContainer = document.getElementById("addTaskDropdown");
  let dropdownImage = document.getElementById("dropDownArrow");
  if (dropdownContainer.classList.contains("open")) {
    closeDropdown();
  } else {
    dropdownContainer.classList.add("open");
    dropdownImage.style.transform = "rotate(180deg)";
    loadUserInAssignedToDropdown();
    updateEditAssignedUsersDropdown(ticketID);
  }
}

/**
 * Handles the click event for the dropdown.
 * Closes the dropdown container and updates the dropdown arrow.
 * *clears the input field
 */
function closeDropdown() {
  document.getElementById("assigned").classList.remove("add_task_dropdown_active");
  let dropdownContainer = document.getElementById("addTaskDropdown");
  let dropdownImage = document.getElementById("dropDownArrow");
  dropdownContainer.classList.remove("open");
  dropdownImage.style.transform = "rotate(0deg)";
  document.getElementById("addTaskSearchContacts").value = "";
}

/**
 * Closes the dropdown list if the user clicks outside of it.
 */
function handleDropdownBodyClick() {
  let dropdownContainer = document.getElementById("addTaskDropdown");
  if (dropdownContainer.classList.contains("open")) {
    closeDropdown();
  }
}

/**
 * Loads the users into the dropdown container.
 * Updates the dropdown selections based on previously selected users.
 */
function loadUserInAssignedToDropdown() {
  let dropdownContainer = document.getElementById("addTaskDropdown");
  dropdownContainer.innerHTML = "";
  let storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
  for (let index = 0; index < storedContacts.length; index++) {
    let contact = storedContacts[index];
    dropdownContainer.innerHTML += createUserTemplate(contact);
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

  template.classList.remove("user_template_not_selected");
  template.classList.add("user_template_selected");
  checkedImg.src = "./assets/img/checked button.png";
  checkbox.checked = true;

  let user = users.find((user) => user.email === email);
  if (!selectedUsersOnBoard.some((selectedUser) => selectedUser.email === user.email)) {
    selectedUsersOnBoard.push(user);
  }
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

  template.classList.remove("user_template_selected");
  template.classList.add("user_template_not_selected");
  checkedImg.src = "./assets/img/check button.png";
  checkbox.checked = false;

  selectedUsersOnBoard = selectedUsersOnBoard.filter((user) => user.email !== email);
  updateSelectedUsersContainer();
}

/**
 * Updates the dropdown selections based on the selected users.
 */
function updateDropdownSelections() {
  selectedUsersOnBoard.forEach((user) => {
    let checkbox = document.getElementById(`checkbox-${user.email}`);
    let template = document.getElementById(`template-${user.email}`);
    let img = document.getElementById(`img-${user.email}`);

    if (checkbox) {
      checkbox.checked = true;
      template.classList.remove("user_template_not_selected");
      template.classList.add("user_template_selected");
      img.src = "./assets/img/checked button.png";
    }
  });
}

/**
 * Updates the container with the selected users' initials.
 * @param {string} ticketID - The ID of the task.
 */
function updateEditSelectedUsersContainer(ticketID) {
  let container = document.getElementById("selectedUsers");
  container.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let task = tasks.find((task) => task.id === ticketID);
  if (!task) return;
  let assignedContacts = task.assigned_to || [];
  for (let index = 0; index < assignedContacts.length; index++) {
    let contact = assignedContacts[index];
    let initials = contact.name.charAt(0).toUpperCase() + contact.name.charAt(contact.name.length - 1).toUpperCase();
    container.innerHTML += `
      <div class="selected_user_circle" style="background-color: ${contact.color};">
        ${initials}
      </div>
    `;
  }
  console.log("assigned Contacts", assignedContacts);

  updateEditAssignedUsersDropdown(assignedContacts);
}

/**
 * Filters and loads users based on the search input value.
 */
function addTaskSearchUser() {
  let input = document.getElementById("addTaskSearchContacts").value.toLowerCase();
  let filteredUsers = users.filter((user) => user.name.toLowerCase().startsWith(input));
  loadSearchedUsers(filteredUsers);
}

/**
 * Loads the filtered users into the dropdown container.
 *
 * @param {Array<Object>} filteredUsers - The filtered list of users.
 */
function loadSearchedUsers(filteredUsers) {
  let findUser = document.getElementById("addTaskDropdown");
  findUser.innerHTML = "";
  if (filteredUsers.length === 0) {
    findUser.innerHTML = '<div class="add_task_search_error"><small>no results found...</small></div>';
  }
  for (let index = 0; index < filteredUsers.length; index++) {
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
  const buttons = document.querySelectorAll(".prio-btn");
  buttons.forEach((button) => {
    button.classList.remove("urgent", "medium", "low", "active");
  });
  const svgs = document.querySelectorAll("svg");
  svgs.forEach((svg) => {
    svg.classList.remove("urgent-icon", "medium-icon", "low-icon");
  });
  document.getElementById(buttonId).classList.add(buttonClass, "active");
  document.getElementById(svgId).classList.add(svgClass);
}

/**
 * Sets the design of the Urgent button and temporarily saves the priority into the selectedPrio variable.
 */
function setUrgent() {
  activateButton("urgent-btn", "urgent-svg", "urgent", "urgent-icon");
  selectedPrio = "urgent";
}

/**
 * Sets the design of the Medium button and temporarily saves the priority into the selectedPrio variable.
 */
function setMedium() {
  activateButton("medium-btn", "medium-svg", "medium", "medium-icon");
  selectedPrio = "medium";
}

/**
 * Sets the design of the Low button and temporarily saves the priority into the selectedPrio variable.
 */
function setLow() {
  activateButton("low-btn", "low-svg", "low", "low-icon");
  selectedPrio = "low";
}

/**
 * Sets the design of the Urgent button and temporarily saves the priority into the selectedPrio variable.
 */
function setUrgentOnBoard() {
  activateButton("urgent-btn", "urgent-svg", "urgent", "urgent-icon");
  selectedPrioOnBoard = "urgent";
}

/**
 * Sets the design of the Medium button and temporarily saves the priority into the selectedPrio variable.
 */
function setMediumOnBoard() {
  activateButton("medium-btn", "medium-svg", "medium", "medium-icon");
  selectedPrioOnBoard = "medium";
}

/**
 * Sets the design of the Low button and temporarily saves the priority into the selectedPrio variable.
 */
function setLowOnBoard() {
  activateButton("low-btn", "low-svg", "low", "low-icon");
  selectedPrioOnBoard = "low";
}
