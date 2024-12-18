function renderSubtaskItem(itemID, itemContent) {
    return `<div class="subtask-item" id="subtaskItem_${itemID}">
                <div class="subtask-content-wrapper">
                    <span class="bullet-point">•</span>
                    <span class="subtask-content" id="subtaskContent_${itemID}">${itemContent}</span>
                </div>
                <div class="subtask-actions">
                    <img class="edit-icon" src="./assets/icons/subtask-edit.png" alt="">
                    <span class="divider"></span>
                    <img class="delete-icon" src="./assets/icons/subtask-delete.png" alt="">
                </div>
            </div>`;
}

/**
 * Returns the new and updated text as a bullet point if any changes were made
 * 
 * @param {string} updatedText 
 * @returns HTML-Snippet for the subtask bullet point
 */
function saveSubtaskItem(updatedText) {
    return `<span class="bullet-point">•</span>
            <span class="subtask-content">${updatedText}</span>
    `;
}

/**
 * Returns the origin text in the bullet point if the input was canceled
 * 
 * @param {string} text 
 * @returns HTML-Snippet for the subtask bullet point
 */
function cancelSubtaskItem(text) {
    return `<span class="bullet-point">•</span>
            <span class="subtask-content">${text}</span>
    `;
}

/**
 * Creates a JSON-Object out of the form content to be pushed into the Firebase Realtime DB
 * 
 * @param {string} taskTitle 
 * @param {string} taskDate 
 * @param {string} taskPrio 
 * @param {string} taskDescription 
 * @param {string} taskCategory 
 * @param {object} taskSubtasks 
 * @param {object} taskAssigned 
 * @param {string} taskState 
 * @returns a JSON Object which is uploaded into the Firebase Realtime DB
 */
function taskToJSON(taskTitle, taskDate, taskPrio, taskDescription, taskCategory, taskSubtasks, taskAssigned, taskState) {
    return {
    title: taskTitle,
    due_date: taskDate,
    prio: taskPrio,
    description: taskDescription,
    category: taskCategory,
    subtasks: taskSubtasks,
    assigned_to: taskAssigned,
    state: taskState
};
}