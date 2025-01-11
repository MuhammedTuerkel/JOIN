let users = [];
let tasks = [];
let loggedInUser = [];
let userName;
let activeUserTasks = [];
let summaryTasks;
let summaryToDo;
let summaryInProgress;
let summaryFeedback;
let summaryDone;
let summaryUrgent;
let earliestDate;

const BASE_URL = "https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Load user data from Firebase Realtime Database into global users array
 */
async function onloadFunction() {
  let userResponse = await loadData("users");
  let userKeyArray = Object.keys(userResponse);

  for (let index = 0; index < userKeyArray.length; index++) {
    let userEntries = Object.values(userResponse[userKeyArray[index]]);
    for (let entry of userEntries) {
      users.push(entry);
    }
  }
}

/**
 * Fetch data from Firebase Realtime Database
 * users is the path to the data in the database
 */
async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  return responseToJson;
}

/**
 * Pushes a new user into the Firebase Realtime Database.
 * This function prevents the default form submission behavior, collects the user input data,
 * generates a random color, creates a user data object, and posts this data to Firebase.
 * After successfully adding the user, it loads the login template and shows a registration confirmation.
 *
 */
async function pushNewUserinFireBaseArray(event) {
  event.preventDefault();
  let userName = document.getElementById("signUpName").value;
  let userMail = document.getElementById("signUpInputMail").value;
  let userPassword = document.getElementById("signUpConfirmInputPassword").value;
  const color = createRandomColor();
  const userData = {
    name: userName,
    email: userMail,
    password: userPassword,
    color: color,
    createdAt: new Date().toISOString(),
    Contacts: [
      {
        name: "First Contact",
        email: "firstco@gmail.com",
        phone: "1234567890",
      },
    ],
  };
  try {
    let response = await postData(`users/${userMail.replace(".", "_")}`, userData);
    // console.log("User successfully added to Realtime Database:", response);
    createUser();
  } catch (error) {
    console.error("Error adding user to Realtime Database:", error);
  }
}

/**
 * Posts data to the Firebase Realtime Database.
 * This function sends a POST request to the specified path in the Firebase Realtime Database
 * with the provided data.
 *  The response data from Firebase.
 */
async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

/**
 * Generates a random color.
 * This function creates a random hexadecimal color code.
 * returns a random hexadecimal color code.
 */
function createRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Stores the template type as 'privacyPolicy' in sessionStorage and navigates to the 'privacy-and-legal.html' page.
 */
function openHelpHtml() {
  sessionStorage.setItem("previousPage", window.location.href);
  sessionStorage.setItem("templateType", "help");
  window.location.href = "help.html";
}

/**
 * Stores the template type as 'privacyPolicy' in sessionStorage and navigates to the 'privacy-and-legal.html' page.
 */
function renderPrivacyPolicyTemplateLoggedInUser() {
  sessionStorage.setItem("previousPage", window.location.href);
  sessionStorage.setItem("templateType", "privacyPolicy");
  window.location.href = "privacy-and-legal.html";
}

/**
 * Stores the template type as 'legalNotice' in sessionStorage and navigates to the 'privacy-and-legal.html' page.
 */
function renderLegalNoticeTemplateLoggedInUser() {
  sessionStorage.setItem("previousPage", window.location.href);
  sessionStorage.setItem("templateType", "legalNotice");
  window.location.href = "privacy-and-legal.html";
}

/**
 * load the help html side
 */
function loadHelpHtml() {
  changeReturnArrowOnclickFunction();
}

/**
 * Renders the privacy policy template by updating the innerHTML of the 'termsContent' element
 * and sets the onclick function for the return arrow.
 */
function renderPrivacyPolicyTemplate() {
  document.getElementById("termsContent").innerHTML += getPrivacyPolicyTemplate();
  changeReturnArrowOnclickFunction();
}

/**
 * Renders the legal notice template by updating the innerHTML of the 'termsContent' element
 * and sets the onclick function for the return arrow.
 */
function renderLegalNoticeTemplate() {
  document.getElementById("termsContent").innerHTML += getLegalNoticeTemplate();
  changeReturnArrowOnclickFunction();
}

/**
 * Sets up the template rendering process based on the stored template type in sessionStorage.
 * Clears the 'termsContent' element and renders the corresponding template.
 */
document.addEventListener("DOMContentLoaded", function () {
  const templateType = sessionStorage.getItem("templateType");
  let template = document.getElementById("termsContent");

  if (templateType === "privacyPolicy") {
    renderPrivacyPolicyTemplate();
  } else if (templateType === "legalNotice") {
    renderLegalNoticeTemplate();
  } else if (templateType === "help") {
    loadHelpHtml();
  }
});

/**
 * Changes the onclick function of the return arrow to call the returnToSessionStoragePage function.
 */
function changeReturnArrowOnclickFunction() {
  let image = document.getElementById("returnArrow");
  if (image) {
    image.onclick = returnToSessionStoragePage;
  }
}

/**
 * Navigates to the previous page stored in sessionStorage.
 * If no previous page is found, the user will go to the login page of JOIN.
 */
function returnToSessionStoragePage() {
  let previousPage = sessionStorage.getItem("previousPage");
  if (previousPage) {
    window.location.href = previousPage;
  } else {
    window.location.href = "/login.html";
  }
}

/**
 * Saves the users name into the global userName-Variable
 */
function getLoggedInUserData() {
  let loggedUser = localStorage.getItem("loggedInUser");
  let UserLogg = JSON.parse(loggedUser);
  userName = UserLogg.name;
}

/**
 * Gets all tasks which are saved in the firebase realtime database with its Firebase-ID
 */
async function getAllTasks() {
  let response = await fetch(BASE_URL + "tasks" + ".json");
  let responseAsJSON = await response.json();
  allTasks = Object.entries(responseAsJSON).map(([id, task]) => {
    return { firebase_id: id, ...task };
  });
}

/**
 * Filters all tasks that the user has created and uses them to execute further functions
 */
async function getUserTasks() {
  let user = await fetch(BASE_URL + "tasks" + ".json");
  let responseAsJSON = await user.json();
  let tasks = Object.values(responseAsJSON);
  activeUserTasks = tasks.filter((task) => task["creator"] === userName);
  lengthOfSummaryTasks(activeUserTasks);
  lengthOfToDoTasks(activeUserTasks);
  lengthOfInProgressTasks(activeUserTasks);
  lengthOfFeedbackTasks(activeUserTasks);
  lengthOfDoneTasks(activeUserTasks);
  lengthOfUrgentTasks(activeUserTasks);
  getEarliestDate(activeUserTasks);
}

/**
 * Returns the length of the allTasks Array and shows them in the front-end
 * @param {array} activeUserTasks
 */
function lengthOfSummaryTasks(activeUserTasks) {
  summaryTasks = allTasks.length;
  let target = document.getElementById("allTasks");
  target.innerHTML = "";
  target.innerHTML = `${summaryTasks}`;
}

/**
 * Counts how many tasks the user has with the status “toDo” and displays this value in the front end
 * @param {array} activeUserTasks
 */
function lengthOfToDoTasks(activeUserTasks) {
  summaryToDo = activeUserTasks.filter((item) => item.state === "toDo").length;
  let target = document.getElementById("todo");
  target.innerHTML = "";
  target.innerHTML = `${summaryToDo}`;
}

/**
 * Counts how many tasks the user has with the status “inProgress” and displays this value in the front end
 * @param {array} activeUserTasks
 */
function lengthOfInProgressTasks(activeUserTasks) {
  summaryInProgress = activeUserTasks.filter((item) => item.state === "inProgress").length;
  let target = document.getElementById("inProgress");
  target.innerHTML = "";
  target.innerHTML = `${summaryInProgress}`;
}

/**
 * Counts how many tasks the user has with the status “awaitFeedback” and displays this value in the front end
 * @param {array} activeUserTasks
 */
function lengthOfFeedbackTasks(activeUserTasks) {
  summaryFeedback = activeUserTasks.filter((item) => item.state === "awaitFeedback").length;
  let target = document.getElementById("awaiting");
  target.innerHTML = "";
  target.innerHTML = `${summaryFeedback}`;
}

/**
 * Counts how many tasks the user has with the status “done” and displays this value in the front end
 * @param {array} activeUserTasks
 */
function lengthOfDoneTasks(activeUserTasks) {
  summaryDone = activeUserTasks.filter((item) => item.state === "done").length;
  let target = document.getElementById("done");
  target.innerHTML = "";
  target.innerHTML = `${summaryDone}`;
}

/**
 * Counts how many tasks the user has with the priority “urgent” and displays this value in the front end
 * @param {array} activeUserTasks
 */
function lengthOfUrgentTasks(activeUserTasks) {
  summaryUrgent = activeUserTasks.filter((item) => item.prio === "urgent").length;
  let target = document.getElementById("urgent");
  target.innerHTML = "";
  target.innerHTML = `${summaryUrgent}`;
}

/**
 * Finds the object with the earliest due date in an array of objects.
 * @param {Array} array - Array of objects with a due_date property.
 * @returns {Object} - The object with the earliest due date.
 */
function getEarliestDate(activeUserTasks) {
  let target = document.getElementById("earliestDate");
  if (activeUserTasks.length === 0) {
    target.innerHTML = "No upcoming tasks";
    document.getElementById("earliestDateInfo").classList.add("d_none");
    return;
  }
  earliestDateObject = activeUserTasks.reduce((earliest, current) => {
    return new Date(current.due_date) < new Date(earliest.due_date) ? current : earliest;
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

/**
 * A function that directs to the board.html
 */
function goToBoard() {
  window.location.href = getBaseWebsideURL() + "/board.html";
}

/**
 * Checks if the form is loaded on the website and listens if the enter-key is pressed. If yes, than the onclick-function on the checkIcon is activated
 */
function initializeKeyDown() {
  const form = document.getElementById("addTaskForm");
  if (form) {
    form.onkeydown = function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const checkIcon = document.getElementById("checkIcon");
        if (checkIcon) {
          checkIcon.click();
        }
      }
    };
  }
}

/**
 * Checks if the edit-form is loaded on the website and listens if the enter-key is pressed. If yes, than the onclick-function on the checkIcon is activated
 */
function initializeKeyDownOnEdit() {
  const form = document.getElementById("overlayEditForm");
  if (form) {
    form.onkeydown = function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const checkIcon = document.getElementById("checkIcon");
        if (checkIcon) {
          checkIcon.click();
        }
      }
    };
  }
}

/**
 * Checks if the screen-orientation of the user is in landscape or portrait mode
 */
function checkOrientation() {
  const warning = document.getElementById("orientationWarning");
  if (window.innerWidth < window.innerHeight) {
    warning.style.display = "none";
  } else if (window.innerWidth <= 900) {
    warning.style.display = "block";
  }
}
