// async function saveEditContact(event, i) {
//   event.stopPropagation();
//   const userEmail = users[i].email.replace(".", "_"); // Ersetze Punkt durch Unterstrich

//   // Alle Daten via `loadData` abrufen
//   const allUsersResponse = await loadData("users");

//   // Gesamtdaten als JSON visuell darstellen:
//   console.log("Fetched Users Data:", JSON.stringify(allUsersResponse, null, 2));

//   // Benutzerobjekt suchen, sicherstellen:
//   const userObject = allUsersResponse[userEmail];
//   const userKeys = Object.keys(userObject || {});

//   if (!userObject || userKeys.length === 0) {
//     console.error(`User mit E-Mail ${userEmail.replace("_", ".")} nicht in Firebase gefunden.`);
//     return;
//   }

//   // Erstes Benutzerobjekt:
//   const firstUserObject = userObject[userKeys[0]];
//   console.log(`User data für email ${userEmail.replace("_", ".")}:`, firstUserObject);

//   // Passwort sicherstellen in Konsole loggen:
//   const password = firstUserObject.password || "Password not available";
//   console.log(`Password für ${userEmail.replace("_", ".")} erstes Objekt: ${password}`);
// }

// async function saveEditContact(event, i) {
//   event.stopPropagation();
//   const userEmail = users[i].email.replace(".", "_");

//   const userName = document.getElementById("input-name").value;
//   const userInputMail = document.getElementById("input-email").value;
//   const userPassword = document.getElementById("input-phone").value;

//   let allUsersResponse = await loadData("users");

//   let userObject = allUsersResponse[userEmail];
//   const userKeys = Object.keys(userObject || {});

//   if (!userObject || userKeys.length === 0) {
//     console.error(`User mit E-Mail ${userEmail.replace("_", ".")} nicht in Firebase gefunden.`);
//     return;
//   }

//   userObject[userKeys[0]].name = userName;
//   userObject[userKeys[0]].email = userInputMail;
//   userObject[userKeys[0]].phone = userPassword;

//   console.log(`Updated user data for email ${userEmail.replace("_", ".")}:`, userObject[userKeys[0]]);
// }

async function saveEditContact(event, i) {
  event.stopPropagation();
  const userEmail = users[i].email.replace(".", "_"); // Ersetze Punkt durch Unterstrich

  // Werte aus 'input'-Feldern abholen
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

  // Benutzerdatenfeld aktualisieren
  userObject[userKeys[0]].name = userName;
  userObject[userKeys[0]].email = userEmailField;
  userObject[userKeys[0]].phone = userPhone;

  // Konsistenz und die aktualisierten Daten anzeigen
  console.log(`Updated user data for email ${userEmail.replace("_", ".")}:`, userObject[userKeys[0]]);

  // Patch-Methode für aktualisierte Daten in Firebase
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
