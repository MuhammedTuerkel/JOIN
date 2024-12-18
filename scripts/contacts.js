function loadContact(i, event) {
    event.stopPropagation();
    if (window.innerWidth < 1050) {
        document.getElementById('Contacts').style ="display:none;"
        document.getElementById('headline-contact').classList.remove("d-none3");
    }
    hideContact();
    setTimeout(() => {
        document.getElementById(`Contact${i}`).style = 'background-color: #2A3647;';
        document.getElementById(`name${i}`).style = 'color:white;';
        document.getElementById('all-information').classList.add('animationRightToPosition');
        document.getElementById('all-information').classList.remove('d-none');
    }, 100);
}

function hideContactMobile(event){
    event.stopPropagation();
    if (window.innerWidth < 1050) { 
        document.getElementById('Contacts').style ="";
        document.getElementById('headline-contact').classList.add("d-none3");
    }
    hideContact();
}

function hideContact() {
    document.getElementById('all-information').classList.remove('animationRightToPosition');
    document.getElementById('all-information').classList.add('d-none');
    for (let i = 0; i < 8; i++) {
        document.getElementById(`Contact${i}`).style = "";
        document.getElementById(`name${i}`).style = '';
    }
}

function loadAddNewContact(event) {
    event.stopPropagation();
    document.getElementById('addNewContact').classList.add('animationRightToPosition');
    document.getElementById('addNewContact').classList.remove('d-none');
}

function hideAddNewContact(event){
    event.stopPropagation();
    document.getElementById('addNewContact').classList.remove('animationRightToPosition');
    document.getElementById('addNewContact').classList.add('d-none');
}

function stopPropagation(event){
    event.stopPropagation();
}