let User = [];

// is a onload Function

function sideNavigation() {
    getFromLocalStorage();
    putName();
}

// onclick to the Submenu it opens the menu

function showSubmenu(event) {
    event.stopPropagation();
    document.getElementById('Submenu').style = "";
}

// loggingOut and go back to login.html

function logOut() {
    localStorage.setItem("rememberMe", false);
}

// stops event bubbling

function stopEventBubbling(event) {
    event.stopPropagation();
}

// hides the Submenu

function hideSubMenu() {
    document.getElementById('Submenu').style = "display:none;"
}

// get the LoggedInUser string from localstorage, generates to JSON and push it to User Array

function getFromLocalStorage() {
    let text = localStorage.getItem("loggedInUser");
    let Json = JSON.parse(text);
    User.push(Json);
}

// put the Firstletter of the Username to the Profile-Picture

function putName() {
    let firstLetter = User[0].name.charAt(0).toUpperCase();
    document.getElementById('user').innerHTML = `${firstLetter}`;
}