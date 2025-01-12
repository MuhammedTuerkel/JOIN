/**
 * ! jsdoc ergänzen
 * @param {} event
 * @param {*} i
 * @returns
 */
async function saveEditContact(event, i) {
  event.stopPropagation();
  const userEmail = users[i].email.replace(".", "_");

  const userName = document.getElementById("input-name").value;
  const userEmailField = document.getElementById("input-email").value;
  const userPhone = document.getElementById("input-phone").value;

  const allUsersResponse = await loadData("users");

  let userObject = allUsersResponse[userEmail];
  const userKeys = Object.keys(userObject || {});

  if (!userObject || userKeys.length === 0) {
    console.error(`User mit E-Mail ${userEmail.replace("_", ".")} nicht in Firebase gefunden.`);
    return;
  }

  userObject[userKeys[0]].name = userName;
  userObject[userKeys[0]].email = userEmailField;
  userObject[userKeys[0]].phone = userPhone;

  console.log(`Updated user data for email ${userEmail.replace("_", ".")}:`, userObject[userKeys[0]]);

  await patchData(`users/${userEmail}`, userObject);

  console.log(`Benutzer ${userEmail.replace("_", ".")} erfolgreich aktualisiert!`);
}

async function patchData(path, data) {
  const BASE_URL = "https://join-bbd82-default-rtdb.europe-west1.firebasedatabase.app/";
  return fetch(`${BASE_URL}${path}.json`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
