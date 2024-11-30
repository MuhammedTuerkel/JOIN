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