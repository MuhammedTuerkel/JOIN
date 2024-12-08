let greeting;

function Init() {
    greetingOnMobile();
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