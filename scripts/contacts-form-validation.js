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

function validateAndSubmitForm(event) {
  let nameValid = validateName();
  let emailValid = validateEmail();
  let phoneValid = validatePhone();

  if (nameValid && emailValid && phoneValid) {
    createNewContact(event);
  }
}

function validateName() {
  let name = document.getElementById("input-name").value.trim();
  let nameValid = name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
  handleValidationFeedback("input-name", "contactsInputName", nameValid);
  return nameValid;
}

function validateEmail() {
  let email = document.getElementById("input-email").value.trim();
  let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  handleValidationFeedback("input-email", "contactsInputMail", emailValid);
  return emailValid;
}

function validatePhone() {
  let phone = document.getElementById("input-phone").value.trim();
  let phoneValid = /^\+?[1-9]\d{9,}$/.test(phone); // Änderung: Mindestens 10 Ziffern erforderlich
  handleValidationFeedback("input-phone", "contactsInputPhone", phoneValid);
  return phoneValid;
}

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
