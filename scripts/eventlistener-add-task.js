document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("task-form");
  const taskCategory = document.getElementById("task-category");
  const taskDueDate = document.getElementById("task-due-date");
  const taskTitle = document.getElementById("task-title");
  taskCategory.addEventListener("focus", function () {
    document.getElementById("addTaskCategoryErrorInput").style.display = "block";
  });
  taskCategory.addEventListener("blur", function () {
    document.getElementById("addTaskCategoryErrorInput").style.display = "none";
  });
  taskDueDate.addEventListener("focus", function () {
    document.getElementById("addTaskDateErrorInput").style.display = "block";
  });
  taskDueDate.addEventListener("blur", function () {
    document.getElementById("addTaskDateErrorInput").style.display = "none";
  });
  taskTitle.addEventListener("focus", function () {
    document.getElementById("addTaskTitleErrorInput").style.display = "block";
  });
  taskTitle.addEventListener("blur", function () {
    document.getElementById("addTaskTitleErrorInput").style.display = "none";
  });
  taskCategory.addEventListener("input", function () {
    checkFormValidity();
  });
  taskDueDate.addEventListener("input", function () {
    checkFormValidity();
  });
  taskTitle.addEventListener("input", function () {
    checkFormValidity();
  });
  checkFormValidity();
});
