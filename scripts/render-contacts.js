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
 * Generates the whole alphabet
 * @returns the alphabet
 */
async function generateAlphabet() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}

/**
 * Checks if the first letter of the name matches with the letter, if yes then it generates the badge and loads a function named generateContactHTML
 * at the end it clears the empty divs
 */
function renderContact() {
  let a = generateAlphabet();
  if (contacts == 0) {
    clearEmptyDivs(a);
  } else {
    let firstLetter = contacts[x].name.charAt(0).toUpperCase();
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
 * Generates the contacts in the contact list. If it finishes with the array, it goes back to the renderContacts function.
 * @param {*} a - The alphabet array.
 * @param {*} i - Current index in the alphabet array.
 * @param {*} Badge - The generated badge for the contact.
 */
function generateContactHTML(storedContacts, a, i, badge) {
  if (storedContacts.length === 0) {
    console.warn("Contacts array is empty");
    return;
  }

  storedContacts.forEach((storedContacts, index) => {
    if (storedContacts && storedContacts.color && storedContacts.name && storedContacts.email) {
      if (storedContacts.name.charAt(0).toUpperCase() === a[i]) {
        document.getElementById(`${a[i]}`).innerHTML += `
          <div id="Contact${index}" onclick="loadContact(${index}, event)" class="Contact">
            <div class="Profile-Badge" style="background-color: ${storedContacts.color};">
              <h4>${badge}</h4>
            </div>
            <div class="name-email">
              <h2 id="name${index}">${storedContacts.name}</h2>
              <h3>${storedContacts.email}</h3>
            </div>
          </div>
        `;
      }
    } else {
      console.warn(`Invalid contact data at index ${x}`, storedContacts);
    }
    x++;
  });
}

/**
 * Clears the empty divs to ensure a clean structure.
 */
// function clearEmptyDivs(alphabet) {
//   alphabet.forEach((letter) => {
//     const section = document.getElementById(letter);
//     if (!section || section.innerHTML.trim() === "") {
//       section && section.parentElement.remove();
//     }
//   });
// }

/**
 * Renders the template of the contact information
 * @param {int} i
 */
function renderContactInformation(i) {
  if (i >= 0 && i < contacts.length) {
    let Badge = generateBadge(i);
    document.getElementById("Profile-Badge1").innerHTML = `${Badge}`;
    document.getElementById("editdelete-name").innerHTML = `${contacts[i].name}`;
    document.getElementById("email").innerHTML = `${contacts[i].email}`;
    document.getElementById("phone").innerHTML = `${contacts[i].phone}`;
    document.getElementById("badgeBackgroundColor").style.backgroundColor = contacts[i].color;
    document.getElementById("editContact").setAttribute(`onclick`, `loadEditContact(event, ${i})`);
    document.getElementById("editContactMobile").setAttribute(`onclick`, `loadEditContact(event, ${i})`);
    document.getElementById("deleteContact").setAttribute(`onclick`, `deleteContact(${i})`);
    document.getElementById("deleteContactMobile").setAttribute(`onclick`, `deleteContact(${i})`);
  } else {
    console.warn(`Contact with index ${i} not found.`);
    return;
  }
}
