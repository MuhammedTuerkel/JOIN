let x = 0;
let i = 0;

/**
 * Is a onload-function it loads the functions that are needed to load at the beginning
 */
async function Init() {
  pushContactsToLocalStorage();
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
  hideContact(i);
  renderContactInformation(i);
  setTimeout(() => {
    document.getElementById(`Contact${i}`).style = "background-color: #2A3647;";
    document.getElementById(`name${i}`).style = "color:white;";
    document.getElementById("all-information").classList.add("animationRightToPosition");
    document.getElementById("all-information").classList.remove("d-none");
  }, 100);
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
  hideContact();
}

/**
 * It hides the contact and removes the background color of the contact in the contactlist
 */
function hideContact() {
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
  event.stopPropagation();
  document.getElementById("addNewContact").classList.add("animationRightToPosition");
  document.getElementById("addNewContact").classList.remove("d-none");
  document.getElementById("headlineAddContacth2").innerHTML = `Add contact`;
  document.getElementById("addContactProfilePicture").style = "background-image: url(../assets/img/person-white.png);";
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
  document.getElementById("addNewContact").classList.remove("animationRightToPosition");
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
  document.getElementById("editdelete-menu").classList.add("animationRightToPosition");
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
 * @param {*} i
 * @param {*} Badge
 */
function generateContactHTML(a, i, Badge) {
  // Vergewissere dich, dass der Contacts-Array und die benötigten Daten vorhanden sind
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
    console.warn(`Contact with index ${x} not found or name is undefined`);
    return "N/A"; // returning N/A to handle error cases
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
  deleteContactfromFirebase(i);
  hideAddNewContact(event);
  hideContactMobile(event);
  getTheItemstoPushTOFireBase();
  renderContactsListHTMLAgain();
}

/**
 * Loads the edit contact
 * @param {event} event
 * @param {int} i
 */
function loadEditContact(event, i) {
  if (i >= 0 && i < contacts.length) {
    let Badge = generateBadge(i);
    event.stopPropagation();
    generateEditNewContactHTML(Badge, i);
    document.getElementById("saveEditContact").setAttribute(`onclick`, `saveNewContact(${i})`);
  } else {
    console.warn(`Invalid index ${i} for Contacts array`);
  }
}

/**
 * Loads the template of edit new contact with an animation
 * @param {object} Badge
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
  event.stopPropagation();
  let contactContainer = document.getElementsByClassName("Contact");
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  const color = createRandomColor();

  if (name.trim() == "" || email.trim() == "" || phone.trim() == "") {
    alert("Name, email, or phone number not entered");
  } else {
    contacts.push({
      name: name,
      email: email,
      phone: phone,
      color: color,
      createdAt: new Date().toISOString(),
    });
    pushContactsToLocalStorage();
    while (contactContainer.length > 0) {
      contactContainer[0].parentNode.removeChild(contactContainer[0]);
    }
    hideAddNewContact(event);
    animateContactCreated();
    renderContactsListHTMLAgain();
  }
}

/**
 * Render the contactlist with the whole alphabet
 */
async function renderContactsListHTMLAgain() {
  document.getElementById("ContactsList").innerHTML = "";
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
 * Loads and renders the updated contacts list.
 */
function loadContactsAgain() {
  if (!contacts || contacts.length === 0) {
    console.warn("Contacts array is undefined or empty");
  } else {
    renderContact();
  }
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
