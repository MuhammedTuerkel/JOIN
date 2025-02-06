let greeting;

/**
 * Is a body-onload function
 */
async function Init() {
  await getAllTasks();
  getLoggedInUserData();
  getFromLocalStorage();
  putName();
  greetingOnMobile();
}

/**
 * Changes the greeting text to match the time of day
 */
document.addEventListener("DOMContentLoaded", function () {
  let today = new Date();
  let hourNow = today.getHours();
  if (hourNow >= 0 && hourNow < 12) {
    greeting = "Good Morning";
  } else if (hourNow >= 12 && hourNow < 18) {
    greeting = "Good Afternoon";
  } else if (hourNow >= 18 && hourNow < 24) {
    greeting = "Good Evening";
  }
  document.getElementById("greeting").innerHTML = greeting;
});

/**
 * If the screen width is under 1400px it shows the greeting text in the loading of the html for three seconds
 */
async function greetingOnMobile() {
  if (window.innerWidth < 1400) {
    document.getElementById("headline").style = "display:none;";
    document.getElementById("Tasks").style = "display:none;";
    document.getElementById("greeting-top").classList.remove("d-none");

    setTimeout(() => {
      document.getElementById("greeting-top").classList.add("d-none");

      document.getElementById("headline").style = "";
      document.getElementById("Tasks").style = "";
    }, 3000);
  }
}

/**
 * Makes the first letter of the name toUpperCase and puts the name in the greeting
 */
function putName() {
  let name =
    String(User[0].name).charAt(0).toUpperCase() +
    String(User[0].name).slice(1);
  document.getElementById("name").innerHTML = `${name}`;
  let firstLetter = User[0].name.charAt(0).toUpperCase();
  document.getElementById("user").innerHTML = `${firstLetter}`;
}

/**
 * Filters all tasks that the user has created and uses them to execute further functions
 */
async function getUserTasks() {
  let user = await fetch(BASE_URL + "tasks" + ".json");
  let responseAsJSON = await user.json();
  let tasks = Object.values(responseAsJSON);
  activeUserTasks = tasks.filter((task) => task["creator"] === userName);
  lengthOfSummaryTasks();
  lengthOfToDoTasks();
  lengthOfInProgressTasks();
  lengthOfFeedbackTasks();
  lengthOfDoneTasks();
  lengthOfUrgentTasks();
  getEarliestDate();
}

/**
 * Returns the length of the allTasks Array and shows them in the front-end
 * @param {array}
 */
function lengthOfSummaryTasks() {
  summaryTasks = allTasks.length;
  let target = document.getElementById("allTasks");
  target.innerHTML = "";
  target.innerHTML = `${summaryTasks}`;
}

/**
 * Counts how many tasks the user has with the status “toDo” and displays this value in the front end
 * @param {array}
 */
function lengthOfToDoTasks() {
  summaryToDo = allTasks.filter((item) => item.state === "toDo").length;
  let target = document.getElementById("todo");
  target.innerHTML = "";
  target.innerHTML = `${summaryToDo}`;
}

/**
 * Counts how many tasks the user has with the status “inProgress” and displays this value in the front end
 * @param {array}
 */
function lengthOfInProgressTasks() {
  summaryInProgress = allTasks.filter(
    (item) => item.state === "inProgress"
  ).length;
  let target = document.getElementById("inProgress");
  target.innerHTML = "";
  target.innerHTML = `${summaryInProgress}`;
}

/**
 * Counts how many tasks the user has with the status “awaitFeedback” and displays this value in the front end
 * @param {array}
 */
function lengthOfFeedbackTasks() {
  summaryFeedback = allTasks.filter(
    (item) => item.state === "awaitFeedback"
  ).length;
  let target = document.getElementById("awaiting");
  target.innerHTML = "";
  target.innerHTML = `${summaryFeedback}`;
}

/**
 * Counts how many tasks the user has with the status “done” and displays this value in the front end
 * @param {array}
 */
function lengthOfDoneTasks() {
  summaryDone = allTasks.filter((item) => item.state === "done").length;
  let target = document.getElementById("done");
  target.innerHTML = "";
  target.innerHTML = `${summaryDone}`;
}

/**
 * Counts how many tasks the user has with the priority “urgent” and displays this value in the front end
 * @param {array}
 */
function lengthOfUrgentTasks() {
  summaryUrgent = allTasks.filter((item) => item.prio === "urgent").length;
  let target = document.getElementById("urgent");
  target.innerHTML = "";
  target.innerHTML = `${summaryUrgent}`;
}

/**
 * Finds the object with the earliest due date in an array of objects.
 * @param {Array} array - Array of objects with a due_date property.
 * @returns {Object} - The object with the earliest due date.
 */
function getEarliestDate() {
  let target = document.getElementById("earliestDate");
  if (allTasks.length === 0) {
    target.innerHTML = "No upcoming tasks";
    document.getElementById("earliestDateInfo").classList.add("d_none");
    return;
  }
  earliestDateObject = allTasks.reduce((earliest, current) => {
    return new Date(current.due_date) < new Date(earliest.due_date)
      ? current
      : earliest;
  });
  earliestDateNumber = earliestDateObject.due_date;
  let earliestDate = changeDateFormat(earliestDateNumber);
  target.innerHTML = "";
  target.innerHTML = `${earliestDate}`;
}

/**
 * Takes a date format and changes it to another format
 * @param {string} earliestDateNumber
 * @returns
 */
function changeDateFormat(earliestDateNumber) {
  let date = new Date(earliestDateNumber);
  let day = String(date.getDate()).padStart(2, "0");
  let month = date.toLocaleString("de-DE", { month: "long" });
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
