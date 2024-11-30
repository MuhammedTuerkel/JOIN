/**
 * Let the logo move from the middle of the page to the left top corner.
 * The class 'login_moved' lets the logo move and change the size.
 * the class login_move_image_container must be removed after the move to create new contents
 */
function moveImage() {
    let image = document.getElementById('loginMovableImage');
    image.classList.toggle('login_moved');
    let position = document.getElementById('loginMoveImgContainer');
    let header = document.getElementById('login_header')

    setTimeout(function() {
        position.classList.remove('login_move_image_container')
        header.classList.remove('login_d_none')
    }, 780);
}

/**
 * Create the login template for registered users 
 */
function loadLoginTemplate() {
    // Implement your template loading logic here
}
