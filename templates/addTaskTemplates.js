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