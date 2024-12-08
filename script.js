let users = [];
let tasks = [];

const BASE_URL = "https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/";

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
 * Pushes a new user into the Firebase Realtime Database.
 * 
 * This function prevents the default form submission behavior, collects the user input data, 
 * generates a random color, creates a user data object, and posts this data to Firebase.
 * After successfully adding the user, it loads the login template and shows a registration confirmation.
 * 
 */
async function pushNewUserinFireBaseArray(event) {
    event.preventDefault();
    let userName = document.getElementById('signUpName').value;
    let userMail = document.getElementById('signUpInputMail').value;
    let userPassword = document.getElementById('signUpConfirmInputPassword').value;
    const color = createRandomColor();
    const userData = {
        name: userName,
        email: userMail,
        password: userPassword,
        color: color,
        createdAt: new Date().toISOString(),
    };
    try {
        let response = await postData(`users/${userMail.replace('.', '_')}`, userData);
        console.log("User successfully added to Realtime Database:", response);
        createUser();
    } catch (error) {
        console.error("Error adding user to Realtime Database:", error);
    }
}

/**
 * Posts data to the Firebase Realtime Database.
 * This function sends a POST request to the specified path in the Firebase Realtime Database
 * with the provided data.
 *  The response data from Firebase.
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
 * Generates a random color.
 * This function creates a random hexadecimal color code.
 * returns a random hexadecimal color code.
 */
function createRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}