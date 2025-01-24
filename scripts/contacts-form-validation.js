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
  let name = document.getElementById("input-name").value.trim();
  let email = document.getElementById("input-email").value.trim();
  let phone = document.getElementById("input-phone").value.trim();

  let nameValid = name.length >= 3 && /^[a-zA-Z\s]+$/.test(name); // Überprüfung, ob der Name gültig ist
  let emailValid = checkContactsMailInput(email); // Überprüfung der E-Mail
  let phoneValid = checkPhoneInput(phone); // Überprüfung der Telefonnummer

  handleValidationFeedback("input-name", "contactsInputName", nameValid);
  handleValidationFeedback("input-email", "contactsInputMail", emailValid);
  handleValidationFeedback("input-phone", "contactsInputPhone", phoneValid);

  if (nameValid && emailValid && phoneValid) {
    createNewContact(event); // Funktion ausführen, wenn alles korrekt ist
  }
}

function checkContactsMailInput(email) {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regulärer Ausdruck für E-Mail-Überprüfung
  return emailPattern.test(email);
}

function checkPhoneInput(phone) {
  let phonePattern = /^\+?[1-9]\d{1,14}$/; // Regulärer Ausdruck für Telefon-Überprüfung
  return phonePattern.test(phone);
}

function handleValidationFeedback(inputFieldId, errorFieldId, isValid) {
  let inputField = document.getElementById(inputFieldId);
  let errorField = document.getElementById(errorFieldId);

  if (isValid) {
    inputField.classList.remove("contacts_input_error");
    errorField.style.display = "block";
  } else {
    inputField.classList.add("contacts_input_error");
    errorField.style.display = "none";
  }
}
