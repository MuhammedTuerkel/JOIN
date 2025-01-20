document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("edit-icon")) {
    handleEditClick(target);
  } else if (target.classList.contains("save-icon")) {
    handleSaveClick(target);
  } else if (target.classList.contains("delete-icon")) {
    handleDeleteClick(target);
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
