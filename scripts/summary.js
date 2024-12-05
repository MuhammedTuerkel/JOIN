let greeting;

function Init() {
    hideSubMenu();
}

function showSubmenu(event) {
    event.stopPropagation();
    document.getElementById('Submenu').style = "";
}

document.addEventListener("DOMContentLoaded", function () {
    let today = new Date();
    let hourNow = today.getHours();
    if (hourNow >= 0 && hourNow < 12) {
        greeting = "Good Morning"
    }
    else if (hourNow >= 12 && hourNow < 18) {
        greeting = "Good Afternoon"
    }
    else if (hourNow >= 18 && hourNow < 24) {
        greeting = "Good Evening"
    }
    document.getElementById('greeting').innerHTML = greeting;
});

function stopEventBubbling(event) {
    event.stopPropagation();
}

function hideSubMenu() {
    document.getElementById('Submenu').style = "display:none;"
}