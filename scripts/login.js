let fetchedPassword = "";

function init(){
    moveImage();
    onloadFunction();
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
    let loginFooter = document.getElementById('loginFooter');
    

    setTimeout(function() {
        position.classList.remove('login_move_image_container');
        header.classList.remove('login_d_none');
        main.classList.remove('login_d_none');
        loginFooter.classList.remove('login_d_none');
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
 * Check if the input field is empty then remove the error class
 * if the user doesn't insert an '@' then show the error
 * if the user has the '@' in their email address then also remove the error class
 */
function checkEmailInput() {
    let input = document.getElementById('loginInputMail');
    if (input.value === '') {
        input.classList.remove('login_input_error');
    } else if (!input.value.includes('@')) {
        input.classList.add('login_input_error');
    } else {
        input.classList.remove('login_input_error');
        fetchPassword(input.value.replace(/\./g, '_')); 
    }
}

/**
 * Fetch the password for a given email from Firebase Realtime Database
 * The email input value with '.' replaced by '_'
 */
async function fetchPassword(userMail) {
    let path = `users/`;

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
        console.log("No user found with this email."); // warunung e mail nicht registriert
    } catch (error) {
        console.error("Error fetching password from Realtime Database:", error); // warnung passwort oder mail stimme nicht überein 
    }
}

/**
 * Fetch data from Firebase Realtime Database
 * users is the path to the data in the database 
 * 
 */
async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

/**
 * check des entered password with the created passwort and gives the user feedbakc if it is corect or false
 * 
 */
function checkLoginPassword(){
    let enteredPassword = document.getElementById('loginInputPassword').value;
    if(enteredPassword === fetchedPassword){
        console.log("login Succesful");
        
    } else {
        console.log("angegebene mail oder passwort ist falsch");
        
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
function acceptTerms() {
    let checkBox = document.getElementById('acceptTerms');
    let button = document.getElementById('signUpButton');
    button.disabled = !checkBox.checked;
}

/**
 *  if the user have typed 3 letters the img form the inputfield password will change form the lock to the visibility off 
 * 
 */
function togglePasswordIcons() {
    let passwordInput = document.getElementById('loginInputPassword');
    let toggleIcon = document.getElementById('togglePasswordIcon');
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
        checkPasswords()
    } 
}

/**
 * two functions in one oninputfield must react in one function.
 * toggleSignUp let the user with the click on the crossed out eye to see his input
 * checkPasswords take the value from the signUpPassword Inputfield and the vlauer from the SignUp Confirm Password input field and check them.
 */
function toggleAndCheckInputConfirmPassword(){
    toggleSignUpConfirmPasswordIcon();
    checkPasswords();
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
function checkPasswords(){
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

/**
 * for each user an random color that makes the user individual
 * the function create an random color an that color will be pushed with the user datas in the array
 */
function createRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let index = 0; index < 6; index++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color
}

/**
 * Function to push new user data to Firebase Realtime Database
 */
async function pushNewUserinFireBaseArray() {
    let userName = document.getElementById('signUpName').value;
    let userMail = document.getElementById('loginInputMail').value;
    let userPassword = document.getElementById('signUpConfirmInputPassword').value;
    const color = createRandomColor();
    const userData = {
        name: userName,
        email: userMail,
        password: userPassword,
        color: color,
        createdAt: new Date().toISOString()
    };
    try {
        let response = await postData(`users/${userMail.replace('.', '_')}`, userData);
        console.log("User successfully added to Realtime Database:", response);
        loadLoginTemplate();
        showSignUpInformation();
    } catch (error) {
        console.error("Error adding user to Realtime Database:", error);
    }
}

/**
 * Function to show sign up information
 */
function showSignUpInformation() {
    window.location.href = 'confirmation.html?msg=You have successfully registered';
}

/**
 * Function to post data to Firebase Realtime Database
 */
async function postData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

/**
 * Function to generate a random color
 * Randomly generated color in hex format
 */
function createRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Load user data from Firebase Realtime Database into global users array
 */
async function onloadFunction() {
    let userResponse = await loadData("users");
    let userKeyArray = Object.keys(userResponse);

    for (let index = 0; index < userKeyArray.length; index++) {
        let userEntries = Object.values(userResponse[userKeyArray[index]]);
        for (let entry of userEntries) {
            users.push(entry);
        }
    }

    console.log("Global users array:", users);
}


