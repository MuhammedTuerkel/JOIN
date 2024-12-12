function renderSubtaskItem(itemID, itemContent) {
    return `<div class="subtask-item" id="subtaskItem_${itemID}">
                <div>
                    <span class="bullet-point">•</span>
                    <span class="subtask-content" id="subtaskContent">${itemContent}</span>
                </div>
            </div>`;
}