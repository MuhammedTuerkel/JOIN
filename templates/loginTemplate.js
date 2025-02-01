/**
 * Template for registred users
 * if the user have an account so he can log in
 */
function getUserLoginTemplate() {
  return `
    <form class="login_card scale_up_center" onload="handleKeyDown(event)" onsubmit="handleLogin(event)"> 
        <div class="login_card_headline">
            <h1>Log in</h1> 
            <div class="login_underline"></div> 
        </div>
        <div class="login_input_field">
            <input id="loginInputMail" type="text" placeholder="Mail" onchange="checkEmailInput()" required class="blur_placeholder restricted_input">
            <img src="./assets/img/mail.png" alt="Mail Icon" class="input_icon_mail"> 
            <small id="loginInputMailError" class="login_input_mail_info login_d_none">Bitte geben Sie eine gültige E-Mail-Adresse ein.</small>
        </div>
        <div class="login_input_field">
            <input id="loginInputPassword" type="password" placeholder="Passwort" oninput="togglePasswordIcons()" required class="blur_placeholder restricted_input"> 
            <img id="togglePasswordIcon" src="./assets/img/lock.png" alt="Show/Hide Password" onclick="togglePasswordVisibility()" class="input_icon_password"> 
            <small id="loginInputWrongPasswordError" class="login_input_mail_info login_d_none">E-Mail-Adresse und Passwort stimmen nicht überein</small> 
        </div>
        <div class="login_buttons"> 
            <button type="submit" id="loginButton"  class="login_buttons_styles" disabled>
                Log in 
            </button> 
            <div onclick="guestLogIn()" class="login_buttons_styles_clear"> 
                Guest Log in 
            </div> 
        </div>
     </form>
    `;
}

/**
 * Template vor new user
 * if the user is not registred so he can here sign up to the application
 */
function getSignUpTemplate() {
  return `
       <form id="logiSignUp" class="signup_card scale_up_center" onsubmit="pushNewUserinFireBaseArray(event)">
        <div class="login_back_to_sign_in">
            <img onclick="backToLogIn()" src="./assets/img/back_arrow.png" alt="Zurück zur Anmeldung">
        </div>
        <div class="sign_up_card_headline">
            <h1>Sign up</h1>
            <div class="signup_underline"></div>
        </div>
        <div class="signup_input_field">
            <input id="signUpName" type="text" placeholder="Name" class="blur_placeholder" oninput="validateSignUpForm(); checkSignUpNameInput()">
            <img src="./assets/img/person.png" alt="Person Icon" class="input_icon_mail">
            <small id="signUpNameError" class="signup_input_mail_info login_d_none">Bitte geben Sie einen gültigen Namen ein.</small>
        </div>
        <div class="signup_input_field">
            <input id="signUpInputMail" type="text" placeholder="Mail" oninput="validateSignUpForm(); checkSignUpEmailInput()" class="blur_placeholder" required>
            <img src="./assets/img/mail.png" alt="Mail Icon" class="input_icon_mail">
            <small id="signUpInputMailError" class="signup_input_mail_info login_d_none">Bitte geben Sie eine gültige E-Mail-Adresse ein.</small>
            <small id="signUpInputMailExistsError" class="signup_input_mail_info login_d_none">Diese E-Mail-Adresse ist bereits registriert.</small>
        </div>
        <div class="signup_input_field">
            <input id="signUpInputPassword" type="password" placeholder="Passwort" oninput="validateSignUpForm(); toggleSignUpPasswordIcon(); checkPasswordInput()" class="blur_placeholder" required>
            <img id="togglePasswordIconSignUp" src="./assets/img/lock.png" alt="Show/Hide Password" onclick="toggleSignUpPasswordVisibility()" class="input_icon_password">
            <small id="signUpPasswordError" class="signup_input_mail_info login_d_none">Das Passwort muss mindestens 3 Zeichen lang sein.</small>
        </div>
        <div class="signup_input_field">
            <input id="signUpConfirmInputPassword" type="password" placeholder="Confirm Passwort" oninput="validateSignUpForm(); toggleAndCheckInputConfirmPassword()" class="blur_placeholder" required>
            <img id="togglePasswordIconSignUpConfirm" src="./assets/img/lock.png" alt="Show/Hide Password" onclick="toggleSignUpConfirmPasswordVisibility()" class="input_icon_password">
            <small id="signUpConfirmPasswordError" class="signup_input_mail_info login_d_none">Die Passwörter stimmen nicht überein.</small>
        </div>
        <div class="signup_checkbox_container">
            <div onclick="acceptTerms()" class="signup_checkbox">
                <input type="checkbox" id="acceptTerms" class="form_check_input" disabled>
            </div> 
            <div class="signup_checkbox">
                <label for="acceptTerms" class="form-check-label">I accept the <p onclick="renderPrivacyPolicyTemplateNotLoggedInUser()" class="hover_target">Privacy policy</p></label>
            </div>
        </div>
        <div class="signup_buttons">
            <button class="signup_buttons_styles" id="signUpButton" disabled>
                Sign up
            </button>
        </div>
    </form>
    `;
}

/**
 * Template for "Remember Me" overlay
 * This function returns the HTML template for the "Remember Me" overlay
 */
function getRememberMeTemplate() {
  return `
    <div id="rememberMeOverlay" class="remember_me_overlay">
        <div id="rememberMeLogoContainer" class="remember_me_content">
            <img src="./assets/img/capa.png" alt="Logo" class="remember_me_logo">
        </div>
        <div id="rememberMeTextButtonContainer" class="remember_me_text">
                <p>Möchten Sie angemeldet bleiben?</p>
                <div id="rememberMeButtons" class="remember_me_buttons_container">
                    <button class="remember_me_button" onclick="rememberMeYes()">Ja</button>
                    <button class="remember_me_button" onclick="rememberMeNo()">Nein</button>
                </div>
        </div>
    </div>
    `;
}

/**
 * Returns a HTML-Element to show if the data were saved
 * @returns a HTML Element
 */
function getRememberMeYesTemplate() {
  return `
    <p id="rememberMeYes">Daten wurden gespeichert</p>
    `;
}

/**
 * Returns a HTML-Element to show if the data were not saved
 * @returns a HTML-Element
 */
function getRememberMeNoTemplate() {
  return `
    <p id="rememberMeNo" >Daten wurden nicht gespeichert</p>
    `;
}
