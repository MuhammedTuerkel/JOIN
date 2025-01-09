let Contacts = [];
let x = 0;

/**
 * Is a onload-function it loads the functions that are needed to load at the beginning
 */
async function Init() {
  await getItemsFromFirebase();
  renderContactsListHTML();
}

/**
 * Onclick to a contact its loading it with an animation and the contact in the contactlist gets a background-color,
 * if the screen width is smaller than 1050px then it separates the contact list and the contact
 * @param {*} i
 * @param {event} event
 */
function loadContact(i, event) {
  event.stopPropagation();
  if (window.innerWidth < 1050) {
    document.getElementById("Contacts").style = "display:none;";
    document.getElementById("headline-contact").classList.remove("d-none3");
  }
  hideContact();
  renderContactInformation(i);
  setTimeout(() => {
    document.getElementById(`Contact${i}`).style = "background-color: #2A3647;";
    document.getElementById(`name${i}`).style = "color:white;";
    document
      .getElementById("all-information")
      .classList.add("animationRightToPosition");
    document.getElementById("all-information").classList.remove("d-none");
  }, 100);
}

/**
 * It hides the contact and shows again the contactlist
 * @param {event} event
 */
function hideContactMobile(event) {
  event.stopPropagation();
  if (window.innerWidth < 1050) {
    document.getElementById("Contacts").style = "";
    document.getElementById("headline-contact").classList.add("d-none3");
  }
  hideContact();
}

/**
 * It hides the contact and removes the background color of the contact in the contactlist
 */
function hideContact() {
  document
    .getElementById("all-information")
    .classList.remove("animationRightToPosition");
  document.getElementById("all-information").classList.add("d-none");
  for (let i = 0; i < Contacts.length; i++) {
    document.getElementById(`Contact${i}`).style = "";
    document.getElementById(`name${i}`).style = "";
  }
}

/**
 * Onclick to the add new contact-button it loads the template and it comes with an animation
 * @param {event} event
 */
function loadAddNewContact(event) {
  event.stopPropagation();
  document
    .getElementById("addNewContact")
    .classList.add("animationRightToPosition");
  document.getElementById("addNewContact").classList.remove("d-none");
  document.getElementById("headlineAddContacth2").innerHTML = `Add contact`;
  document.getElementById("addContactProfilePicture").style =
    "background-image: url(../assets/img/person-white.png);";
  document.getElementById("addContactProfilePicture").innerHTML = ``;
  document.getElementById("cancelCreate").style = "";
  document.getElementById("deleteSave").style = "display:none;";
}

/**
 * It hides the add new contact template
 * @param {event} event
 */
function hideAddNewContact(event) {
  event.stopPropagation();
  document
    .getElementById("addNewContact")
    .classList.remove("animationRightToPosition");
  document.getElementById("addNewContact").classList.add("d-none");
  document.getElementById("headlineAddContactP").style = "";
  document.getElementById("input-name").value = ``;
  document.getElementById("input-email").value = ``;
  document.getElementById("input-phone").value = ``;
}

/**
 * Stops event bubbling
 * @param {event} event
 */
function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Shows the edit delete menu in the mobile version
 * @param {event} event
 */
function showEditDeleteMenu(event) {
  event.stopPropagation();
  document.getElementById("editdelete-menu").classList.remove("d-none");
  document
    .getElementById("editdelete-menu")
    .classList.add("animationRightToPosition");
}

/**
 * Hides the edit delete menu in the mobile version
 * @param {event} event
 */
function hideEditDeleteMenu(event) {
  event.stopPropagation();
  document.getElementById("editdelete-menu").classList.add("d-none");
  document
    .getElementById("editdelete-menu")
    .classList.remove("animationRightToPosition");
}

/**
 * Generates the whole alphabet
 * @returns the alphabet
 */
function generateAlphabet() {
  let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return a;
}

/**
 * Render the contactlist with the whole alphabet
 */
async function renderContactsListHTML() {
  let alphabet = await generateAlphabet();
  for (let i = 0; i < alphabet.length; i++) {
    document.getElementById("ContactsList").innerHTML += `
        <div id="Section${i}" class="letterSections"> 
    <div class="lettersbox">
                        <h3>${alphabet[i]}</h3>
                    </div>
                    <div class="contact_line"></div>
                    <div id="${alphabet[i]}"></div>
                    </div>
                    `;
  }
  renderContact();
}

/**
 * Checks if the first letter of the name matches with the letter, if yes then it generates the badge and loads a function named generateContactHTML
 * at the end it clears the empty divs
 */
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

/**
 * Generates the contacts in the contactlist if its finished with the array it goes back to the renderContact function
 * @param {*} a
 * @param {*} i
 * @param {*} Badge
 */
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

/**
 * Generates the badge with the first letter of the first and last name
 * @param {*} x
 * @returns the initials
 */
function generateBadge(x) {
  var values = Contacts[x].name.split(" ");
  var f_name = values.shift().charAt(0).toUpperCase();
  var l_name = values.join(" ").charAt(0).toUpperCase();
  return f_name + l_name;
}

/**
 * Checks if the letter divs are empty, if so then it hides it
 * @param {*} a
 */
function clearEmptyDivs(a) {
  for (let i = 0; i < a.length; i++) {
    let Div = document.getElementById(`${a[i]}`).innerHTML;
    if (Div == "") {
      document.getElementById(`Section${i}`).style = "display:none;";
    }
  }
  hideContact();
}

/**
 * Renders the template of the contact information
 * @param {int} i
 */
function renderContactInformation(i) {
  let Badge = generateBadge(i);
  document.getElementById("Profile-Badge1").innerHTML = `${Badge}`;
  document.getElementById("editdelete-name").innerHTML = `${Contacts[i].name}`;
  document.getElementById("email").innerHTML = `${Contacts[i].email}`;
  document.getElementById("phone").innerHTML = `${Contacts[i].phone}`;
  document
    .getElementById("editContact")
    .setAttribute(`onclick`, `loadEditContact(event, ${i})`);
  document
    .getElementById("editContactMobile")
    .setAttribute(`onclick`, `loadEditContact(event, ${i})`);
  document
    .getElementById("deleteContact")
    .setAttribute(`onclick`, `deleteContact(${i})`);
  document
    .getElementById("deleteContactMobile")
    .setAttribute(`onclick`, `deleteContact(${i})`);
}

/**
 * Deletes the contact but at least one contact is always required
 * @param {int} i
 */
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

/**
 * Loads the edit contact
 * @param {event} event
 * @param {int} i
 */
function loadEditContact(event, i) {
  let Badge = generateBadge(i);
  event.stopPropagation();
  generateEditNewContactHTML(Badge, i);
  document
    .getElementById("saveEditContact")
    .setAttribute(`onclick`, `saveNewContact(${i})`);
}

/**
 * Loads the template of edit new contact with an animation
 * @param {object} Badge
 * @param {int} i
 */
function generateEditNewContactHTML(Badge, i) {
  document
    .getElementById("addNewContact")
    .classList.add("animationRightToPosition");
  document.getElementById("addNewContact").classList.remove("d-none");
  document.getElementById("headlineAddContacth2").innerHTML = `Edit contact`;
  document.getElementById("headlineAddContactP").style = "display:none;";
  document.getElementById("addContactProfilePicture").style =
    "background:orange;";
  document.getElementById(
    "addContactProfilePicture"
  ).innerHTML = `<h2>${Badge}</h2>`;
  document.getElementById("input-name").value = `${Contacts[i].name}`;
  document.getElementById("input-email").value = `${Contacts[i].email}`;
  document.getElementById("input-phone").value = `${Contacts[i].phone}`;
  document.getElementById("deleteSave").style = "";
  document.getElementById("cancelCreate").style = "display:none;";
  document
    .getElementById("DeleteEditContact")
    .setAttribute(`onclick`, `deleteContact(${i})`);
}

/**
 * Gets the values of the contact information and checks if the values are empty or filled and gives the information to the functions
 * @param {event} event
 */
function createNewContact(event) {
  event.stopPropagation();
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  if (name == " " || email == "" || phone == "") {
    alert("name, email or phone number not entered");
  } else {
    Contacts.push({ name: `${name}`, email: `${email}`, phone: phone });
    getTheItemstoPushTOFireBase();
    loadContactsAgain();
    hideAddNewContact(event);
    loadContact(Contacts.length - 1, event);
    animateContactCreated();
  }
}

/**
 * Generates a contact created pop up after the contact was created and it lasts for three seconds then it vanishes
 */
function animateContactCreated() {
  document.getElementById("ContactCreated").style = "";
  document
    .getElementById("ContactCreated")
    .classList.add("animationRightToPosition");
  setTimeout(() => {
    document.getElementById("ContactCreated").style = "display:none;";
    document
      .getElementById("ContactCreated")
      .classList.remove("animationRightToPosition");
  }, 3000);
}

/**
 * Loads all contacts in the contactlist again from new
 */
function loadContactsAgain() {
  let a = generateAlphabet();
  for (let i = 0; i < a.length; i++) {
    document.getElementById(`${a[i]}`).innerHTML = ``;
    document.getElementById(`Section${i}`).style = ``;
  }
  renderContact();
}

/**
 * Saves the new contact that has been edited
 * @param {int} i
 */
function saveNewContact(i) {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  Contacts[i].name = name;
  Contacts[i].email = email;
  Contacts[i].phone = phone;
  loadContactsAgain();
  hideAddNewContact(event);
  loadContact(i, event);
  getTheItemstoPushTOFireBase();
}

/**
 * Pushes and getting the new contact array again and from firebase after adding, editing or deleting a contact
 */
async function getTheItemstoPushTOFireBase() {
  let Useremail = User[0].email;
  let result = Useremail.replace(".", "_");
  let Number = await getNumFromFirebase(`/users/${result}`);
  pushToFireBase(`users/${result}/${Number}/Contacts`);
  Contacts = [];
  getItemsFromFirebase(`users/${result}/${Number}/Contacts`);
}

/**
 * Get a random generated number from firebase because it can't connect to the array without it
 * @param {string} path
 * @param {object} data
 * @returns a random generated number
 */
async function getNumFromFirebase(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json");
  let json = await response.json();
  let num = Object.keys(json)[0];
  return num;
}

/**
 * Pushes the updated contacts-array to firebase
 * @param {string} path
 * @returns a response
 */
async function pushToFireBase(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Contacts),
  });
  return (responseToJson = await response.json());
}

/**
 * Get the contacts-array from firebase and push it to the contacts-array in the website
 */
async function getItemsFromFirebase() {
  let Useremail = User[0].email;
  let result = Useremail.replace(".", "_");
  let Number = await getNumFromFirebase(`/users/${result}`);
  let path = `users/${result}/${Number}/Contacts/`;
  let response = await fetch(BASE_URL + path + ".json");
  let json = await response.json();
  for (let i = 0; i < json.length; i++) {
    Contacts.push(json[i]);
  }
}

/**
 * Delete a contact from firebase
 * @param {int} i
 * @returns a response
 */
async function deleteContactfromFirebase(i) {
  let Useremail = User[0].email;
  let result = Useremail.replace(".", "_");
  let Number = await getNumFromFirebase(`/users/${result}`);
  let path = `users/${result}/${Number}/Contacts/${i}`;
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  return (responseToJson = await response.json());
}
