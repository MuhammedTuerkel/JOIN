let Contacts = [
    { "name": "Anton Mayer", "email": "antonm@gmail.com", "phone":"+49 152322221" },
    { "name": "Anja Schulz", "email": "schulz@hotmail.com", "phone":"+49 152322222" },
    { "name": "Benedikt Ziegler", "email": "benedikt@gmail.com", "phone":"+49 152322223" },
    { "name": "David Eisenberg", "email": "davidberg@gmail.com", "phone":"+49 152322224" },
    { "name": "Eva Fischer", "email": "eva@gmail.com", "phone":"+49 152322225" },
    { "name": "Emmanuel Mauer", "email": "emmanuelma@gmail.com", "phone":"+49 152322226" },
    { "name": "Marcel Bauer", "email": "bauer@gmail.com", "phone":"+49 152322227" },
    { "name": "Tatjana Wolf", "email": "wolf@gmail.com", "phone":"+49 152322228" },
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
    renderContact(alphabet);
}
let x = 0

function renderContact(a) {
    let firstLetter = Contacts[x].name.charAt(0);
    for (let i = 0; i < a.length; i++) {
        if (firstLetter == a[i]) {
            let Badge = generateBadge(x);
            generateContactHTML(a, i, Badge);
        }
    }
    clearEmptyDivs(a);
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
}

function renderContactInformation(i) {
    let Badge = generateBadge(i);
    document.getElementById('Profile-Badge1').innerHTML = `${Badge}`;
    document.getElementById('editdelete-name').innerHTML = `${Contacts[i].name}`
    document.getElementById('email').innerHTML = `${Contacts[i].email}`;
    document.getElementById('phone').innerHTML = `${Contacts[i].phone}`;
}