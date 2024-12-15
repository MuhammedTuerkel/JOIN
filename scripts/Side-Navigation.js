let User = [];

function sideNavigation() {
    getFromLocalStorage();
    putName();
}

function showSubmenu(event) {
    event.stopPropagation();
    document.getElementById('Submenu').style = "";
}

function stopEventBubbling(event) {
    event.stopPropagation();
}

function hideSubMenu() {
    document.getElementById('Submenu').style = "display:none;"
}

function getFromLocalStorage() {
    let text = localStorage.getItem("loggedInUser");
    let Json = JSON.parse(text);
    User.push(Json);
}

function putName() {
    let firstLetter = User[0].name.charAt(0).toUpperCase();
    document.getElementById('user').innerHTML = `${firstLetter}`;
}