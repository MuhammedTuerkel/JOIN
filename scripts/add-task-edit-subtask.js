/**
 * Shows the ticket in the overlay when clicked on it
 * @param {string} category - The category of the ticket
 * @param {string} ticketTitle  - The Ticket title
 * @param {string} ticketDescription - The Ticket description
 * @param {string} ticketDate - The due date of the ticket
 * @param {string} prio - The Priority of the ticket
 * @param {string} ticketID - The exact ID which is based on the Firebase-ID
 */
async function showOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID) {
  document.getElementById("overlayID").innerHTML = renderOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID);
  renderAssignedUsersOverlay(ticketID);
  renderSubtasksOverlay(ticketID);
  actualFirebaseID = await findFirebaseIdById(ticketID);
}

function createEditIcons() {
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/subtask-delete.png";
  deleteIcon.classList.add("delete-icon");
  deleteIcon.title = "Löschen";
  const divider = document.createElement("span");
  divider.classList.add("divider");
  const saveIcon = document.createElement("img");
  saveIcon.src = "./assets/icons/subtask-save.png";
  saveIcon.classList.add("save-icon");
  saveIcon.title = "Speichern";
  return [deleteIcon, divider, saveIcon];
}

/**
 * Creates an icon element.
 * @param {string} className - The class name for the icon.
 * @param {string} src - The source URL for the icon image.
 * @returns {HTMLElement} - The created icon element.
 */
function createIcon(className, src) {
  const icon = document.createElement("img");
  icon.setAttribute("src", src);
  icon.setAttribute("alt", className);
  icon.classList.add(className);
  if (className === "delete-icon") {
    icon.addEventListener("click", function () {
      handleDeleteWhileEditInput(this);
    });
  }
  return icon;
}

/**
 * Creates an input field element for editing a subtask.
 * @param {string} currentText - The current text of the subtask.
 * @returns {HTMLElement} - The created input field element.
 */
function createInputField(currentText) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("subtask-input");
  input.id = currentText;
  input.setAttribute("oninput", `checkEditSubtaskInput('${currentText}')`);
  return input;
}

/**
 * Toggles user selection based on checkbox status.
 * @param {string} email - The email of the user to toggle selection.
 */
function toggleUserSelectionEdit(email) {
  let template = document.getElementById(`template-${email}`);
  let checkbox = document.getElementById(`checkbox-${email}`);
  let isChecked = checkbox.checked;
  if (isChecked) {
    notAssignedUserEdit(email);
  } else {
    assignedUserDropDownEdit(email);
  }
}

/**
 * Updates the container with the selected users' initials.
 */
function updateSelectedUsersContainerEdit() {
  let container = document.getElementById("selectedUsers");
  container.innerHTML = "";
  let maxUsers = Math.min(selectedUsers.length, 4);
  for (let i = 0; i < maxUsers; i++) {
    let initials = selectedUsers[i].name.charAt(0).toUpperCase() + selectedUsers[i].name.charAt(selectedUsers[i].name.length - 1).toUpperCase();
    let color = selectedUsers[i].color;
    document.getElementById("selectedUsers").innerHTML += renderAssignedContactCircle(initials, color);
  }
  if (selectedUsers.length > 4) {
    let additionalUsers = selectedUsers.length - 4;
    let initials = `+${additionalUsers}`;
    let color = "#2B3647";
    document.getElementById("selectedUsers").innerHTML += renderAssignedContactCircle(initials, color);
  }
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
    loadUserInEditAssignedToDropdown(ticketID);
  }
}

/**
 * Loads the users into the dropdown container.
 * Updates the dropdown selections based on previously selected users.
 */
async function loadUserInEditAssignedToDropdown(ticketID) {
  let contacts = await getItemsFromFirebase();
  let dropdownContainer = document.getElementById("addTaskDropdown");
  dropdownContainer.innerHTML = "";
  for (let index = 0; index < contacts.length; index++) {
    let contact = contacts[index];
    dropdownContainer.innerHTML += createUserTemplateEdit(contact);
  }
  updateEditDropdownSelections(ticketID);
}

/**
 * Updates the dropdown selections based on the selected users.
 * @param {string} ticketID - The ID of the selected task
 */
function updateEditDropdownSelections(ticketID) {
  let task = allTasks.find((task) => task.id === ticketID);
  selectedUsers = task.assigned_to;
  selectedUsers.forEach((contact) => {
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
 * Assigns a user and updates the UI accordingly.
 * @param {string} email - The email of the user to be assigned.
 */
function assignedUserDropDownEdit(email) {
  let template = document.getElementById(`template-${email}`);
  let checkedImg = document.getElementById(`img-${email}`);
  let checkbox = document.getElementById(`checkbox-${email}`);
  template.classList.remove("user_template_not_selected");
  template.classList.add("user_template_selected");
  checkedImg.src = "./assets/img/checked button.png";
  checkbox.checked = true;
  let contact = contacts.find((contact) => contact.email === email);
  if (contact && !selectedUsers.some((selectedContact) => selectedContact.email === contact.email)) {
    selectedUsers.push(contact);
  }
  updateSelectedUsersContainerEdit();
}

/**
 * Unassigns a user and updates the UI accordingly.
 * @param {string} email - The email of the user to be unassigned.
 */
function notAssignedUserEdit(email) {
  let template = document.getElementById(`template-${email}`);
  let checkedImg = document.getElementById(`img-${email}`);
  let checkbox = document.getElementById(`checkbox-${email}`);
  template.classList.remove("user_template_selected");
  template.classList.add("user_template_not_selected");
  checkedImg.src = "./assets/img/check button.png";
  checkbox.checked = false;

  let userIndex = selectedUsers.findIndex((selectedContact) => selectedContact.email === email);
  if (userIndex !== -1) {
    selectedUsers.splice(userIndex, 1);
  }

  updateSelectedUsersContainerEdit();
}

function addTaskHandleDeleteClick(index) {
  if (index < 0 || index >= subtasksArray.length) {
    console.error("Invalid index");
    return;
  }
  subtasksArray.splice(index, 1);
  reindexSubtasks();
  renderAddTaskSubtaskList();
}

/**
 * Reindexes the subtasks array and updates their IDs.
 */
function reindexSubtasks() {
  subtasksArray.forEach((subtask, i) => (subtask.id = i + 1));
}

/**
 * Handles click events on subtask action icons.
 */
document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("add-task-save-icon")) {
    addTaskHandleSaveClick(target);
    enableActionButton();
  } else if (target.classList.contains("add-task-delete-icon")) {
    addTaskHandleDeleteClick(target);
    enableActionButton();
  }
});

/**
 * Handles the edit click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function addTaskHandleEditClick(index) {
  disabledActionButton();
  const subtaskItem = document.getElementById(`subtaskItem_${index}`);
  if (!subtaskItem) {
    console.error(`Subtask item with index ${index} not found.`);
    return;
  }
  const contentWrapper = document.getElementById(`addTaskSubContentWrapper${index}`);
  const contentSpan = subtaskItem.querySelector(".subtask-content");
  subtaskItem.classList.add("editing");
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  const input = createInputField(contentSpan.textContent);
  const deleteIcon = createIcon("add-task-delete-icon", "./assets/icons/subtask-delete.png");
  const saveIcon = createIcon("add-task-save-icon", "./assets/icons/subtask-save.png");
  inputContainer.appendChild(input);
  inputContainer.appendChild(deleteIcon);
  inputContainer.appendChild(saveIcon);
  contentWrapper.innerHTML = "";
  contentWrapper.appendChild(inputContainer);
  const actions = subtaskItem.querySelector(".subtask-actions");
  actions.style.visibility = "hidden";
}

/**
 * Handles the save click event for a subtask.
 * @param {HTMLElement} target - The target element that triggered the event.
 */
function addTaskHandleSaveClick(target) {
  const subtaskItem = target.closest(".subtask-item");
  const createTaskButton = document.getElementById("createTaskButton");
  const targetID = subtaskItem.id;
  const numericID = parseInt(targetID.split("_")[1], 10);
  const contentWrapper = subtaskItem.querySelector(".subtask-content-wrapper");
  const inputContainer = subtaskItem.querySelector(".input-container");
  const input = inputContainer.querySelector(".subtask-input");
  const updatedText = input.value.trim();
  if (updatedText === "") {
    input.value = "";
    input.placeholder = "No empty subtasks allowed";
    return;
  }
  contentWrapper.innerHTML = saveSubtaskItem(updatedText);
  const actions = subtaskItem.querySelector(".subtask-actions");
  actions.style.visibility = "visible";
  inputContainer.remove();
  subtaskItem.classList.remove("editing");
  addTaskEditArrayEntry(numericID, updatedText);
}

/**
 * Updates a subtask's content based on its index.
 * @param {number} subtaskID - The index of the subtask to update.
 * @param {string} updatedText - The new content for the subtask.
 */
function addTaskEditArrayEntry(subtaskID, updatedText) {
  if (subtaskID >= 0 && subtaskID < subtasksArray.length) {
    subtasksArray[subtaskID].content = updatedText;
  }
}

function disabledActionButton() {
  let actionButton = document.getElementById("createTaskButton");
  let titleInput = document.getElementById("task-title");
  let discriptionInput = document.getElementById("task-description");
  let dateInput = document.getElementById("task-due-date");
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
  let actionButton = document.getElementById("createTaskButton");
  let titleInput = document.getElementById("task-title");
  let discriptionInput = document.getElementById("task-description");
  let dateInput = document.getElementById("task-due-date");
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
