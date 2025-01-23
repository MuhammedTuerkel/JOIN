/**
 * Checks if the input fields are filled correctly
 * and enables or disables the save button.
 */
function contactsFormValidation() {
  let name = document.getElementById("input-name").value.trim();
  let email = document.getElementById("input-email").value.trim();
  let phone = document.getElementById("input-phone").value.trim();
  let createNewContactButton = document.getElementById("createNewContactButton");
  let nameFilled = name !== "";
  let emailFilled = email !== "";
  let phoneFilled = phone !== "";
  if (nameFilled && emailFilled && phoneFilled) {
    let isValidEmail = checkContactsMailInput();
    let allFieldsValid = isValidEmail && phone !== "";
    if (allFieldsValid) {
      createNewContactButton.disabled = false;
      createNewContactButton.classList.add("enabled");
      createNewContactButton.classList.remove("disabled");
    } else {
      createNewContactButton.disabled = true;
      createNewContactButton.classList.add("disabled");
      createNewContactButton.classList.remove("enabled");
    }
  } else {
    createNewContactButton.disabled = true;
    createNewContactButton.classList.add("disabled");
    createNewContactButton.classList.remove("enabled");
  }
  addInputErrorStyles(nameFilled, emailFilled, phoneFilled);
}

/**
 * Checks if the email input field is correctly filled
 * and shows an error message if the email format is invalid.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
function checkContactsMailInput() {
  let input = document.getElementById("input-email");
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let emailError = document.getElementById("contactsInputMail");

  if (!emailPattern.test(input.value)) {
    emailError.classList.remove("contacts_d_none");
    return false;
  } else {
    emailError.classList.add("contacts_d_none");
    return true;
  }
}

/**
 * Adds error styles to input fields that have been filled incorrectly.
 * @param {boolean} nameFilled - Indicates if the name field has been filled.
 * @param {boolean} emailFilled - Indicates if the email field has been filled.
 * @param {boolean} phoneFilled - Indicates if the phone field has been filled.
 */
function addInputErrorStyles(nameFilled, emailFilled, phoneFilled) {
  let nameInput = document.getElementById("input-name");
  let emailInput = document.getElementById("input-email");
  let phoneInput = document.getElementById("input-phone");

  let name = nameInput.value.trim();
  let email = emailInput.value.trim();
  let phone = phoneInput.value.trim();

  if (nameFilled) {
    nameInput.classList.toggle("contacts_input_error", name === "");
  }
  if (emailFilled) {
    emailInput.classList.toggle("contacts_input_error", !checkContactsMailInput());
  }
  if (phoneFilled) {
    phoneInput.classList.toggle("contacts_input_error", phone === "");
  }
}
