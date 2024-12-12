let greeting;

let User = [];

function Init() {
    getFromLocalStorage();
    greetingOnMobile();
    onloadFunction();
    putName();
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

async function greetingOnMobile() {
    if (window.innerWidth < 1400) {
        document.getElementById('headline').style = "display:none;";
        document.getElementById('Tasks').style = "display:none;";
        document.getElementById('greeting-top').classList.remove('d-none');

        setTimeout(() => {
            document.getElementById('greeting-top').classList.add('d-none');

            document.getElementById('headline').style = "";
            document.getElementById('Tasks').style = "";
        }, 3000);
    }
}

function getFromLocalStorage() {
    let text = localStorage.getItem("loggedInUser");
    let Json = JSON.parse(text);
    User.push(Json);
}

function putName() {
    let name = String(User[0].name).charAt(0).toUpperCase() + String(User[0].name).slice(1);
    document.getElementById('name').innerHTML = `${name}`;
    let firstLetter = User[0].name.charAt(0).toUpperCase();
    document.getElementById('user').innerHTML = `${firstLetter}`;
}
