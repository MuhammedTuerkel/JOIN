let fetchedPassword = "";

function logInInit() {
    moveImage();
    hideImageAfterDelay();
    onloadFunction();
    loadLoginTemplate();
}

/**
 * Fetch the password for a given email from Firebase Realtime Database
 * The email input value with '.' replaced by '_'
 */
async function fetchPassword(userMail) {
    let path = `users/`;
    let inputPasswordError = document.getElementById('loginInputPasswordError');
    try {
        let users = await loadData(path);
        for (let userId in users) {
            let user = users[userId];

            for (let subId in user) {
                let userDetails = user[subId];
                if (userDetails.email === userMail.replace(/_/g, '.')) {
                    fetchedPassword = userDetails.password;
                    return;
                }
            }
        }
        inputPasswordError.classList.remove('login_d_none');
    } catch (error) {
    }
}

/**
 * Let the logo move from the middle of the page to the upper left corner.
 * The class 'login_moved' lets the logo move and change the size.
 * The class 'login_move_image_container' must be removed after the move to create new contents.
 */
function moveImage() {
    let image = document.getElementById('loginMovableImage').classList.add('login_moved');
    let mobileImg = document.getElementById('loginMobileMovableImage').classList.add('login_moved')
    let position = document.getElementById('loginMoveImgContainer');
    let positionMobile = document.getElementById('loginMobileMoveImgContainer');
    let header = document.getElementById('loginHead');
    let mobileNav = document.getElementById('loginMobile');
    let main = document.getElementById('loginMain');
    let loginFooter = document.getElementById('loginFooter');
    let body = document.querySelector('.login_body').style.backgroundColor = 'transparent';;

    setTimeout(function() {
        position.classList.remove('login_move_image_container');
        positionMobile.classList.remove('login_move_mobile_image_container');
        header.classList.remove('login_d_none');
        mobileNav.classList.remove('login_d_none');
        main.classList.remove('login_d_none');
        loginFooter.classList.remove('login_d_none');
    }, 1000);
}

/**
 * let the second logo that is used for the mobile app after 100ms clear
 * 
 */
function hideImageAfterDelay() {
    const image = document.getElementById('loginMobileMovableImage');
    setTimeout(() => {
        image.classList.add('hidden'); 
    }, 100);
}

/**
 * Create the login template for registered users 
 * 
 */
function loadLoginTemplate() {
    let loginPage = document.getElementById('loginContent');
    let inputMail = document.getElementById('loginInputMail');
    let inputPassword = document.getElementById('loginInputPassword');

    loginPage.innerHTML = "",
        loginPage.innerHTML += getUserLoginTemplate();
    if (inputMail === "" || inputPassword === "") {
        document.getElementById('loginButton').disabled = true;
    }
}

/**
 *  if the user have typed 3 letters the img form the inputfield password will change form the lock to the visibility off 
 * set the enabled css class to show the log in button
 */
function togglePasswordIcons() {
    const loginButton = document.getElementById('loginButton');
    let passwortInput = document.getElementById('loginInputPassword')
    loginButton.classList.add('enabled');

    let passwordInput = document.getElementById('loginInputPassword');
    let toggleIcon = document.getElementById('togglePasswordIcon');
    if (passwordInput.value.length >= 3) {
        toggleIcon.src = './assets/img/visibility_off.png';
    } else {
        toggleIcon.src = './assets/img/lock.png';
        passwortInput.classList.remove('login_input_error');
        document.getElementById('loginInputMail').classList.remove('login_input_error');
        document.getElementById('loginInputWrongPasswordError').classList.add('login_d_none');
    }
    checkLoginInputfields();
}

/**
 * if the user will show the password so he can klick on the eye to watch his password
 * 
 */
function togglePasswordVisibility() {
    let passwordInput = document.getElementById('loginInputPassword');
    let toggleIcon = document.getElementById('togglePasswordIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = './assets/img/visibility.png';
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = './assets/img/visibility_off.png';
    }
}

/**
 * Checks if the email input field is empty, shows or hides error messages accordingly.
 * Validates the email format and fetches the password if valid.
 */
function checkEmailInput() {
    let input = document.getElementById('loginInputMail');
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailError = document.getElementById('loginInputMailError');

    if (input.value === '') {
        input.classList.remove('login_input_error');
        emailError.classList.add('login_d_none');
        disableLogInButton();
    } else if (!emailPattern.test(input.value)) {
        input.classList.add('login_input_error');
        emailError.classList.remove('login_d_none');
    } else {
        input.classList.remove('login_input_error');
        emailError.classList.add('login_d_none');
        fetchPassword(input.value.replace(/\./g, '_'));
    }
    checkLoginInputfields();
}

/**
 * Checks the email and password input fields for validity.
 * Enables or disables the login button based on the validation.
 */
function checkLoginInputfields() {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('loginInputMail');
    const passwordInput = document.getElementById('loginInputPassword');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailPattern.test(emailInput.value.trim());
    const isPasswordValid = passwordInput.value.length >= 3;

    if (isEmailValid && isPasswordValid) {
        loginButton.disabled = false;
        loginButton.classList.add('enabled');
        loginButton.classList.remove('disabled');
    } else {
        loginButton.disabled = true;
        loginButton.classList.remove('enabled');
        loginButton.classList.add('disabled');
    }
}

/**
 * Checks if the entered password matches the fetched password.
 * Displays an error message if the passwords do not match.
 */
function checkLoginPassword() {
    let enteredPassword = document.getElementById('loginInputPassword').value;
    let wrongPasswordError = document.getElementById('loginInputWrongPasswordError');

    if (enteredPassword === fetchedPassword) {
        wrongPasswordError.classList.add('login_d_none');
        console.log('Login erfolgreich');
        pushUserToLoggedInUserArray();
    } else {
        wrongPasswordError.classList.remove('login_d_none');
        document.getElementById('loginInputPassword').classList.add('login_input_error');
        document.getElementById('loginInputMail').classList.add('login_input_error');
    }
}

/**
 * Disables the login button to prevent the user from clicking the login button.
 */
function disableLogInButton() {
    const loginButton = document.getElementById('loginButton');
    loginButton.disabled = true;
    loginButton.classList.add('disabled');
}

/**
 * if mail and passwort are true then go to the summary html
 */
function goToSummaryHtml() {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser[0]));
    window.location.href = 'summary.html';
}

/**
 * push the data from the logged in user in an array to use this datas in the local storage
 */
function pushUserToLoggedInUserArray() {
    let email = document.getElementById('loginInputMail').value;
    let user = users.find(user => user.email === email);

    loggedInUser.push({
        name: user.name,
        email: user.email,
        color: user.color,
        createdAt: user.createdAt,
        password: user.password
    });
    goToSummaryHtml()
}

