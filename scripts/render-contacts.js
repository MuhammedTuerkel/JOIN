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
