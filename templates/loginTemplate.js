/**
 * template for the user login 
 * 
 */
function getUserLoginTemplate(){
    return `
    <form class="login_card scale_up_center">
        <div class="login_card_headline">
            <h1>Log in</h1>
            <div class="login_underline"></div>
        </div>
        <div class="login_input_field">
            <input id="loginInputMail" type="text" placeholder="Mail" oninput="checkEmailInput()" required>
            <img src="./assets/img/mail.png" alt="Mail Icon">
        </div>                
        <div class="login_input_field">
            <input id="loginInputPassword" type="password" placeholder="Passwort" oninput="togglePasswordIcon()" required>
            <img id="togglePasswordIcon" src="./assets/img/lock.png" alt="Show/Hide Password" onclick="togglePasswordVisibility()">
        </div>
        <div class="login_buttons">
            <div class="login_buttons_styles">
                Log in
                </div>
            <div class="login_buttons_styles_clear">
                Guest Log in
            </div>
        </div>
    </form>
    `
}

/**
 * 
 * 
 */
function getSignUpTemplate(){
    return `
     <form id="logiSignUp"  class="signup_card scale_up_center">
        <div class="login_back_to_sign_in">
            <img onclick="backToSignin()" src="./assets/img/back_arrow.png" alt="">
        </div>
        <div class="login_card_headline">
            <h1>Sign up</h1>
            <div class="login_underline"></div>
        </div>
        <div class="login_input_field">
            <input id="signUpName" type="text" placeholder="Name">
            <img src="./assets/img/person.png" alt="Mail Icon">
        </div>
        <div class="login_input_field">
            <input id="loginInputMail" type="text" placeholder="Mail" oninput="checkEmailInput()" required>
            <img src="./assets/img/mail.png" alt="Mail Icon">
        </div>                
        <div class="login_input_field">
            <input id="signUpInputPassword" type="password" placeholder="Passwort" oninput="toggleSignUpPasswordIcon()" required>
            <img id="togglePasswordIconSignUp" src="./assets/img/lock.png" alt="Show/Hide Password" onclick="toggleSignUpPasswordVisibility()">
        </div>
        <div class="login_input_field">
            <input id="signUpConfirmInputPassword" type="password" placeholder="Confirm Passwort" oninput="toggleAndCheckInputConfirmPassword()" required>
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
            <button class="login_signup_buttons_styles" id="signUpButton" disabled onclick="pushNewUserinArray()">
                Sign up
            </button>
        </div>
    </form>
    `
}