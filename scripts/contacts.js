
let Contacts = [];
let x = 0;

// is a onloadFunction it load's the functions that are needed to load at the beginning /*

async function Init() {
    await getItemsFromFirebase();
    renderContactsListHTML();
}

//  onclick to a Contact its loading it with an animation and the contact in the Contactlist gets a background-color,
// if the screen width is smaller than 1050 px then it separates the contact list and the contact

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

// it hides the Contact and shows again the Contactlist /*

function hideContactMobile(event) {
    event.stopPropagation();
    if (window.innerWidth < 1050) {
        document.getElementById('Contacts').style = "";
        document.getElementById('headline-contact').classList.add("d-none3");
    }
    hideContact();
}

// it hides the Contact and removes the background-color of the Contact in the Contactlist

function hideContact() {
    document.getElementById('all-information').classList.remove('animationRightToPosition');
    document.getElementById('all-information').classList.add('d-none');
    for (let i = 0; i < Contacts.length; i++) {
        document.getElementById(`Contact${i}`).style = "";
        document.getElementById(`name${i}`).style = '';
    }
}

// onclick to the Add New Contact-button it loads the template and it comes with an animation

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

// it hides the Add New Contact Template

function hideAddNewContact(event) {
    event.stopPropagation();
    document.getElementById('addNewContact').classList.remove('animationRightToPosition');
    document.getElementById('addNewContact').classList.add('d-none');
    document.getElementById('headlineAddContactP').style = "";
    document.getElementById('input-name').value = ``;
    document.getElementById('input-email').value = ``;
    document.getElementById('input-phone').value = ``;
}

// stops event bubbling

function stopPropagation(event) {
    event.stopPropagation();
}

// shows the edit delete menu in the mobile version

function showEditDeleteMenu(event) {
    event.stopPropagation();
    document.getElementById('editdelete-menu').classList.remove('d-none');
    document.getElementById('editdelete-menu').classList.add('animationRightToPosition');
}

// hides the edit delete menu in the mobile version

function hideEditDeleteMenu(event) {
    event.stopPropagation();
    document.getElementById('editdelete-menu').classList.add('d-none');
    document.getElementById('editdelete-menu').classList.remove('animationRightToPosition');
}

// generates the whole alphabet

function generateAlphabet() {
    let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return a
}

// render the Contactlist with the whole alphabet

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

// checks if the First Letter of the name matches with the letter, if yes then its generate the Badge and loads a function named generateContactHTML
// a the end its clears the empty Div's

function renderContact() {
    let a = generateAlphabet();
    if (Contacts == 0) {
        clearEmptyDivs(a);
    } else {
        let firstLetter = Contacts[x].name.charAt(0).toUpperCase();
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

// generates the Contacts in the Contactlist if its finished with the array it goes back to the renderContact function

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

// generates the Badge with the Firstletter of the first and last Name

function generateBadge(x) {
    var values = Contacts[x].name.split(" ");
    var f_name = values.shift().charAt(0).toUpperCase();
    var l_name = values.join(' ').charAt(0).toUpperCase();
    return f_name + l_name;
}

// checks if the letter divs are empty, if so then it hides it

function clearEmptyDivs(a) {
    for (let i = 0; i < a.length; i++) {
        let Div = document.getElementById(`${a[i]}`).innerHTML;
        if (Div == "") {
            document.getElementById(`Section${i}`).style = "display:none;"
        }
    }
    hideContact();
}

// renders the template of the contact information

function renderContactInformation(i) {
    let Badge = generateBadge(i);
    document.getElementById('Profile-Badge1').innerHTML = `${Badge}`;
    document.getElementById('editdelete-name').innerHTML = `${Contacts[i].name}`
    document.getElementById('email').innerHTML = `${Contacts[i].email}`;
    document.getElementById('phone').innerHTML = `${Contacts[i].phone}`;
    document.getElementById('editContact').setAttribute(`onclick`, `loadEditContact(event, ${i})`)
    document.getElementById('editContactMobile').setAttribute(`onclick`, `loadEditContact(event, ${i})`)
    document.getElementById('deleteContact').setAttribute(`onclick`, `deleteContact(${i})`)
    document.getElementById('deleteContactMobile').setAttribute(`onclick`, `deleteContact(${i})`)
}

// deletes the Contact but at least one Contact is always required

async function deleteContact(i) {
    if (Contacts.length > 1) {
        Contacts.splice(i, 1);
        loadContactsAgain();
        hideAddNewContact(event);
        hideContactMobile(event);
        await deleteContactfromFirebase(i);
        await getTheItemstoPushTOFireBase();
    } else {
        alert("You Need To Have at least One Contact");
    }
}

// loads the edit contact

function loadEditContact(event, i) {
    let Badge = generateBadge(i);
    event.stopPropagation();
    generateEditNewContactHTML(Badge, i);
    document.getElementById('saveEditContact').setAttribute(`onclick`, `saveNewContact(${i})`);
}

// loads the Template of edit new contact with an animation

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

// gets the values of the Contact Information and checks if the the values are empty or filled and gives the information to the functions

function createNewContact(event) {
    event.stopPropagation();
    let name = document.getElementById('input-name').value
    let email = document.getElementById('input-email').value
    let phone = document.getElementById('input-phone').value
    if (name == ' ' || email == "" || phone == "") { alert('name, email or phone number not entered') } else {
        Contacts.push({ "name": `${name}`, "email": `${email}`, "phone": phone },);
        getTheItemstoPushTOFireBase();
        loadContactsAgain();
        hideAddNewContact(event);
        loadContact(Contacts.length - 1, event);
        animateContactCreated();
    }
}

// generates a Contact Created pop up after the contact was created and it lasts for 3 seconds then it goes

function animateContactCreated() {
    document.getElementById('ContactCreated').style = "";
    document.getElementById('ContactCreated').classList.add('animationRightToPosition');
    setTimeout(() => {
        document.getElementById('ContactCreated').style = "display:none;";
        document.getElementById('ContactCreated').classList.remove('animationRightToPosition');
    }, 3000);
}

// loads all Contacts in the Contactlist again from new

function loadContactsAgain() {
    let a = generateAlphabet();
    for (let i = 0; i < a.length; i++) {
        document.getElementById(`${a[i]}`).innerHTML = ``;
        document.getElementById(`Section${i}`).style = ``;
    }
    renderContact();
}

// saves the new contact that has been edited

function saveNewContact(i) {
    let name = document.getElementById('input-name').value
    let email = document.getElementById('input-email').value
    let phone = document.getElementById('input-phone').value
    Contacts[i].name = name;
    Contacts[i].email = email;
    Contacts[i].phone = phone;
    loadContactsAgain();
    hideAddNewContact(event);
    loadContact(i, event);
    getTheItemstoPushTOFireBase();
}

// pushes and getting the New Contact Array again ro and from Firebase after adding, editing or deleting a Contact

async function getTheItemstoPushTOFireBase() {
    let Useremail = User[0].email
    let result = Useremail.replace(".", "_");
    let Number = await getNumFromFirebase(`/users/${result}`,);
    pushToFireBase(`users/${result}/${Number}/Contacts`);
    Contacts = [];
    getItemsFromFirebase(`users/${result}/${Number}/Contacts`)
}

// get a random generated number from firebase because it cant connect to the array without it

async function getNumFromFirebase(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json");
    let json = await response.json();
    let num = Object.keys(json)[0];
    return num;
}

// pushes the updated Contacts Array to Firebase 

async function pushToFireBase(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Contacts)
    });
    return responseToJson = await response.json();
}

// get the Contacts array from Firebase and push it to the Contacts Array in the Website

async function getItemsFromFirebase() {
    let Useremail = User[0].email
    let result = Useremail.replace(".", "_");
    let Number = await getNumFromFirebase(`/users/${result}`);
    let path = `users/${result}/${Number}/Contacts/`
    let response = await fetch(BASE_URL + path + ".json");
    let json = await response.json();
    for (let i = 0; i < json.length; i++) {
        Contacts.push(json[i])
    }

}

// delete a Contact from Firebase

async function deleteContactfromFirebase(i) {
    let Useremail = User[0].email
    let result = Useremail.replace(".", "_");
    let Number = await getNumFromFirebase(`/users/${result}`);
    let path = `users/${result}/${Number}/Contacts/${i}`
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    return responseToJson = await response.json();
}