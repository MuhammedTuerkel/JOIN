/**
 * template for the user login 
 * if the user is registred than he can log in 
 */
function getUserLoginTemplate(){
    return `
    <div class="login_card scale_up_center"> 
        <div class="login_card_headline">
            <h1>Log in</h1> 
            <div class="login_underline"></div> 
        </div>
        <div class="login_input_field">
            <input id="loginInputMail" type="text" placeholder="Mail" oninput="checkEmailInput()" onchange="checkLoginInputfields()" required class="blur_placeholder">
            <img src="./assets/img/mail.png" alt="Mail Icon"> 
        </div>
        <div class="login_input_mail_info_error_container">
            <small id="loginInputMailError" class="login_input_mail_info login_d_none">Bitte geben Sie eine gültige E-Mail-Adresse ein.</small>
        </div>
        <div class="login_input_field">
            <input id="loginInputPassword" type="password" placeholder="Passwort" oninput="togglePasswordIcons()" required class="blur_placeholder"> 
            <img id="togglePasswordIcon" src="./assets/img/lock.png" alt="Show/Hide Password" onclick="togglePasswordVisibility()"> 
        </div> 
        <div class="login_input_mail_info_error_container">
            <small id="loginInputWrongPasswordError" class="login_input_mail_info login_d_none">E-Mail-Adresse und Passwort stimmen nicht überein</small> 
        </div>
        <div class="login_buttons"> 
            <button id="loginButton" onclick="checkLoginPassword()" class="login_buttons_styles" disabled>
                Log in 
            </button> 
            <div class="login_buttons_styles_clear"> 
                Guest Log in 
            </div> 
        </div>
     </div>

    `
}

/**
 * the Sign Up Template will be lodet if the user is not registred 
 * 
 */
function getSignUpTemplate(){
    return `
<form id="logiSignUp" class="signup_card scale_up_center" onsubmit="pushNewUserinFireBaseArray(event)">
    <div class="login_back_to_sign_in">
        <img onclick="backToSignin()" src="./assets/img/back_arrow.png" alt="">
    </div>
    <div class="login_card_headline">
        <h1>Sign up</h1>
        <div class="login_underline"></div>
    </div>
    <div class="login_input_field">
        <input id="signUpName" type="text" placeholder="Name" class="blur_placeholder">
        <img src="./assets/img/person.png" alt="Mail Icon">
    </div>
    <div class="login_input_field">
        <input id="loginInputMail" type="text" placeholder="Mail" oninput="checkEmailInput()" class="blur_placeholder" required>
        <img src="./assets/img/mail.png" alt="Mail Icon">
    </div>                
    <div class="login_input_field">
        <input id="signUpInputPassword" type="password" placeholder="Passwort" oninput="toggleSignUpPasswordIcon()" class="blur_placeholder" required>
        <img id="togglePasswordIconSignUp" src="./assets/img/lock.png" alt="Show/Hide Password" onclick="toggleSignUpPasswordVisibility()">
    </div>
    <div class="login_input_field">
        <input id="signUpConfirmInputPassword" type="password" placeholder="Confirm Passwort" oninput="toggleAndCheckInputConfirmPassword()" class="blur_placeholder" required>
        <img id="togglePasswordIconSignUpConfirm" src="./assets/img/lock.png" alt="Show/Hide Password" onclick="toggleSignUpConfirmPasswordVisibility()">
    </div>

    <div class="login_checkbox_container">
        <div onclick="acceptTerms()" class="login_checkbox">
            <input type="checkbox" id="acceptTerms" class="form_check_input" disabled>
        </div> 
        <div class="login_checkbox">
            <label for="acceptTerms" class="form-check-label">I accept the <p onclick="showPrivacyPolicy()" class="hover_target">Privacy policy</p></label>
        </div>
    </div>

    <div class="signup_buttons">
        <button class="login_signup_buttons_styles" id="signUpButton" disabled>
            Sign up
        </button>
    </div>
</form>


    `
}


function getInfoForValidMailAdressTemplate(){
    return `
    <small id="loginInputMailError" class="login_input_mail_info login_d_none">Bitte geben Sie eine gültige E-Mail-Adresse ein.</small>
    `
}