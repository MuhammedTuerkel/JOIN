/**
 * when the user who is not registered wants to see the privacy policy.
 * the links Summary, Add Task, Board, Contacts are not to be seen.
 */
function renderPrivacyPolicyTemplateNotLoggedInUser() {
    let newTab = window.open("/privacy-and-legal.html", "_blank");
    newTab.addEventListener('DOMContentLoaded', function() {
        function showNotLoggedInUserAside() {
            newTab.document.getElementById('privacy').classList.add('activated');
            newTab.loadPrivacyTemplate();
        }
        showNotLoggedInUserAside();
    });
}

/**
 * this function is an help function to clear the html and load the Privacy Policy template
 */
function loadPrivacyTemplate(){
    let termPolicy = document.getElementById('termsContent');
    termPolicy.innerHTML = "";
    termPolicy.innerHTML += getPrivacyPolicyTemplate();
}

/**
 * when the user who is not registered wants to see the privacy policy.
 * the links Summary, Add Task, Board, Contacts are not to be seen.
 */
function renderLegalNoticeTemplateNotLoggedInUser() {
    let newTab = window.open("/privacy-and-legal.html", "_blank");
    newTab.addEventListener('DOMContentLoaded', function() {
        function showNotLoggedInUserAside() {
            newTab.document.getElementById('privacy').classList.add('activated');
            newTab.loadLegalTemplate();
        }
        showNotLoggedInUserAside();
    });
}

/**
 * this function is an help function to clear the html and load the Privacy Policy template
 */
function loadLegalTemplate(){
    let termPolicy = document.getElementById('termsContent');
    termPolicy.innerHTML = "";
    termPolicy.innerHTML += getLegalNoticeTemplate();
}

/**
 * close these tab
 */
function backToThePage() {
    window.close();   
}
