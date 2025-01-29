let x = 0;
let i = 0;

/**
 * Is a onload-function it loads the functions that are needed to load at the beginning
 */
async function Init() {
  renderContactsListHTML();
}

/**
 * Onclick to a contact its loading it with an animation and the contact in the contactlist gets a background-color,
 * if the screen width is smaller than 1050px then it separates the contact list and the contact
 * @param {*} i
 * @param {event} event
 */
function loadContact(i, event) {
  document.getElementById("body").classList.add("over-hidden");
  event.stopPropagation();
  if (window.innerWidth < 1050) {
    document.getElementById("Contacts").style = "display:none;";
    document.getElementById("headline-contact").classList.remove("d-none3");
  }
  hideContact(i);
  renderContactInformation(i);
  setTimeout(() => {
    waitForAnimation(i);
  }, 100);
  setTimeout(() => {
    document.getElementById("body").classList.remove("over-hidden");
  }, 500);
}

/**
 * gives the choosen contact the background color and shows the contact information
 * @param {} i
 */
function waitForAnimation(i) {
  document.getElementById(`Contact${i}`).style = "background-color: #2A3647;";
  document.getElementById(`name${i}`).style = "color:white;";
  document.getElementById("all-information").classList.add("animationRightToPosition");
  document.getElementById("all-information").classList.remove("d-none");
}

/**
 * It hides the contact and shows again the contact list
 * @param {event} event
 */
function hideContactMobile(event) {
  event.stopPropagation();
  if (window.innerWidth < 1050) {
    document.getElementById("Contacts").style = "";
    document.getElementById("headline-contact").classList.add("d-none3");
  }
  hideContact(i);
}

/**
 * It hides the contact and removes the background color of the contact in the contactlist
 */
function hideContact(i) {
  document.getElementById("all-information").classList.remove("animationRightToPosition");
  document.getElementById("all-information").classList.add("d-none");
  if (contacts && contacts.length) {
    for (let i = 0; i < contacts.length; i++) {
      const contactElement = document.getElementById(`Contact${i}`);
      const nameElement = document.getElementById(`name${i}`);
      if (contactElement) contactElement.style = "";
      if (nameElement) nameElement.style = "";
    }
  }
}

/**
 * Onclick to the add new contact-button it loads the template and it comes with an animation
 * @param {event} event
 */
function loadAddNewContact(event) {
  document.getElementById("body").classList.add("over-hidden");
  event.stopPropagation();
  document.getElementById("addNewContact").classList.add("animationRightToPosition");
  document.getElementById("addNewContact").classList.remove("d-none");
  document.getElementById("headlineAddContacth2").innerHTML = `Add contact`;
  document.getElementById("addContactProfilePicture").style = "background-image: url(./assets/img/person-white.png);";
  document.getElementById("addContactProfilePicture").innerHTML = ``;
  document.getElementById("cancelCreate").style = "";
  document.getElementById("deleteSave").style = "display:none;";
  setTimeout(() => {
    document.getElementById("body").classList.remove("over-hidden");
  }, 500);
  openContactForm();
}

/**
 * It hides the add new contact template
 * @param {event} event
 */
function hideAddNewContact(event) {
  event.stopPropagation();
  document.getElementById("addNewContact").classList.remove("animationRightToPosition");
  document.getElementById("addNewContact").classList.add("d-none");
  document.getElementById("headlineAddContactP").style = "";
  document.getElementById("input-name").value = ``;
  document.getElementById("input-email").value = ``;
  document.getElementById("input-phone").value = ``;
  document.getElementById("ContactsList").style.overflow = "scroll";
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
  document.getElementById("body").classList.add("over-hidden");
  event.stopPropagation();
  document.getElementById("editdelete-menu").classList.remove("d-none");
  document.getElementById("editdelete-menu").classList.add("animationRightToPosition");
  setTimeout(() => {
    document.getElementById("body").classList.remove("over-hidden");
  }, 500);
}

/**
 * Hides the edit delete menu in the mobile version
 * @param {event} event
 */
function hideEditDeleteMenu(event) {
  event.stopPropagation();
  document.getElementById("editdelete-menu").classList.add("d-none");
  document.getElementById("editdelete-menu").classList.remove("animationRightToPosition");
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
 * Generates the contacts in the contactlist if its finished with the array it goes back to the renderContact function
 * @param {*} a
 */
function generateContactHTML(a, i, Badge) {
  if (!contacts || contacts.length === 0) {
    console.warn("Contacts array is undefined or empty");
    return;
  }
  const contact = contacts[x];
  if (!contact || !contact.color || !contact.name || !contact.email) {
    console.warn(`Invalid contact data at index ${x}`);
    return;
  }
  document.getElementById(`${a[i]}`).innerHTML += `
    <div id="Contact${x}" onclick="loadContact(${x}, event)" class="Contact">
      <div class="Profile-Badge" style="background-color: ${contact.color};">
        <h4>${Badge}</h4>
      </div>
      <div class="name-email">
        <h2 id="name${x}">${contact.name}</h2>
        <h3>${contact.email}</h3>
      </div>
    </div>
  `;
  x++;
  if (x < contacts.length) {
    renderContact(a);
  }
}

function generateBadge(x) {
  if (!contacts[x] || !contacts[x].name) {
    return "N/A";
  }
  let values = contacts[x].name.split(" ");
  let f_name = values.shift().charAt(0).toUpperCase();
  let l_name = values.join(" ").charAt(0).toUpperCase();
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
 * Deletes the contact but at least one contact is always required
 * @param {int} i
 */
function deleteContact(i) {
  hideAddNewContact(event);
  hideContactMobile(event);
  deleteContactFromLocalStorage(i);
  updateContactsDisplay();
  updateTasksAfterContactDeletion(i);
}

/**
 * step between contact deletion and updating tasks
 */
function updateContactsDisplay() {
  renderContactsListHTML();
}

/**
 * Loads the edit contact
 * @param {int} i
 */
function loadEditContact(event, i) {
  document.getElementById("body").classList.add("over-hidden");
  if (i >= 0 && i < contacts.length) {
    let Badge = generateBadge(i);
    event.stopPropagation();
    generateEditNewContactHTML(Badge, i);
    document.getElementById("saveEditContact").setAttribute(`onclick`, `saveNewContact(${i})`);
  } else {
    console.warn(`Invalid index ${i} for Contacts array`);
  }
  setTimeout(() => {
    document.getElementById("body").classList.remove("over-hidden");
  }, 500);
}

/**
 * Loads the template of edit new contact with an animation
 * @param {int} i
 */
function generateEditNewContactHTML(Badge, i) {
  document.getElementById("addNewContact").classList.add("animationRightToPosition");
  document.getElementById("addNewContact").classList.remove("d-none");
  document.getElementById("headlineAddContacth2").innerHTML = `Edit contact`;
  document.getElementById("headlineAddContactP").style = "display:none;";
  document.getElementById("addContactProfilePicture").style = "";
  document.getElementById("addContactProfilePicture").style.backgroundColor = contacts[i].color;
  document.getElementById("addContactProfilePicture").innerHTML = `<h2>${Badge}</h2>`;
  document.getElementById("input-name").value = `${contacts[i].name}`;
  document.getElementById("input-email").value = `${contacts[i].email}`;
  document.getElementById("input-phone").value = `${contacts[i].phone}`;
  document.getElementById("deleteSave").style = "";
  document.getElementById("cancelCreate").style = "display:none;";
  document.getElementById("DeleteEditContact").setAttribute(`onclick`, `deleteContact(${i})`);
}

/**
 * Gets the values of the contact information and checks if the values are empty or filled and gives the information to the functions
 * @param {event} event
 */
function createNewContact(event) {
  event.preventDefault();
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  const color = createRandomColor();
  const newContact = {
    name: name,
    email: email,
    phone: phone,
    color: color,
    createdAt: new Date().toISOString(),
  };
  contacts.push(newContact);
  saveNewContacttoLocalStorage(newContact);
  hideAddNewContact(event);
  animateContactCreated();
  renderContactsListHTML();
  document.getElementById("ContactsList").style.overflow = "scroll";
}

/**
 * pushes the new contact to the local storage
 */
function saveNewContacttoLocalStorage(newContact) {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(newContact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

/**
 * Render the contactlist with the whole alphabet
 */
function renderContactsListHTMLAgain() {
  document.getElementById("ContactsList").innerHTML = "";
  let alphabet = generateAlphabet();
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
  renderContacts();
}

/**
 * Generates a contact created pop up after the contact was created and it lasts for three seconds then it vanishes
 */
function animateContactCreated() {
  document.getElementById("ContactCreated").style = "";
  document.getElementById("ContactCreated").classList.add("animationRightToPosition");
  setTimeout(() => {
    document.getElementById("ContactCreated").style = "display:none;";
    document.getElementById("ContactCreated").classList.remove("animationRightToPosition");
  }, 3000);
}

/**
 * Saves the new contact that has been edited
 * @param {int} i
 */
function saveNewContact(i) {
  let contactContainer = document.getElementsByClassName("Contact");
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  if (contacts[i]) {
    contacts[i].name = name;
    contacts[i].email = email;
    contacts[i].phone = phone;
  } else {
    console.warn(`No contact found at index ${i}`);
    return;
  }
  while (contactContainer.length > 0) {
    contactContainer[0].parentNode.removeChild(contactContainer[0]);
  }
  renderContactsListHTMLAgain();
  hideAddNewContact(event);
  getTheItemstoPushTOFireBase();
  loadContactEdit(i);
}

/**
 * Onclick to a contact its loading it with an animation and the contact in the contactlist gets a background-color,
 * if the screen width is smaller than 1050px then it separates the contact list and the contact
 * @param {*} i
 * @param {event} event
 */
function loadContactEdit(i) {
  document.getElementById("body").classList.add("over-hidden");
  if (window.innerWidth < 1050) {
    document.getElementById("Contacts").style = "display:none;";
    document.getElementById("headline-contact").classList.remove("d-none3");
  }
  hideContact(i);
  renderContactInformation(i);
  setTimeout(() => {
    waitForAnimation(i);
  }, 100);
  setTimeout(() => {
    document.getElementById("body").classList.remove("over-hidden");
  }, 500);
}

/**
 * Fetches the current state of Contacts array and initializes it if it is undefined or not an array.
 */
function getTheItemstoPushTOFireBase() {
  pushContactsToLocalStorage();
}

/**
 * Get contacts-array from wherever you store it and push it to the contacts-array on the website
 */
function getItemsFromFirebase() {
  getContactsFromLocalStorage();
}

/**
 * Aktualisiert den globalen Contacts-Array
 * @returns {array} Aktualisierter Contacts-Array
 */
function pushToFireBase() {
  pushContactsToLocalStorage();
}

/**
 * Deletes a contact from the global Contacts array
 * @param {int} i - The index of the contact to be deleted
 * @returns {array} - Updated Contacts array
 */
function deleteContactfromFirebase(i) {
  deleteContactFromLocalStorage(i);
}
