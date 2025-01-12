/**
 * Is a onload-function it loads the functions that are needed to load at the beginning
 */
async function Init() {
  // await getItemsFromFirebase();
  renderContactsListHTML();
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
 * Gets the values of the contact information and checks if the values are empty or filled and gives the information to the functions
 * @param {event} event
 */
function createNewContact(event) {
  event.stopPropagation();
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  const color = createRandomColor();
  if (name == " " || email == "" || phone == "") {
    alert("name, email or phone number not entered");
  } else {
    Contacts.push({
      name: `${name}`,
      email: `${email}`,
      phone: phone,
      color: color,
    });
    getTheItemstoPushTOFireBase();
    loadContactsAgain();
    hideAddNewContact(event);
    loadContact(Contacts.length - 1, event);
    animateContactCreated();
  }
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
 * Generates the badge with the first letter of the first and last name
 * @param {*} x
 * @returns the initials
 */
function generateBadge(x) {
  let values = Contacts[x].name.split(" ");
  let f_name = values.shift().charAt(0).toUpperCase();
  let l_name = values.join(" ").charAt(0).toUpperCase();
  return f_name + l_name;
}

/**
 * It hides the contact and removes the background color of the contact in the contact list
 */
function hideContact() {
  document.getElementById("all-information").classList.remove("animationRightToPosition");
  document.getElementById("all-information").classList.add("d-none");
  for (let i = 0; i < Contacts.length; i++) {
    document.getElementById(`Contact${i}`).style = "";
    document.getElementById(`name${i}`).style = "";
  }
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
  document.getElementById("badgeBackgroundColor").style.backgroundColor = Contacts[i].color;
  document.getElementById("editContact").setAttribute(`onclick`, `loadEditContact(event, ${i})`);
  document.getElementById("editContactMobile").setAttribute(`onclick`, `loadEditContact(event, ${i})`);
  document.getElementById("deleteContact").setAttribute(`onclick`, `deleteContact(${i})`);
  document.getElementById("deleteContactMobile").setAttribute(`onclick`, `deleteContact(${i})`);
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
                    <div id="Contact${x}" onclick="loadContact(${x}, event)" class="Contact">
                        <div class="Profile-Badge" style="background-color: ${Contacts[x].color};">
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
