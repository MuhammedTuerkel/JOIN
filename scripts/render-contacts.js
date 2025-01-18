/**
 * Render the contactlist with the whole alphabet
 */
function renderContactsListHTML() {
  let list = (document.getElementById("ContactsList").innerHTML = "");
  let alphabet = generateAlphabet();
  alphabet.forEach((letter, i) => {
    document.getElementById("ContactsList").innerHTML += `
      <div id="Section${i}" class="letterSections">
        <div class="lettersbox">
          <h3>${letter}</h3>
        </div>
        <div class="contact_line"></div>
        <div id="${letter}"></div>
      </div>
    `;
  });
  renderContacts();
}

/**
 * Generates the whole alphabet
 * @returns the alphabet
 */
function generateAlphabet() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}

/**
 * Checks if the first letter of the name matches with the letter, if yes then it generates the badge and loads a function named generateContactHTML
 * at the end it clears the empty divs
 */
function renderContacts() {
  let alphabet = generateAlphabet();
  let storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
  console.log(storedContacts);

  if (storedContacts.length === 0) {
    clearEmptyDivs(alphabet);
  } else {
    storedContacts.forEach((contact, index) => {
      if (contact && contact.name) {
        let firstLetter = contact.name.charAt(0).toUpperCase();
        let letterIndex = alphabet.indexOf(firstLetter);
        if (letterIndex !== -1) {
          let badge = generateBadge(index);
          generateContactHTML(storedContacts, alphabet, letterIndex, badge);
        }
      }
    });

    clearEmptyDivs(alphabet);
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
function clearEmptyDivs(alphabet) {
  alphabet.forEach((letter) => {
    const section = document.getElementById(letter);
    if (!section || section.innerHTML.trim() === "") {
      section && section.parentElement.remove();
    }
  });
}
function renderContactInformation(i) {
  let storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
  if (i >= 0 && i < storedContacts.length) {
    let Badge = generateBadge(i);
    document.getElementById("Profile-Badge1").innerHTML = `${Badge}`;
    document.getElementById("editdelete-name").innerHTML = `${storedContacts[i].name}`;
    document.getElementById("email").innerHTML = `${storedContacts[i].email}`;
    document.getElementById("phone").innerHTML = `${storedContacts[i].phone}`;
    document.getElementById("badgeBackgroundColor").style.backgroundColor = storedContacts[i].color;
    document.getElementById("editContact").setAttribute(`onclick`, `loadEditContact(event, ${i})`);
    document.getElementById("editContactMobile").setAttribute(`onclick`, `loadEditContact(event, ${i})`);
    document.getElementById("deleteContact").setAttribute(`onclick`, `deleteContact(${i})`);
    document.getElementById("deleteContactMobile").setAttribute(`onclick`, `deleteContact(${i})`);
  } else {
    console.warn(`Contact with index ${i} not found.`);
    return;
  }
}
