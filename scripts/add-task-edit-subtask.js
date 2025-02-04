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

// document.addEventListener("click", (event) => {
//   const target = event.target;
//   if (target.classList.contains("edit-icon")) {
//     handleEditClick(target);
//   } else if (target.classList.contains("save-icon")) {
//     handleSaveClick(target);
//   }
// });

/**
 * Handles click events on subtask action icons.
 */
document.addEventListener("click", (event, ticketID) => {
  const target = event.target;
  if (target.classList.contains("edit-icon")) {
    handleEditClick(target);
  } else if (target.classList.contains("save-icon")) {
    handleSaveClick(target);
  }
});

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
 * Edits an entry in the subtasks array.
 * @param {number} subtaskID - The ID of the subtask to edit.
 * @param {string} updatedText - The updated text for the subtask.
 */
function editArrayEntry(subtaskID, updatedText) {
  const subtask = subtasksArray.find((item) => item.id === subtaskID);
  if (subtask) {
    subtask.content = updatedText;
  }
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
    console.log(selectedUsers);
  } else {
    assignedUserDropDownEdit(email);
    console.log(selectedUsers);
  }
}

/**
 * Updates the container with the selected users' initials.
 */
function updateSelectedUsersContainerEdit() {
  let container = document.getElementById("selectedUsers");
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
 * Handles the delete click event for a subtask.
 * @param {Event} event - The event object.
 * @param {string} ticketID - The ID of the task the subtask belongs to.
 * @param {number} index - The index of the subtask to delete.
 */
function handleDeleteClick(event, ticketID, index) {
  const subtaskItem = getClosestSubtaskItem(event);
  if (ticketID === "undefined") {
    deleteSubtaskLocally(subtaskItem, index);
  }
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
 * Deletes a subtask locally and updates the UI.
 * @param {HTMLElement} subtaskItem - The subtask item to delete.
 * @param {number} index - The index of the subtask to delete.
 */
function deleteSubtaskLocally(subtaskItem, index) {
  if (subtaskItem) subtaskItem.remove();
  subtasksArray.splice(index, 1);
  reindexSubtasks();
  if (subtasksArray.length < 4) enableInputAndButton();
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

/**
 * Handle the click event for deleting a subtask while editing an input field.
 * @param {HTML-Element} element
 */
function handleDeleteWhileEditInput(element) {
  const inputContainer = element.closest(".input-container");
  const endEditButton = document.getElementById("endEditBtn");
  const createTaskButton = document.getElementById("createTaskButton");
  if (inputContainer) {
    const input = inputContainer.querySelector("input.subtask-input");
    if (input) {
      const subtaskID = input.id;
      let ticketID = getTicketIDFromLocalStorage(subtaskID);
      if (ticketID === null) {
        ticketID = "undefined";
      }
      if (endEditButton) {
        endEditButton.ariaDisabled = false;
      } else if (createTaskButton) {
        createTaskButton.ariaDisabled = false;
      }
      handleDeleteClick(event, ticketID);
    } else {
      console.error("Keine Subtask ID gefunden");
    }
  } else {
    console.error('Kein übergeordnetes Element mit der Klasse "input-container" gefunden');
  }
}

/**
 * Gets the subtask content and finds the ticket ID associated with it.
 * @param {string} subtaskID
 * @returns the ticketID of the searched subtask
 */
function getTicketIDFromLocalStorage(subtaskID) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (const task of tasks) {
    if (task.subtasks) {
      for (const subtask of task.subtasks) {
        if (subtask.content === subtaskID.toString()) {
          return task.id;
        }
      }
    }
  }
  return null;
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

  // Finde den Kontakt im selectedUsers Array und füge ihn hinzu, wenn er nicht bereits vorhanden ist
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

  // Entferne den Kontakt aus dem selectedUsers Array
  let userIndex = selectedUsers.findIndex((selectedContact) => selectedContact.email === email);
  if (userIndex !== -1) {
    selectedUsers.splice(userIndex, 1);
  }

  updateSelectedUsersContainerEdit();
}
