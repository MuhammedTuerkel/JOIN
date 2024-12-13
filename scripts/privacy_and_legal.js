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
 * when the user hwo is registred want to see the privacy policy.
 * the links Summary, Ad Task, Board, Contacts are to see 
 */
function renderPrivacyPolicyTemplateLoggedInUser(){
    let newTab = window.open("/privacy-and-legal.html", "_blank");
    newTab.addEventListener('DOMContentLoaded', function() {
        function showForregistredUser(){
            newTab.document.getElementById('privacy').classList.add('activated');
            newTab.document.getElementById('asideMenu').style.display = 'flex';
            newTab.loadPrivacyTemplate();
        }
        showForregistredUser();
    });
}

function loadPrivacyTemplate(){
    let termPolicy = document.getElementById('termsContent');
    termPolicy.innerHTML = "";
    termPolicy.innerHTML += getPrivacyPolicyTemplate();
}



