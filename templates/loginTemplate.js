/**
 * template for the user login 
 * 
 */
function getUserLoginTemplate(){
    return `
    <div class="login_card scale_up_center">
        <div class="login_card_headline">
            <h1>Log in</h1>
            <div class="login_underline"></div>
        </div>
        <div class="login_input_field">
            <input id="loginInputMail" type="text" placeholder="Mail" oninput="checkEmailInput()" >
            <img src="./assets/img/mail.png" alt="Mail Icon">
        </div>                
        <div class="login_input_field">
            <input type="text" placeholder="Passwort">
            <img src="./assets/img/lock.png" alt="Mail Icon">
        </div>
        <div class="login_buttons">
            <div class="login_buttons_styles">
                Log in
            </div>
            <div class="login_buttons_styles_clear">
                Guest Log in
            </div>
        </div>
    </div>
    `
}

function getSignUpTemplate(){
    return `
     <div id="logiSignUp"  class="signup_card scale_up_center">
        <div class="login_back_to_sign_in">
            <img onclick="backToSignin()" src="./assets/img/back_arrow.png" alt="">
        </div>
        <div class="login_card_headline">
            <h1>Sign up</h1>
            <div class="login_underline"></div>
        </div>
        <div class="login_input_field">
            <input type="text" placeholder="Name">
            <img src="./assets/img/person.png" alt="Mail Icon">
        </div>
        <div class="login_input_field">
            <input id="loginInputMail" type="text" placeholder="Mail" oninput="checkEmailInput()" >
            <img src="./assets/img/mail.png" alt="Mail Icon">
        </div>                
        <div class="login_input_field">
            <input type="text" placeholder="Passwort">
            <img src="./assets/img/lock.png" alt="Mail Icon">
        </div>
        <div class="login_input_field">
            <input type="text" placeholder="Confirm Passwort">
            <img src="./assets/img/lock.png" alt="Mail Icon">
        </div>
        <div class="login_checkbox">
            <input type="checkbox" id="acceptTerms" class="form_check_input" onclick="toggleButton()">
            <label for="acceptTerms" class="form-check-label">I accept the <p class="hover_target">Privacy policy</p></label>
        </div>
        <div class="signup_buttons">
            <button class="login_signup_buttons_styles" id="signUpButton" disabled>
                Sign up
            </button>
        </div>
    </div>
    `
}