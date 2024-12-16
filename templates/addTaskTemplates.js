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

function saveSubtaskItem(updatedText) {
    return `<span class="bullet-point">•</span>
            <span class="subtask-content">${updatedText}</span>
    `;
}

function cancelSubtaskItem(text) {
    return `<span class="bullet-point">•</span>
            <span class="subtask-content">${text}</span>
    `;
}

function taskToJSON(taskTitle, taskDate, taskPrio, taskDescription, taskCategory, taskSubtasks, taskAssigned, taskState) {
    return `{
    "title": ${taskTitle},
    "due_date": ${taskDate},
    "prio": ${taskPrio},
    "description": ${taskDescription},
    "category": ${taskCategory},
    "subtasks": [${taskSubtasks}],
    "assigned_to": [
        {
            "id": 0,
            "firstname": "firstname",
            "lastname": "lastname"
        },
        {
            "id": 1,
            "firstname": "firstname",
            "lastname": "lastname"
        }
    ],
    "state": ${taskState}
}`;
}