let users = [];
let tasks = [];
let loggedInUser = [];

const BASE_URL =
  "https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/";

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
  console.log("Global users array:", users);
}

/**
 * Fetch data from Firebase Realtime Database
 * users is the path to the data in the database
 *
 */
async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  return responseToJson;
}

/**
 * Pushes a new user into the Firebase Realtime Database.
 *
 * This function prevents the default form submission behavior, collects the user input data,
 * generates a random color, creates a user data object, and posts this data to Firebase.
 * After successfully adding the user, it loads the login template and shows a registration confirmation.
 *
 */
async function pushNewUserinFireBaseArray(event) {
  event.preventDefault();
  let userName = document.getElementById("signUpName").value;
  let userMail = document.getElementById("signUpInputMail").value;
  let userPassword = document.getElementById(
    "signUpConfirmInputPassword"
  ).value;
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
    let response = await postData(
      `users/${userMail.replace(".", "_")}`,
      userData
    );
    console.log("User successfully added to Realtime Database:", response);
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
  document.getElementById("termsContent").innerHTML +=
    getPrivacyPolicyTemplate();
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

function getLoggedInUserData() {
  let loggedUser = localStorage.getItem("loggedInUser");
  let UserLogg = JSON.parse(loggedUser);

  console.log(UserLogg);
}
