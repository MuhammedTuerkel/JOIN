/**
 * Handles the click event for the dropdown.
 * Opens the dropdown container and updates the dropdown arrow.
 * @param {Event} event - The event object.
 */
function openDropdown(event) {
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
  }
}

/**
 * Handles the click event for the dropdown.
 * Closes the dropdown container and updates the dropdown arrow.
 * clears the input field
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
  if (dropdownContainer && dropdownContainer.classList.contains("open")) {
    closeDropdown();
  }
}

/** updatet
 * Loads the users into the dropdown container.
 * Updates the dropdown selections based on previously selected users.
 */
function loadUserInAssignedToDropdown() {
  let dropdownContainer = document.getElementById("addTaskDropdown");
  dropdownContainer.innerHTML = "";
  for (let index = 0; index < contacts.length; index++) {
    let contact = contacts[index];
    dropdownContainer.innerHTML += createUserTemplate(contact);
  }
  updateDropdownSelections();
}

/**
 * Toggles user selection based on checkbox status.
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
  let contact = contacts.find((contact) => contact.email === email);
  if (!selectedContacts.some((selectedContact) => selectedContact.email === contact.email)) {
    selectedContacts.push(contact);
  }
  updateSelectedUsersContainer();
}

/**
 * Unassigns a user and updates the UI accordingly.
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
  selectedContacts = selectedContacts.filter((contact) => contact.email !== email);
  updateSelectedUsersContainer();
}

/**
 * Updates the dropdown selections based on the selected users.
 */
function updateDropdownSelections() {
  selectedContacts.forEach((contact) => {
    let checkbox = document.getElementById(`checkbox-${contact.email}`);
    let template = document.getElementById(`template-${contact.email}`);
    let img = document.getElementById(`img-${contact.email}`);
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
 */
function updateSelectedUsersContainer() {
  let container = document.getElementById("selectedUsers");
  container.innerHTML = "";
  for (let index = 0; index < selectedContacts.length; index++) {
    let contact = selectedContacts[index];
    let initials = contact.name.charAt(0).toUpperCase() + contact.name.charAt(contact.name.length - 1).toUpperCase();
    container.innerHTML += `
            <div class="selected_user_circle" style="background-color: ${contact.color};">
                ${initials}
            </div>
        `;
  }
}

/**
 * Filters and loads users based on the search input value.
 */
function addTaskSearchUser() {
  let input = document.getElementById("addTaskSearchContacts").value.toLowerCase();
  let fiteredContacts = contacts.filter((contact) => contact.name.toLowerCase().startsWith(input));
  loadSearchedUsers(fiteredContacts);
}

/**
 * Loads the filtered users into the dropdown container.
 * @param {Array<Object>} filteredUsers - The filtered list of users.
 */
function loadSearchedUsers(fiteredContacts) {
  let findContact = document.getElementById("addTaskDropdown");
  findContact.innerHTML = "";
  if (fiteredContacts.length === 0) {
    findContact.innerHTML = '<div class="add_task_search_error"><small>no results found...</small></div>';
  }
  for (let index = 0; index < fiteredContacts.length; index++) {
    const contact = fiteredContacts[index];
    findContact.innerHTML += createUserTemplate(contact);
  }
}

/**
 * Saves the task and redirects to the board page.
 * @param {Event} event - The event object.
 */
function saveTaskGoToBoard(event, state = "toDo") {
  event.preventDefault();
  postTask(state);
  window.location.href = getBaseWebsideURL() + "/board.html";
}

/**
 * Saves the task and resets the form to create a new task.
 * @param {Event} event - The event object.
 */
function saveTaskCreateNewTask(event, state = "toDo") {
  event.preventDefault();
  postTask(state);
  document.getElementById("addTaskForm").reset();
  document.getElementById("addTaskOverlayNextStep").style.display = "none";
  document.body.style.overflow = "auto";
  addTaskClearTask();
}

/**
 * Saves the task and closes the overlay on the board.
 * @param {Event} event - The event object.
 */
function saveTaskCloseOverlay(event, state = "toDo") {
  event.preventDefault();
  postTask(state);
  addTaskClearTask();
  showToast("The ticket was created successfully", "success");
  setTimeout(() => {
    toggleOverlay();
    location.reload();
  }, 2500);
}

function deleteTicket(ticketID) {
  // Alle Tasks aus dem localStorage holen
  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Den Index des Tasks mit der entsprechenden ID finden
  let taskIndex = allTasks.findIndex((task) => task.id === ticketID);

  // Prüfen, ob der Task existiert, und ihn löschen
  if (taskIndex !== -1) {
    allTasks.splice(taskIndex, 1); // Task aus dem Array entfernen

    // Den aktualisierten Task-Array zurück in den localStorage speichern
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    console.log(`Task ${ticketID} gelöscht und localStorage aktualisiert.`);
  } else {
    console.log(`Task mit ID ${ticketID} nicht gefunden.`);
  }
  renderAllTickets(allTasks);
  showToast("The ticket was deleted", "alert");
  setTimeout(() => {
    toggleOverlay();
  }, 2500);
}
