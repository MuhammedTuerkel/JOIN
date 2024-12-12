/**
 * Loads the Sign-Up template.
 * Hides the login header and displays the Sign-Up form.
 */
function loadSignUpTemplate() {
    document.getElementById('loginHeader').classList.add('move_out');
    let signUpPage = document.getElementById('loginContent');
    signUpPage.innerHTML = "";
    signUpPage.innerHTML += getSignUpTemplate();
    document.getElementById('loginMobile').classList.add('login_d_none')
}

/**
 * Returns to the Login template from the Sign-Up template.
 * Clears the Sign-Up form and displays the login header.
 */
function backToLogIn() {
    let signUp = document.getElementById('logiSignUp');
    signUp.innerHTML = "";
    loginHeaderNav = document.getElementById('loginHeader').classList.remove('move_out');
    loginHeaderNavMoveIn = document.getElementById('loginHeader').classList.add('move_in');
    loadLoginTemplate();
    document.getElementById('loginMobile').classList.remove('login_d_none')
}

/**
 * Checks if the Sign-Up name input field is valid.
 * Displays an error message if the name contains invalid characters.
 */
function checkSignUpNameInput() {
    let nameInput = document.getElementById('signUpName');
    let nameError = document.getElementById('signUpNameError');
    let namePattern = /^[A-Za-zÄäÖöÜüß\s]+$/;

    if (namePattern.test(nameInput.value.trim())) {
        nameInput.classList.remove('login_input_error');
        nameError.classList.add('login_d_none');
    } else {
        nameInput.classList.add('login_input_error');
        nameError.classList.remove('login_d_none');
    }
    validateSignUpForm();
}

/**
 * check if the sign up mail adress ist used
 * if it used then return true
 * if it not used then return false
 */
function controllMailAdressIsUsed(email){
    for(index = 0; index < users.length; index++){
        let user =users[index];
        if(user.email === email){
            return true;
        }
    }
    return false;
}

/**
 * Checks if the email input field is valid.
 * Displays an error message if the email format is invalid.
 */
function checkSignUpEmailInput() {
    let input = document.getElementById('signUpInputMail');
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailError = document.getElementById('signUpInputMailError');
    let mailExistError = document.getElementById('signUpInputMailExistsError');

    if (input.value === '') {
        input.classList.remove('login_input_error');
        mailExistError.classList.add('login_d_none')
        emailError.classList.add('login_d_none');
        disableSignUpButton();
    } else if (!emailPattern.test(input.value)) {
        input.classList.add('login_input_error');
        emailError.classList.remove('login_d_none');
    } else if (controllMailAdressIsUsed(input.value)){
        input.classList.add('login_input_error');
        mailExistError.classList.remove('login_d_none')
    } else {
        input.classList.remove('login_input_error');
        emailError.classList.add('login_d_none');
    }
    validateSignUpForm();
}

/**
 * Checks if the Sign-Up password meets the requirements.
 * Displays an error message if the password is invalid.
 */
function checkPasswordInput() {
    let passwordInput = document.getElementById('signUpInputPassword');
    let passwordError = document.getElementById('signUpPasswordError');
    if (passwordInput.value.length < 3) {
        passwordInput.classList.add('login_input_error');
        passwordError.classList.remove('login_d_none');
    } else {
        passwordInput.classList.remove('login_input_error');
        passwordError.classList.add('login_d_none');
    }
    validateSignUpForm();
}

/**
 * Toggles the password visibility icon based on the password input length.
 */
function toggleSignUpPasswordIcon() {
    let passwordInput = document.getElementById('signUpInputPassword');
    let toggleIcon = document.getElementById('togglePasswordIconSignUp');
    if (passwordInput.value.length >= 3) {
        toggleIcon.src = './assets/img/visibility_off.png';
    } else {
        toggleIcon.src = './assets/img/lock.png';
    }
}

/**
 * Toggles the visibility of the Sign-Up password.
 */
function toggleSignUpPasswordVisibility() {
    let passwordInput = document.getElementById('signUpInputPassword');
    let toggleIcon = document.getElementById('togglePasswordIconSignUp');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = './assets/img/visibility.png';
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = './assets/img/visibility_off.png';
    }
}

/**
 * Toggles the password visibility icon based on the confirm password input length.
 */
function toggleSignUpConfirmPasswordIcon() {
    let passwordInput = document.getElementById('signUpConfirmInputPassword');
    let toggleIcon = document.getElementById('togglePasswordIconSignUpConfirm');
    if (passwordInput.value.length >= 3) {
        toggleIcon.src = './assets/img/visibility_off.png';
    } else {
        toggleIcon.src = './assets/img/lock.png';
        checkSignUpPasswords();
    }
}

/**
 * Toggles the visibility of the Sign-Up confirm password.
 */
function toggleSignUpConfirmPasswordVisibility() {
    let passwordInput = document.getElementById('signUpConfirmInputPassword');
    let toggleIcon = document.getElementById('togglePasswordIconSignUpConfirm');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = './assets/img/visibility.png';
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = './assets/img/visibility_off.png';
    }
}

/**
 * Toggles the password visibility and checks if passwords match.
 */
function toggleAndCheckInputConfirmPassword() {
    toggleSignUpConfirmPasswordIcon();
    checkSignUpPasswords();
}

/**
 * Checks if the Sign-Up password and confirm password match.
 * Displays an error message if the passwords do not match.
 * Disables the checkbox if passwords do not match.
 */
function checkSignUpPasswords() {
    let password = document.getElementById('signUpInputPassword').value;
    let confirmPassword = document.getElementById('signUpConfirmInputPassword').value;
    let checkbox = document.getElementById('acceptTerms');
    let passwordMatchError = document.getElementById('signUpConfirmPasswordError');

    if (password === confirmPassword && password.length >= 3) {
        document.getElementById('signUpConfirmInputPassword').classList.remove('login_input_error');
        passwordMatchError.classList.add('login_d_none');
        checkbox.disabled = false;
    } else {
        document.getElementById('signUpConfirmInputPassword').classList.add('login_input_error');
        passwordMatchError.classList.remove('login_d_none');
        checkbox.disabled = true;
    }
    validateSignUpForm();
}

/**
 * Checks if all Sign-Up input fields are correctly filled.
 * Enables the checkbox if all fields are valid.
 */
function validateSignUpForm() {
    let name = document.getElementById('signUpName').value.trim();
    let email = document.getElementById('signUpInputMail').value.trim();
    let password = document.getElementById('signUpInputPassword').value.trim();
    let confirmPassword = document.getElementById('signUpConfirmInputPassword').value.trim();
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let namePattern = /^[A-Za-zÄäÖöÜüß\s]+$/; // Erlaubt nur Buchstaben und Leerzeichen
    let isFormValid = namePattern.test(name) && emailPattern.test(email) && password.length >= 3 && password === confirmPassword;

    let checkbox = document.getElementById('acceptTerms');
    checkbox.disabled = !isFormValid;
}

/**
 * Toggles the disabled state of the Sign-Up button based on the checkbox state.
 */
function acceptTerms() {
    let checkBox = document.getElementById('acceptTerms');
    let button = document.getElementById('signUpButton');
    button.disabled = !checkBox.checked;
}

/**
 * Disables the login button to prevent the user from clicking the login button.
 */
function disableSignUpButton() {
    const loginButton = document.getElementById('signUpButton');
    loginButton.disabled = true; 
    loginButton.classList.add('disabled');
}

/**
 * create User pushes the datas form the Sing Up form in to the Firebasa Remote Storage Realtime Database JOIN
 * pushUserDataInLocalStorage push the mail adresse and the password will bi pushed in th elocal storage to use them in the log in side for an better user expirience
 * pushNewUserinFireBaseArray pushes the datas in the Database 
 * signUpOverlay create an animation to show the user es is sucessfuly lregistred
 */
function createUser(){
    pushUserDataInLocalStorage();
    users.length = 0;
    signUpOverlay();
    onloadFunction();
}

/**
 * Shows the overlay and animates the background to blur, then the container flies up.
 * first show overlay
 * second the container flyes from bottom to the middle of the side
 * third container flip an the log in side renders 
 * fourth the overly get the display non class
 * backToLogIn makes the same function as the back arrow
 * prefillLoginForm takes the datas from the local storage and fills the input fields
 */
function signUpOverlay() {
    const overlay = document.getElementById('overlay');
    const container = document.querySelector('.confirmation_container');
    overlay.classList.remove('login_d_none')
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('blur');
        container.classList.add('fly-up');
        setTimeout(() => {
            container.classList.add('flip-horizontal-bottom');
            backToLogIn();
            prefillLoginForm();
            checkEmailInput();
            setTimeout(() => {
                container.classList.add('login_d_none');
                overlay.classList.remove('blur');
                setTimeout(() => {
                    overlay.style.display = 'none'; 
                    container.classList.remove('d-none', 'fly-up', 'flip-horizontal-bottom');
                    checkLoginInputfields();
                }, 500);
            }, 300);
        }, 700);
    }, 100);
}

/**
 * save the e mail address and the password in the local storage
 */
function pushUserDataInLocalStorage() {
    const email = document.getElementById('signUpInputMail').value;
    const password = document.getElementById('signUpInputPassword').value;    
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
}

/**
 * fill the email address and the password from the local storage in the two input fields 
 */
function prefillLoginForm() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email && password) {
        document.getElementById('loginInputMail').value = email;
        document.getElementById('loginInputPassword').value = password;
    }
}