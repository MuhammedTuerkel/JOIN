// /**
//  * Checks if the input fields are filled correctly
//  * and enables or disables the save button.
//  */
// function contactsFormValidation() {
//   let name = document.getElementById("input-name").value.trim();
//   let email = document.getElementById("input-email").value.trim();
//   let phone = document.getElementById("input-phone").value.trim();
//   let createNewContactButton = document.getElementById("createNewContactButton");
//   const minimumLength = 3;

//   if (name.length >= minimumLength && email.length >= minimumLength && phone.length >= minimumLength) {
//     createNewContactButton.disabled = false;
//     createNewContactButton.classList.add("enabled");
//     createNewContactButton.classList.remove("disabled");
//     createNewContactButton.style.pointerEvents = "auto";
//   } else {
//     createNewContactButton.disabled = true;
//     createNewContactButton.classList.add("disabled");
//     createNewContactButton.classList.remove("enabled");
//     createNewContactButton.style.pointerEvents = "none";
//   }
// }

// /**
//  * Validates the form fields and submits if all fields are valid.
//  * @param {Event} event - The event triggered on form submission.
//  */
// function validateAndSubmitForm(event) {
//   let nameValid = validateName();
//   let emailValid = validateEmail();
//   let phoneValid = validatePhone();

//   if (nameValid && emailValid && phoneValid) {
//     createNewContact(event);
//   }
// }

// /**
//  * Validates the name field.
//  * @returns {boolean} - Returns true if the name is valid, otherwise false.
//  */
// function validateName() {
//   let name = document.getElementById("input-name").value.trim();
//   let nameValid = name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
//   handleValidationFeedback("input-name", "contactsInputName", nameValid);
//   return nameValid;
// }

// /**
//  * Validates the email field.
//  * @returns {boolean} - Returns true if the email is valid, otherwise false.
//  */
// function validateEmail() {
//   let email = document.getElementById("input-email").value.trim();
//   let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   handleValidationFeedback("input-email", "contactsInputMail", emailValid);
//   return emailValid;
// }

// /**
//  * Validates the phone number field.
//  * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
//  */
// function validatePhone() {
//   let phone = document.getElementById("input-phone").value.trim();
//   let phoneValid = /^\+?[1-9]\d{9,}$/.test(phone);
//   handleValidationFeedback("input-phone", "contactsInputPhone", phoneValid);
//   return phoneValid;
// }

// /**
//  * Handles the validation feedback for an input field.
//  * @param {string} inputFieldId - The ID of the input field.
//  * @param {string} errorFieldId - The ID of the error message field.
//  * @param {boolean} isValid - Indicates whether the input field is valid.
//  */
// function handleValidationFeedback(inputFieldId, errorFieldId, isValid) {
//   let inputField = document.getElementById(inputFieldId);
//   let errorField = document.getElementById(errorFieldId);

//   if (isValid) {
//     inputField.classList.remove("contacts_input_error");
//     errorField.style.display = "none";
//   } else {
//     inputField.classList.add("contacts_input_error");
//     errorField.style.display = "block";
//   }
// }

function openContactForm() {
  // Inputfelder leeren
  document.getElementById("input-name").value = "";
  document.getElementById("input-email").value = "";
  document.getElementById("input-phone").value = "";

  // Fehlerhinweise verstecken
  document.getElementById("contactsInputName").style.display = "none";
  document.getElementById("contactsInputMail").style.display = "none";
  document.getElementById("contactsInputPhone").style.display = "none";

  // Button deaktivieren
  document.getElementById("createNewContactButton").disabled = true; // Button durch Attribut deaktiviert
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-name").addEventListener("blur", validateName);
  document.getElementById("input-email").addEventListener("blur", validateEmail);
  document.getElementById("input-phone").addEventListener("blur", validatePhone);
});

function showPlaceholder(input) {
  input.placeholder = input.dataset.placeholder;
}

function validateName() {
  const name = document.getElementById("input-name");
  const feedback = document.getElementById("contactsInputName");
  if (name.value.trim() === "") return true;
  const isValid = /^.{2,}$/.test(name.value);
  feedback.style.display = isValid ? "none" : "block";
  name.style.borderColor = isValid ? "" : "red";
  validateInputs();
  return isValid;
}

function validateEmail() {
  const email = document.getElementById("input-email");
  const feedback = document.getElementById("contactsInputMail");
  if (email.value.trim() === "") return true;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  feedback.style.display = isValid ? "none" : "block";
  email.style.borderColor = isValid ? "" : "red";
  validateInputs();
  return isValid;
}

function validatePhone() {
  const phone = document.getElementById("input-phone");
  const feedback = document.getElementById("contactsInputPhone");
  if (phone.value.trim() === "") return true;
  const isValid = /^\d+$/.test(phone.value);
  feedback.style.display = isValid ? "none" : "block";
  phone.style.borderColor = isValid ? "" : "red";
  validateInputs();
  return isValid;
}

function validateInputs() {
  const nameValid = validateName();
  const emailValid = validateEmail();
  const phoneValid = validatePhone();
  document.getElementById("createNewContactButton").disabled = !(nameValid && emailValid && phoneValid);
}
