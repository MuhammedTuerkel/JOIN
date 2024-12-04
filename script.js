let users = [];
const BASE_URL = "https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/";

async function pushNewUserinFireBaseArray(event) {
    event.preventDefault(); // Verhindert das Standard-Formularverhalten
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
        loadLoginTemplate(); // Lade das Login-Template nach erfolgreicher Registrierung
        showSignUpInformation();
    } catch (error) {
        console.error("Error adding user to Realtime Database:", error);
    }
}

function showSignUpInformation() {
    alert("You have successfully registered!");
}

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

function createRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
