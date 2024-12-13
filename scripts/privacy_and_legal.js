/**
 * when the user hwo is not registred want to see the privacy policy.
 * the links Summary, Ad Task, Board, Contacts are not to see 
 */
function renderPrivacyPolicyTemplateNotLoggedInUser(){
    document.getElementById('privacy').classList.add('activated');
    loadPrivacyTemplate();
}
/**
 * when the user hwo is registred want to see the privacy policy.
 * the links Summary, Ad Task, Board, Contacts are to see 
 */
function renderPrivacyPolicyTemplateLoggedInUser(){
    document.getElementById('privacy').classList.add('activated');
    document.getElementById('asideMenu').style.display = 'flex';
    loadPrivacyTemplate();
}

function loadPrivacyTemplate(){
    let termPolicy = document.getElementById('termsContent');
    termPolicy.innerHTML = "";
    document.getElementById('privacy').classList.add('activated');
    termPolicy.innerHTML += getPrivacyPolicyTemplate();
}

document.addEventListener("DOMContentLoaded", function() {
    let textElements = document.getElementById('legalNotice');
    let text = textElements.innerHTML;

    let highlightedText = text.replace(/Join/g, '<span class="highlight">Join</span>');
    highlightedText = highlightedText.replace(/Developer/g, '<span class="highlight">Developer</span>');
    highlightedText = highlightedText.replace(/Akademie/g, '<span class="highlight">Akademie</span>');

    textElements.innerHTML = highlightedText;
})
