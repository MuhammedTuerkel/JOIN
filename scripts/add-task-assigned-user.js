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

/**
 * Loads the users into the dropdown container.
 * Updates the dropdown selections based on previously selected users.
 */
async function loadUserInAssignedToDropdown() {
  let contacts = await getItemsFromFirebase();
  let dropdownContainer = document.getElementById("addTaskDropdown");
  dropdownContainer.innerHTML = "";
  for (let index = 0; index < contacts.length; index++) {
    let contact = contacts[index];
    dropdownContainer.innerHTML += createUserTemplate(contact);
  }
  updateDropdownSelections();
}

/**
 * Toggles user selection based on checkbox status.* @param {string} email -
 * The email of the user to toggle selection.
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
  let contactKey = Object.keys(contacts).find((key) => contacts[key].email === email);
  let contact = contacts[contactKey];
  contact.id = contactKey;
  if (!selectedContacts.some((selectedContact) => selectedContact.email === contact.email)) {
    selectedContacts.push(contact);
  }
  updateSelectedUsersContainer();
  console.log(selectedContacts);
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
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
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
  let maxUsers = Math.min(selectedContacts.length, 4);
  for (let i = 0; i < maxUsers; i++) {
    let initials =
      selectedContacts[i].name.charAt(0).toUpperCase() + selectedContacts[i].name.charAt(selectedContacts[i].name.length - 1).toUpperCase();
    let color = selectedContacts[i].color;
    document.getElementById("selectedUsers").innerHTML += renderAssignedContactCircle(initials, color);
  }
  if (selectedContacts.length > 4) {
    let additionalUsers = selectedContacts.length - 4;
    let initials = `+${additionalUsers}`;
    let color = "#2B3647";
    document.getElementById("selectedUsers").innerHTML += renderAssignedContactCircle(initials, color);
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
  }, 400);
}

/**
 * Handles the edit click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function handleEditClick(target) {
  disabledActionButton();
  const subtaskItem = target.closest(".subtask-item");
  const contentWrapper = subtaskItem.querySelector(".subtask-content-wrapper");
  const contentSpan = subtaskItem.querySelector(".subtask-content");
  subtaskItem.classList.add("editing");
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  const input = createInputField(contentSpan.textContent);
  const deleteIcon = createIcon("delete-icon", "./assets/icons/subtask-delete.png");
  const saveIcon = createIcon("save-icon", "./assets/icons/subtask-save.png");
  inputContainer.appendChild(input);
  inputContainer.appendChild(deleteIcon);
  inputContainer.appendChild(saveIcon);
  contentWrapper.innerHTML = "";
  contentWrapper.appendChild(inputContainer);
  const actions = subtaskItem.querySelector(".subtask-actions");
  actions.style.visibility = "hidden";
}

function disabledActionButton() {
  let actionButton = document.getElementById("endEditBtn");
  let titleInput = document.getElementById("task-title-overlay-edit");
  let discriptionInput = document.getElementById("task-description-overlay-edit");
  let dateInput = document.getElementById("task-due-date-overlay-edit");
  actionButton.disabled = true;
  titleInput.disabled = true;
  discriptionInput.disabled = true;
  dateInput.disabled = true;
  actionButton.classList.add("disabled");
  titleInput.classList.add("disabled");
  discriptionInput.classList.add("disabled");
  dateInput.classList.add("disabled");
  disablePrioButtons();
  disableAssignedField();
  disableSubtaskInput();
}

function disablePrioButtons() {
  let prioLowButton = document.getElementById("low-btn");
  let prioMediumButton = document.getElementById("medium-btn");
  let prioUrgentButon = document.getElementById("urgent-btn");
  prioLowButton.classList.add("disabled");
  prioMediumButton.classList.add("disabled");
  prioUrgentButon.classList.add("disabled");
  prioLowButton.disabled = true;
  prioMediumButton.disabled = true;
  prioUrgentButon.disabled = true;
}

function disableAssignedField() {
  let assignedInput = document.getElementById("addTaskSearchContacts");
  let assignedContainer = document.getElementById("assigned");
  assignedInput.classList.add("disabled");
  assignedContainer.classList.add("disabled");
  assignedInput.disabled = true;
}

function disableSubtaskInput() {
  let tasksList = document.getElementById("task-subtasks");
  let taskButton = document.getElementById("add-subtask-btn");
  taskButton.disabled = true;
  tasksList.classList.add("disabled");
  taskButton.classList.add("disabled");
}

function enableActionButton() {
  let actionButton = document.getElementById("endEditBtn");
  let titleInput = document.getElementById("task-title-overlay-edit");
  let discriptionInput = document.getElementById("task-description-overlay-edit");
  let dateInput = document.getElementById("task-due-date-overlay-edit");
  actionButton.disabled = false;
  titleInput.disabled = false;
  discriptionInput.disabled = false;
  dateInput.disabled = false;
  actionButton.classList.remove("disabled");
  titleInput.classList.remove("disabled");
  discriptionInput.classList.remove("disabled");
  dateInput.classList.remove("disabled");
  enablePrioButtons();
  enableAssignedField();
  enableSubtaskInput();
}

function enablePrioButtons() {
  let prioLowButton = document.getElementById("low-btn");
  let prioMediumButton = document.getElementById("medium-btn");
  let prioUrgentButon = document.getElementById("urgent-btn");
  prioLowButton.classList.remove("disabled");
  prioMediumButton.classList.remove("disabled");
  prioUrgentButon.classList.remove("disabled");
  prioLowButton.disabled = false;
  prioMediumButton.disabled = false;
  prioUrgentButon.disabled = false;
}

function enableAssignedField(event) {
  let assignedInput = document.getElementById("addTaskSearchContacts");
  let assignedContainer = document.getElementById("assigned");
  assignedInput.classList.remove("disabled");
  assignedContainer.classList.remove("disabled");
  assignedInput.disabled = false;
}

function enableSubtaskInput() {
  let tasksList = document.getElementById("task-subtasks");
  let taskButton = document.getElementById("add-subtask-btn");
  taskButton.disabled = false;
  tasksList.classList.remove("disabled");
  taskButton.classList.remove("disabled");
}

/**
 * Retrieves the closest subtask item element from the event target.
 * @param {Event} event - The event object.
 * @returns {HTMLElement} The closest subtask item element.
 */
function getClosestSubtaskItem(event) {
  return event.target.closest(".subtask-item");
}

/**
 * Deletes a subtask from the task's subtasks array in local storage.
 * @param {HTMLElement} subtaskItem - The subtask item to delete.
 * @param {string} ticketID - The ID of the task the subtask belongs to.
 */
function deleteSubtaskFromStorage(subtaskItem, ticketID) {
  if (!subtaskItem) return;
  const numericID = getNumericID(subtaskItem);
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.id === ticketID);
  if (!task || !task.subtasks) return;
  task.subtasks = task.subtasks.filter((subtask) => parseInt(subtask.id, 10) !== numericID);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  subtasksArray = task.subtasks;
  reindexSubtasks();
  subtaskItem.remove();
}

/**
 * Extracts the numeric ID from a subtask item's ID.
 * @param {HTMLElement} subtaskItem - The subtask item.
 * @returns {number} The numeric ID.
 */
function getNumericID(subtaskItem) {
  return parseInt(subtaskItem.id.split("_")[1], 10);
}

/**
 * Reindexes the subtasks array and updates their IDs.
 */
function reindexSubtasks() {
  subtasksArray.forEach((subtask, i) => (subtask.id = i + 1));
}
