/**
 * Puts the ticket subtasks into the subtasksArray inclusive new subtasks and updates the UI accordingly
 * @param {string} ticketID
 */
function pushEditSubtasksInGlobalArray(ticketID, index) {
  let targetTicket = allTasks.filter((i) => i.id === ticketID);
  subtasksArray = targetTicket[0].subtasks || [];
  if (!targetTicket[0].subtasks) {
    targetTicket[0].subtasks = subtasksArray;
  }
  let newSubtask = document.getElementById("task-subtasks");
  subtasksArray.push({
    id: subtasksArray.length + 1,
    content: newSubtask.value,
    status: "open",
  });
  newSubtask.value = "";
  renderSubtaskList(ticketID);
}

/**
 * Pushes a new subtask to the task's subtasks array in local storage and updates the UI.
 * @param {string} ticketID - The ID of the task to which the subtask will be added.
 */
function pushEditSubtasksArray(ticketID) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let targetTask = tasks.find((task) => task.id === ticketID);
  if (!targetTask) {
    console.error("Task not found");
    return;
  }
  if (!targetTask.subtasks) {
    targetTask.subtasks = [];
  }
  let subTaskInput = document.getElementById("task-subtasks");
  let content = subTaskInput.value.trim();

  if (content !== "") {
    let newSubtask = {
      id: generateUniqueID(),
      content: content,
      status: "open",
    };
    targetTask.subtasks.push(newSubtask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    subtasksArray = targetTask.subtasks;
    subTaskInput.value = "";
    renderEditSubtaskList(ticketID);
    document.getElementById("iconsContainer").style.visibility = "hidden";
    document.getElementById("add-subtask-btn").style.visibility = "visible";
  }
}

/**
 * Deletes an editable subtask from the task's subtasks array in local storage.
 * @param {HTMLElement} subtaskItem - The subtask item to delete.
 * @param {string} ticketID - The ID of the task the subtask belongs to.
 * @param {number} index - The index of the subtask to delete.
 */
function deleteEditSubtaskFromStorage(subtaskItem, ticketID, index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let task = tasks.find((t) => t.id === ticketID);
  if (task && task.subtasks) {
    task.subtasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    subtasksArray = task.subtasks;
  }
  subtaskItem.remove();
}
