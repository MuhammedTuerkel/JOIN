/**
 * Checks if the input fields are filled correctly
 * and enables or disables the save button.
 */
function contactsFormValidation() {
  let name = document.getElementById("input-name").value.trim();
  let email = document.getElementById("input-email").value.trim();
  let phone = document.getElementById("input-phone").value.trim();
  let createNewContactButton = document.getElementById("createNewContactButton");
  const minimumLength = 3;

  if (name.length >= minimumLength && email.length >= minimumLength && phone.length >= minimumLength) {
    createNewContactButton.disabled = false;
    createNewContactButton.classList.add("enabled");
    createNewContactButton.classList.remove("disabled");
    createNewContactButton.style.pointerEvents = "auto";
  } else {
    createNewContactButton.disabled = true;
    createNewContactButton.classList.add("disabled");
    createNewContactButton.classList.remove("enabled");
    createNewContactButton.style.pointerEvents = "none";
  }
}

/**
 * Validates the form fields and submits if all fields are valid.
 * @param {Event} event - The event triggered on form submission.
 */
function validateAndSubmitForm(event) {
  let nameValid = validateName();
  let emailValid = validateEmail();
  let phoneValid = validatePhone();

  if (nameValid && emailValid && phoneValid) {
    createNewContact(event);
  }
}

/**
 * Validates the name field.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
function validateName() {
  let name = document.getElementById("input-name").value.trim();
  let nameValid = name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
  handleValidationFeedback("input-name", "contactsInputName", nameValid);
  return nameValid;
}

/**
 * Validates the email field.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
function validateEmail() {
  let email = document.getElementById("input-email").value.trim();
  let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  handleValidationFeedback("input-email", "contactsInputMail", emailValid);
  return emailValid;
}

/**
 * Validates the phone number field.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
function validatePhone() {
  let phone = document.getElementById("input-phone").value.trim();
  let phoneValid = /^\+?[1-9]\d{9,}$/.test(phone);
  handleValidationFeedback("input-phone", "contactsInputPhone", phoneValid);
  return phoneValid;
}

/**
 * Handles the validation feedback for an input field.
 * @param {string} inputFieldId - The ID of the input field.
 * @param {string} errorFieldId - The ID of the error message field.
 * @param {boolean} isValid - Indicates whether the input field is valid.
 */
function handleValidationFeedback(inputFieldId, errorFieldId, isValid) {
  let inputField = document.getElementById(inputFieldId);
  let errorField = document.getElementById(errorFieldId);

  if (isValid) {
    inputField.classList.remove("contacts_input_error");
    errorField.style.display = "none";
  } else {
    inputField.classList.add("contacts_input_error");
    errorField.style.display = "block";
  }
}
