/**
 * Returns a template that reports the absence of tasks
 * 
 * @param {string} listTitle - Title of the list in which there is no task
 * @returns 
 */
function noTasks(listTitle) {
    return `<div class="no-task-card">
                <span>No tasks ${listTitle}</span>
            </div>`;
}

function categoryBadge(categoryName) {
    return `<div class="category-badge-user">
                <span>${categoryName}</span>
            </div>`;
}