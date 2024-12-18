let Contacts = [
    [
        { "name": "Anton Mayer", "email": "antonm@gmail.com" },
        { "name": "Anja Schulz", "email": "schulz@hotmail.com" }
    ],
    [
        {"name": "Benedikt Ziegler", "email": "benedikt@gmail.com"}
    ],
    [],
    [
        {"name": "David Eisenberg", "email": "davidberg@gmail.com"}
    ],
    [
        {"name": "Eva Fischer", "email": "eva@gmail.com"},
        {"name": "Emmanuel Mauer", "email": "emmanuelma@gmail.com"}
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [
        {"name": "Marcel Bauer", "email": "bauer@gmail.com"}
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [
        {"name": "Tatjana Wolf", "email": "wolf@gmail.com"}
    ],
    [],
    [],
    [],
    [],
    [],
    [],
]

function loadContact(i, event) {
    event.stopPropagation();
    if (window.innerWidth < 1050) {
        document.getElementById('Contacts').style = "display:none;"
        document.getElementById('headline-contact').classList.remove("d-none3");
    }
    hideContact();
    setTimeout(() => {
        document.getElementById(`Contact${i}`).style = 'background-color: #2A3647;';
        document.getElementById(`name${i}`).style = 'color:white;';
        document.getElementById('all-information').classList.add('animationRightToPosition');
        document.getElementById('all-information').classList.remove('d-none');
    }, 100);
}

function hideContactMobile(event) {
    event.stopPropagation();
    if (window.innerWidth < 1050) {
        document.getElementById('Contacts').style = "";
        document.getElementById('headline-contact').classList.add("d-none3");
    }
    hideContact();
}

function hideContact() {
    document.getElementById('all-information').classList.remove('animationRightToPosition');
    document.getElementById('all-information').classList.add('d-none');
    for (let i = 0; i < 8; i++) {
        document.getElementById(`Contact${i}`).style = "";
        document.getElementById(`name${i}`).style = '';
    }
}

function loadAddNewContact(event) {
    event.stopPropagation();
    document.getElementById('addNewContact').classList.add('animationRightToPosition');
    document.getElementById('addNewContact').classList.remove('d-none');
}

function hideAddNewContact(event) {
    event.stopPropagation();
    document.getElementById('addNewContact').classList.remove('animationRightToPosition');
    document.getElementById('addNewContact').classList.add('d-none');
}

function stopPropagation(event) {
    event.stopPropagation();
}

function showEditDeleteMenu(event) {
    event.stopPropagation();
    document.getElementById('editdelete-menu').classList.remove('d-none');
    document.getElementById('editdelete-menu').classList.add('animationRightToPosition');
}

function hideEditDeleteMenu(event) {
    event.stopPropagation();
    document.getElementById('editdelete-menu').classList.add('d-none');
    document.getElementById('editdelete-menu').classList.remove('animationRightToPosition');
}