let Contacts = [
    { "name": "Anton Mayer", "email": "antonm@gmail.com" },
    { "name": "Anja Schulz", "email": "schulz@hotmail.com" },
    { "name": "Benedikt Ziegler", "email": "benedikt@gmail.com" },
    { "name": "David Eisenberg", "email": "davidberg@gmail.com" },
    { "name": "Eva Fischer", "email": "eva@gmail.com" },
    { "name": "Emmanuel Mauer", "email": "emmanuelma@gmail.com" },
    { "name": "Marcel Bauer", "email": "bauer@gmail.com" },
    { "name": "Tatjana Wolf", "email": "wolf@gmail.com" },
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
    for (let i = 0; i < 1; i++) {
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
            let Badge = generateBadge();   
            generateContactHTML(a , i, Badge);
        }
    }
    clearEmptyDivs(a);
}

function generateContactHTML(a ,i, Badge){
    document.getElementById(`${a[i]}`).innerHTML += `
    <div id="Contact${x}" onclick="loadContact(0, event)" class="Contact"><div class="Profile-Badge">
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

 function generateBadge(){
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
    var values = Contacts[0].name.split(" ");
    var f_name = values.shift().charAt(0);
    var l_name = values.join(' ').charAt(0);
 let Badge = f_name + l_name;
    console.log(Badge);
    
    
}