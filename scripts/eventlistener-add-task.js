/**
 * Adds event listeners to display and hide error messages for form fields.
 */
document.addEventListener('DOMContentLoaded', function() {
    let taskCategory = document.getElementById('task-category');
    let taskDueDate = document.getElementById('task-due-date');
    let taskTitle = document.getElementById('task-title');

    taskCategory.addEventListener('focus', function() {
        document.getElementById('addTaskCategoryErrorInput').style.display = 'block';
    });

    taskCategory.addEventListener('blur', function() {
        document.getElementById('addTaskCategoryErrorInput').style.display = 'none';
    });

    taskDueDate.addEventListener('focus', function() {
        document.getElementById('addTaskDateErrorInput').style.display = 'block';
    });

    taskDueDate.addEventListener('blur', function() {
        document.getElementById('addTaskDateErrorInput').style.display = 'none';
    });

    taskTitle.addEventListener('focus', function() {
        document.getElementById('addTaskTitleErrorInput').style.display = 'block';
    });

    taskTitle.addEventListener('blur', function() {
        document.getElementById('addTaskTitleErrorInput').style.display = 'none';
    });
});