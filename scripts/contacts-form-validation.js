/**
 * Opens and resets the contact form.
 *
 * This function clears all input fields in the contact form, hides any error messages,
 * disables the submit button, and resets its styling. It effectively prepares the form
 * for a new contact entry.
 *
 * @returns {void} This function does not return a value.
 */
function openContactForm() {
  document.getElementById("input-name").value = "";
  document.getElementById("input-email").value = "";
  document.getElementById("input-phone").value = "";
  document.getElementById("contactsInputName").style.display = "none";
  document.getElementById("contactsInputMail").style.display = "none";
  document.getElementById("contactsInputPhone").style.display = "none";
  document.getElementById("createNewContactButton").disabled = true;
  document.getElementById("createNewContactButton").classList.remove("Create");
  document.getElementById("createNewContactButton").classList.add("contacts_create_buttons_styles");
  document.getElementById("ContactsList").style.overflow = "hidden";
}

/**
 * Listens for DOMContentLoaded event and adds event listeners to input fields.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-name").addEventListener("blur", validateName);
  document.getElementById("input-email").addEventListener("blur", validateEmail);
  document.getElementById("input-phone").addEventListener("blur", validatePhone);
});

/**
 *  removes the red border and the error text under the input fields when all ist correct
 * @param {checker} input
 */
function resetValidation(input) {
  const checker = input.id.slice(6).charAt(0).toUpperCase() + input.id.slice(7);
  const errorElement = document.getElementById(`contactsInput${checker}`);
  if (errorElement) {
    input.style.borderColor = "";
    errorElement.style.display = "none";
  }
  contactsFormValidation();
}

/**
 * Validates the name input field.
 *
 * This function checks if the name input is valid according to the specified criteria.
 * It considers the input valid if it's empty or contains at least two characters.
 * If the input is invalid, it displays an error message and changes the input border color to red.
 * After validation, it calls the contactsFormValidation function to update the form's overall validity.
 *
 * @returns {boolean} True if the name is valid (empty or at least two characters), false otherwise.
 */
function validateName() {
  const name = document.getElementById("input-name");
  if (name.value.trim() === "") return true;
  const isValid = /^.{2,}$/.test(name.value);
  document.getElementById("contactsInputName").style.display = isValid ? "none" : "block";
  name.style.borderColor = isValid ? "" : "red";
  contactsFormValidation();
  return isValid;
}

/**
 * Validates the email input field.
 *
 * This function checks if the email input is valid according to a basic email format.
 * It considers the input valid if it's empty or matches the email regex pattern.
 * If the input is invalid, it displays an error message and changes the input border color to red.
 * After validation, it calls the contactsFormValidation function to update the form's overall validity.
 *
 * @returns {boolean} True if the email is valid (empty or matches email pattern), false otherwise.
 */
function validateEmail() {
  const email = document.getElementById("input-email");
  if (email.value.trim() === "") return true;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  document.getElementById("contactsInputMail").style.display = isValid ? "none" : "block";
  email.style.borderColor = isValid ? "" : "red";
  contactsFormValidation();
  return isValid;
}

/**
 * Validates the phone input field.
 *
 * This function checks if the phone input is valid according to a basic numeric format.
 * It considers the input valid if it's empty or contains at least 5 digits.
 * If the input is invalid, it displays an error message and changes the input border color to red.
 * After validation, it calls the contactsFormValidation function to update the form's overall validity.
 *
 * @returns {boolean} True if the phone number is valid (empty or at least 5 digits), false otherwise.
 */
function validatePhone() {
  const phone = document.getElementById("input-phone");
  if (phone.value.trim() === "") return true;
  const isValid = /^\d{5,}$/.test(phone.value);
  document.getElementById("contactsInputPhone").style.display = isValid ? "none" : "block";
  phone.style.borderColor = isValid ? "" : "red";
  contactsFormValidation();
  return isValid;
}

/**
 * Validates the contact form and updates the submit button state accordingly.
 *
 * This function checks the validity of the name, email, and phone input fields
 * in the contact form. It then updates the state of the submit button based on
 * the overall form validity.
 *
 * The function performs the following actions:
 * 1. Validates the name (must be at least 2 characters long)
 * 2. Validates the email (must be in a valid email format)
 * 3. Validates the phone number (must be at least 5 digits)
 * 4. Enables or disables the submit button based on overall form validity
 * 5. Updates the button's appearance and interactivity
 *
 * No parameters are required as the function accesses DOM elements directly.
 *
 * @returns {void} This function does not return a value.
 */
function contactsFormValidation() {
  const nameValid = /^.{2,}$/.test(document.getElementById("input-name").value);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("input-email").value);
  const phoneValid = /^\d{5,}$/.test(document.getElementById("input-phone").value);
  const isValid = nameValid && emailValid && phoneValid;
  const button = document.getElementById("createNewContactButton");
  if (button) {
    button.disabled = !isValid;
    button.style.pointerEvents = isValid ? "auto" : "none";
    if (isValid) {
      button.classList.remove("contacts_create_buttons_styles");
      button.classList.add("Create");
    } else {
      button.classList.remove("Create");
      button.classList.add("contacts_create_buttons_styles");
    }
  }
}
