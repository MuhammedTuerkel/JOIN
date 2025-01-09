let User = [];

/**
 * Is a body-onload function
 */
function sideNavigation() {
  getFromLocalStorage();
  putName();
}

/**
 * Onclick to the submenu it opens the menu
 * @param {event} event
 */
function showSubmenu(event) {
  event.stopPropagation();
  document.getElementById("Submenu").style = "";
}

/**
 * Logging out and go back to login.html
 */
function logOut() {
  localStorage.setItem("rememberMe", false);
}

/**
 * Stops event bubbling
 * @param {event} event
 */
function stopEventBubbling(event) {
  event.stopPropagation();
}

/**
 * Hides the submenu
 */
function hideSubMenu() {
  document.getElementById("Submenu").style = "display:none;";
}

/**
 * Get the loggedInUser string from localstorage, generates to JSON and push it to user array
 */
function getFromLocalStorage() {
  let text = localStorage.getItem("loggedInUser");
  let Json = JSON.parse(text);
  User.push(Json);
}

/**
 * Put the first letter of the username to the profile-picture
 */
function putName() {
  let firstLetter = User[0].name.charAt(0).toUpperCase();
  document.getElementById("user").innerHTML = `${firstLetter}`;
}
