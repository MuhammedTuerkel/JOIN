let Contacts = [
    { "name": "Anton Mayer", "email": "antonm@gmail.com", "phone": +49152322221 },
    { "name": "Anja Schulz", "email": "schulz@hotmail.com", "phone": +49152322222 },
    { "name": "Benedikt Ziegler", "email": "benedikt@gmail.com", "phone": +49152322223 },
    { "name": "David Eisenberg", "email": "davidberg@gmail.com", "phone": +49152322224 },
    { "name": "Eva Fischer", "email": "eva@gmail.com", "phone": +49152322225 },
    { "name": "Emmanuel Mauer", "email": "emmanuelma@gmail.com", "phone": +49152322226 },
    { "name": "Marcel Bauer", "email": "bauer@gmail.com", "phone": +49152322227 },
    { "name": "Tatjana Wolf", "email": "wolf@gmail.com", "phone": +49152322228 },
]

function Init() {
    renderContactsListHTML();
}

function loadContact(i, event) {
    event.stopPropagation();
    if (window.innerWidth < 1050) {
        document.getElementById('Contacts').style = "display:none;"
        document.getElementById('headline-contact').classList.remove("d-none3");
    }
    hideContact();
    renderContactInformation(i);
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
    for (let i = 0; i < Contacts.length; i++) {
        document.getElementById(`Contact${i}`).style = "";
        document.getElementById(`name${i}`).style = '';
    }
}

function loadAddNewContact(event) {
    event.stopPropagation();
    document.getElementById('addNewContact').classList.add('animationRightToPosition');
    document.getElementById('addNewContact').classList.remove('d-none');
    document.getElementById('headlineAddContacth2').innerHTML = `Add contact`;
    document.getElementById('addContactProfilePicture').style = "background-image: url(../assets/img/person-white.png);"
    document.getElementById('addContactProfilePicture').innerHTML = ``;
    document.getElementById('cancelCreate').style = "";
    document.getElementById('deleteSave').style = "display:none;";
}

function hideAddNewContact(event) {
    event.stopPropagation();
    document.getElementById('addNewContact').classList.remove('animationRightToPosition');
    document.getElementById('addNewContact').classList.add('d-none');
    document.getElementById('headlineAddContactP').style = "";
    document.getElementById('input-name').value = ``;
    document.getElementById('input-email').value = ``;
    document.getElementById('input-phone').value = ``;
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

function generateAlphabet() {
    let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return a
}

async function renderContactsListHTML() {
    let alphabet = await generateAlphabet();
    for (let i = 0; i < alphabet.length; i++) {
        document.getElementById('ContactsList').innerHTML += `
        <div id="Section${i}" class="letterSections"> 
    <div class="lettersbox">
                        <h3>${alphabet[i]}</h3>
                    </div>
                    <div class="line"></div>
                    <div id="${alphabet[i]}"></div>
                    </div>
                    `;
    }
    renderContact();
}
let x = 0

function renderContact() {
    let a = generateAlphabet();
    if (Contacts == 0) {
        clearEmptyDivs(a);
    } else {
        let firstLetter = Contacts[x].name.charAt(0);
        for (let i = 0; i < a.length; i++) {
            if (firstLetter == a[i]) {
                let Badge = generateBadge(x);
                generateContactHTML(a, i, Badge);
            }
        }
        x = 0;
        clearEmptyDivs(a);
    }
}

function generateContactHTML(a, i, Badge) {
    document.getElementById(`${a[i]}`).innerHTML += `
    <div id="Contact${x}" onclick="loadContact(${x}, event)" class="Contact"><div class="Profile-Badge">
                        <h4>${Badge}</h4>
                    </div>
                    <div class="name-email">
                        <h2 id="name${x}">${Contacts[x].name}</h2>
                        <h3>${Contacts[x].email}</h3>
                    </div>
                </div>
                </div>
                `;
    x++;
    if (x < Contacts.length) {
        renderContact(a);
    }
}

function generateBadge(x) {
    var values = Contacts[x].name.split(" ");
    var f_name = values.shift().charAt(0);
    var l_name = values.join(' ').charAt(0);
    return f_name + l_name;
}

function clearEmptyDivs(a) {
    for (let i = 0; i < a.length; i++) {
        let Hallo = document.getElementById(`${a[i]}`).innerHTML;
        if (Hallo == "") {
            document.getElementById(`Section${i}`).style = "display:none;"
        }
    }
    hideContact();
}

function renderContactInformation(i) {
    let Badge = generateBadge(i);
    document.getElementById('Profile-Badge1').innerHTML = `${Badge}`;
    document.getElementById('editdelete-name').innerHTML = `${Contacts[i].name}`
    document.getElementById('email').innerHTML = `${Contacts[i].email}`;
    document.getElementById('phone').innerHTML = `${Contacts[i].phone}`;
    document.getElementById('editContact').setAttribute(`onclick`, `loadEditContact(event, ${i})`)
    document.getElementById('editContact1').setAttribute(`onclick`, `loadEditContact(event, ${i})`)
    document.getElementById('deleteContact').setAttribute(`onclick`, `deleteContact(${i})`)
    document.getElementById('deleteContact1').setAttribute(`onclick`, `deleteContact(${i})`)
}

function deleteContact(i) {
    Contacts.splice(i, 1);
    loadContactsAgain();
    hideAddNewContact(event);
    hideContactMobile(event);
}

function loadEditContact(event, i) {
    let Badge = generateBadge(i);
    event.stopPropagation();
    generateEditNewContactHTML(Badge, i);
}

function generateEditNewContactHTML(Badge, i) {
    document.getElementById('addNewContact').classList.add('animationRightToPosition');
    document.getElementById('addNewContact').classList.remove('d-none');
    document.getElementById('headlineAddContacth2').innerHTML = `Edit contact`;
    document.getElementById('headlineAddContactP').style = "display:none;"
    document.getElementById('addContactProfilePicture').style = "background:orange;"
    document.getElementById('addContactProfilePicture').innerHTML = `<h2>${Badge}</h2>`;
    document.getElementById('input-name').value = `${Contacts[i].name}`;
    document.getElementById('input-email').value = `${Contacts[i].email}`;
    document.getElementById('input-phone').value = `${Contacts[i].phone}`;
    document.getElementById('deleteSave').style = "";
    document.getElementById('cancelCreate').style = "display:none;";
    document.getElementById('DeleteEditContact').setAttribute(`onclick`, `deleteContact(${i})`)
}
function createNewContact(event) {
    event.stopPropagation();
    let name = document.getElementById('input-name').value
    let email = document.getElementById('input-email').value
    let phone = document.getElementById('input-phone').value
    Contacts.push({ "name": `${name}`, "email": `${email}`, "phone": phone });
    loadContactsAgain();
    hideAddNewContact(event);
    loadContact(Contacts.length - 1, event)
    animateContactCreated();
}

function animateContactCreated() {
    document.getElementById('ContactCreated').style = "";
    document.getElementById('ContactCreated').classList.add('animationRightToPosition');
    setTimeout(() => {
        document.getElementById('ContactCreated').style = "display:none;";
        document.getElementById('ContactCreated').classList.remove('animationRightToPosition');
    }, 3000);
}

function loadContactsAgain() {
    let a = generateAlphabet();
    for (let i = 0; i < a.length; i++) {
        document.getElementById(`${a[i]}`).innerHTML = ``;
    }
    renderContact();
}