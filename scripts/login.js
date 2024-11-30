function init(){
    moveImage();
    loadLoginTemplate();
}

/**
 * Let the logo move from the middle of the page to the left top corner.
 * The class 'login_moved' lets the logo move and change the size.
 * the class login_move_image_container must be removed after the move to create new contents
 */
function moveImage() {
    let image = document.getElementById('loginMovableImage');
    image.classList.toggle('login_moved');
    let position = document.getElementById('loginMoveImgContainer');
    let header = document.getElementById('login_header');
    let main = document.getElementById('loginMain');

    setTimeout(function() {
        position.classList.remove('login_move_image_container');
        header.classList.remove('login_d_none');
        main.classList.remove('login_d_none')
    }, 780);
}

/**
 * Create the login template for registered users 
 * 
 */
function loadLoginTemplate() {
    let loginPage = document.getElementById('loginContent');
    loginPage.innerHTML = "",
    loginPage.innerHTML += getUserLoginTemplate();
}

/**
 * check if the inputfield is empty than remove the error class
 * if the user doesnt inser an @ than comes the error 
 * if the user have the @ in his mail adress than also remove the error class
 */
function checkEmailInput() {
    let input = document.getElementById('loginInputMail');
    if (input.value === '') {
        input.classList.remove('login_input_error');
    } else if (!input.value.includes('@')) {
        input.classList.add('login_input_error');
    } else {
        input.classList.remove('login_input_error');
    }
}

/**
 * to get the sign up template at first the div container get th d_none class
 * the login header have an flex box now the class is removed 
 * now can load the template
 * 
 */
function loadSignUpTemplate(){
    let loginHeader = document.getElementById('loginHeader');
    loginHeader.classList.add('login_d_none');
    loginHeader.classList.remove('login_header_nav');
    let signUpPage = document.getElementById('loginContent');
    signUpPage.innerHTML = "",
    signUpPage.innerHTML += getSignUpTemplate();
}

/**
 * to get the sign in template the steps must be removed
 * 
 */
function backToSignin(){
    let signUp = document.getElementById('logiSignUp');
    signUp.innerHTML = "";
    let loginHeader = document.getElementById('loginHeader');
    loginHeader.classList.remove('login_d_none')
    loginHeader.classList.add('login_header_nav');
    loadLoginTemplate();
}

/**
 * if the checkbox is checkt the button where enabled do go to the next step
 *  
 */
function toggleButton() {
    let checkBox = document.getElementById('acceptTerms');
    let button = document.getElementById('signUpButton');
    button.disabled = !checkBox.checked;
}

/**
 *
 *  if the user have typed 3 letters the img form the inputfield password will change form the lock to the visibility off 
 */
function togglePasswordIcon() {
    var passwordInput = document.getElementById('loginInputPassword');
    var toggleIcon = document.getElementById('togglePasswordIcon');
    if (passwordInput.value.length >= 3) {
        toggleIcon.src = './assets/img/visibility_off.png';
    } else {
        toggleIcon.src = './assets/img/lock.png';
    }
}

/**
 * if the user will show the password so he can klick on the eye to watch his password
 * 
 */
function togglePasswordVisibility() {
    var passwordInput = document.getElementById('loginInputPassword');
    var toggleIcon = document.getElementById('togglePasswordIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = './assets/img/visibility.png';
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = './assets/img/visibility_off.png';
    }
}
