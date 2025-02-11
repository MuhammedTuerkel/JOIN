/**
 * when the user who is not registered wants to see the privacy policy.
 * the links Summary, Add Task, Board, Contacts are not to be seen.
 */
function renderPrivacyPolicyTemplateNotLoggedInUser() {
  let newTab = window.open("/privacy-and-legal.html", "_blank");
  newTab.addEventListener("DOMContentLoaded", function () {
    function showNotLoggedInUserAside() {
      newTab.addClassActivatePrivatePolicy();
      newTab.loadPrivacyTemplate();
    }
    showNotLoggedInUserAside();
  });
}

/**
 * this function is an help function to clear the html and load the Privacy Policy template
 */
function loadPrivacyTemplate() {
  let termPolicy = document.getElementById("termsContent");
  termPolicy.innerHTML = "";
  termPolicy.innerHTML += getPrivacyPolicyTemplate();
}

/**
 * when the user who is not registered wants to see the privacy policy.
 * the links Summary, Add Task, Board, Contacts are not to be seen.
 */
function renderLegalNoticeTemplateNotLoggedInUser() {
  let newTab = window.open("/privacy-and-legal.html", "_blank");
  newTab.addEventListener("DOMContentLoaded", function () {
    function showNotLoggedInUserAside() {
      newTab.addClassActivateLegalNotice();
      newTab.loadLegalTemplate();
    }
    showNotLoggedInUserAside();
  });
}

/**
 * this function is an help function to clear the html and load the Legal Notice template
 */
function loadLegalTemplate() {
  let termPolicy = document.getElementById("termsContent");
  termPolicy.innerHTML = "";
  termPolicy.innerHTML += getLegalNoticeTemplate();
}

/**
 * class remove and add the activate class to show the user whitch link is open
 * this shows the user the Privacy Policy Template
 */
function addClassActivatePrivatePolicy() {
  document.getElementById("privacy").classList.add("activated");
  document.getElementById("legal").classList.remove("activated");
}

/**
 * class remove and add the activate class to show the user whitch link is open
 * this shows the user the Legal Notice Template
 */
function addClassActivateLegalNotice() {
  document.getElementById("privacy").classList.remove("activated");
  document.getElementById("legal").classList.add("activated");
}

/**
 * Navigates back to the previous page or to the login page.
 *
 * This function sets a flag in sessionStorage to indicate that the user is returning,
 * then retrieves the URL of the previous page (if available) from sessionStorage.
 * If a previous page URL exists, it redirects to that page. Otherwise, it redirects
 * to the login page.
 *
 * @returns {void} This function does not return a value.
 */
function backToThePage() {
  sessionStorage.setItem("isReturning", "true");
  let previousPage = sessionStorage.getItem("previousPage");
  if (previousPage) {
    window.location.href = previousPage;
  } else {
    window.location.href = "/login.html";
  }
}

/**
 * This script handles the privacy policy and legal notice templates.
 * It checks if the user is returning from the login page and if so, loads the respective template.
 * If not, it adds event listeners to the aside elements and loads the initial template.
 */
document.addEventListener("DOMContentLoaded", function () {
  const isReturning = sessionStorage.getItem("isReturning");

  if (isReturning !== "true") {
    const templateType = sessionStorage.getItem("templateType");
    let template = document.getElementById("termsContent");

    if (templateType === "privacyPolicy") {
      renderPrivacyPolicyTemplate();
    } else if (templateType === "legalNotice") {
      renderLegalNoticeTemplate();
    } else if (templateType === "help") {
      loadHelpHtml();
    }
  } else {
    sessionStorage.removeItem("isReturning");
  }
});
/**
 *  if the user clicks at the aside on the Privacy Policy Button then he can see the template from the Privacy Policy
 */
function showPrivacyPolicyTemplate() {
  let template = document.getElementById("termsContent");
  (template.innerHTML = ""), addClassActivatePrivatePolicy();
  template.innerHTML += getPrivacyPolicyTemplate();
}

/**
 *  if the user clicks at the aside on the Privacy Policy Button then he can see the template from the Privacy Policy
 */
function showLegalNoticeTemplate() {
  let template = document.getElementById("termsContent");
  (template.innerHTML = ""), addClassActivateLegalNotice();
  template.innerHTML += getLegalNoticeTemplate();
}

/**
 * this function is an help function to clear the html and load the Privacy Policy template
 */
function loadForLoggedInUserPrivacyTemplate() {
  let termPolicy = document.getElementById("termsContent");
  termPolicy.innerHTML = "";
  termPolicy.innerHTML += getForLoggedInUserPrivacyPolicyTemplate();
}

/**
 * this function is an help function to clear the html and load the Legal Notice template
 */
function loadForLogedInUsersLegalTemplate() {
  let termPolicy = document.getElementById("termsContent");
  termPolicy.innerHTML = "";
  termPolicy.innerHTML += getForLoggedInUserPrivacyPolicyTemplate();
}

/**
 * Redirects to the previously visited page and closes the current window.
 *
 * The function performs the following steps:
 * 1. Retrieves the URL of the previous page from sessionStorage.
 * 2. Opens the previous page in a new tab if it exists.
 * 3. Closes the current window.
 * 4. If the window was not closed and the previous page URL exists, redirects the current page to the previous page URL.
 */
function redirectToPreviousPageAndClose() {
  const previousPage = sessionStorage.getItem("previousPage");

  if (previousPage) {
    window.open(previousPage, "_blank");
  }
  window.close();
  if (!window.closed && previousPage) {
    window.location.href = previousPage;
  }
}
