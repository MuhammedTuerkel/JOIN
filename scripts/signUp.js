
/**
 * to get the sign up template at first the div container get th d_none class
 * the login header have an flex box now the class is removed 
 * now can load the template
 * 
 */
function loadSignUpTemplate(){
    let loginHeader = document.getElementById('loginHead');
    loginHeader.classList.add('login_d_none');
    let signUpPage = document.getElementById('loginContent');
    signUpPage.innerHTML = "",
    signUpPage.innerHTML += getSignUpTemplate();
    loginHeader.classList.add('login_d_none');
}

/**
 * to get the sign in template the steps must be removed
 * 
 */
function backToLogIn(){
    let signUp = document.getElementById('logiSignUp');
    signUp.innerHTML = "";
    let loginHeader = document.getElementById('loginHead');
    loginHeader.classList.remove('login_d_none')
    loginHeader.classList.remove('login_d_none');
    loadLoginTemplate();
}

/**
 * if the checkbox is checkt the button where enabled do go to the next step
 *  
 */
function acceptTerms() {
    let checkBox = document.getElementById('acceptTerms');
    let button = document.getElementById('signUpButton');
    button.disabled = !checkBox.checked;
}

/**
 *  if the user have typed 3 letters the img form the inputfield password will change form the lock to the visibility off 
 * 
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
 * if the user will show the password so he can klick on the eye to watch his password
 * 
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
 *  if the user have typed 3 letters the img form the inputfield password will change form the lock to the visibility off 
 * 
 */
function toggleSignUpConfirmPasswordIcon() {
    let passwordInput = document.getElementById('signUpConfirmInputPassword');
    let toggleIcon = document.getElementById('togglePasswordIconSignUpConfirm');
    if (passwordInput.value.length >= 3) {
        toggleIcon.src = './assets/img/visibility_off.png';
        
    } else {
        toggleIcon.src = './assets/img/lock.png';
        checkSignUpPasswords()
    } 
}

/**
 * two functions in one oninputfield must react in one function.
 * toggleSignUp let the user with the click on the crossed out eye to see his input
 * checkSignUpPasswords take the value from the signUpPassword Inputfield and the vlauer from the SignUp Confirm Password input field and check them.
 */
function toggleAndCheckInputConfirmPassword(){
    toggleSignUpConfirmPasswordIcon();
    checkSignUpPasswords();
}

/**
 * if the user will show the password so he can klick on the eye to watch his password
 * 
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

/** SIGN UP
 * sign up check password and confirm password ist the same
 * if is not the sam the calss login_input_error wil be added
 */
function checkSignUpPasswords(){
    let password = document.getElementById('signUpInputPassword').value;
    let confirmPassword = document.getElementById('signUpConfirmInputPassword').value;
    let checkbox = document.getElementById('acceptTerms');

    if(password === confirmPassword){
        document.getElementById('signUpConfirmInputPassword').classList.remove('login_input_error');
        checkbox.disabled = false;
    }else{
        document.getElementById('signUpConfirmInputPassword').classList.add('login_input_error');
        checkbox.disabled = true;
    }
}