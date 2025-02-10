let userName;
let summaryTasks;
let summaryToDo;
let summaryInProgress;
let summaryFeedback;
let summaryDone;
let summaryUrgent;
let earliestDate;

/**
 * URL for the database
 */
const BASE_URL = "https://join-kanbanboard-558ae-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * check if the user have the status in the locals storage from rememberMe of true than he goes direktly to the summary side
 */
function checkRememberMe() {
  let remember = localStorage.getItem("rememberMe");
  if (remember === "true") {
    window.location.href = getBaseWebsideURL() + "/summary.html";
  } else {
    LogInNotRemember();
  }
}

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
    phone: "",
  };
  try {
    let response = await postData(`users/${userMail.replace(".", "_")}`, userData);
    createUser();
  } catch (error) {}
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
 * A function that directs to the board.html
 */
function goToBoard() {
  window.location.href = getBaseWebsideURL() + "/board.html";
}

/**
 * Checks if the form is loaded on the website and listens if the enter-key is pressed. If yes, than the onclick-function on the checkIcon is activated
 */
function initializeKeyDown() {
  const form = document.getElementById("task-subtasks");
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
