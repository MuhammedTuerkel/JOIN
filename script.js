let users = [];
const BASE_URL = "https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Load user data from Firebase Realtime Database into global users array
 */
async function onloadFunction() {
    let userResponse = await loadData("users");
    let userKeyArray = Object.keys(userResponse);

    for (let index = 0; index < userKeyArray.length; index++) {
        var userEntries = Object.values(userResponse[userKeyArray[index]]);
        for (let entry of userEntries) {
            users.push(entry);
        }
    }
    console.log("Global users array:", users);
    let JSONObject  = await userEntries.json();
    console.log(JSONObject);
    
    
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

