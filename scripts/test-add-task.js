function addTaskInit() {
    onloadFunction();
}

function handleDropdownClick() {
    let dropdownContainer = document.getElementById('custom-dropdown');
    let dropdownImage = document.querySelector('.dropdown-trigger img');

    if (dropdownContainer.style.display === 'none' || dropdownContainer.style.display === '') {
        dropdownContainer.style.display = 'block';
        dropdownImage.style.transform = 'rotate(180deg)'; 
    } else {
        dropdownContainer.style.display = 'none';
        dropdownImage.style.transform = 'rotate(0deg)'; 
    }
    loadUserInAssignedToDropdown();
}

function createUserTemplate(user) {
   
    let initials = user.name.charAt(0).toUpperCase();

    return `
        <div class="user_template">
            <div class="user_template_circle_name">
                <div class="user_circle" style="background-color: ${user.color};">
                    ${initials}
                </div>
                <p>${user.name}</p>
            </div>
            <input type="checkbox" class="user_checkbox" value="${user.email}">
        </div>
    `;
}

function loadUserInAssignedToDropdown() {
    let dropdownContainer = document.getElementById('custom-dropdown');
    dropdownContainer.innerHTML = "";

    for (let index = 0; index < users.length; index++) {
        let user = users[index];
        dropdownContainer.innerHTML += createUserTemplate(user);
    }
}