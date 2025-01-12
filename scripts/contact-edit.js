async function saveEditContact(event, i) {
  event.stopPropagation();
  const userEmail = users[i].email.replace(".", "_"); // Ersetze Punkt durch Unterstrich

  // Alle Daten aus Firebase über `loadData` abrufen
  let allUsersResponse = await loadData("users");

  // Daten anzeigen
  console.log("Fetched users data:", allUsersResponse);

  // Benutzer im Array suchen
  let userObject = allUsersResponse[userEmail];

  if (!userObject) {
    console.error(`User with email ${userEmail} not found in Firebase.`);
    return;
  }

  console.log(`User data for email ${userEmail.replace("_", ".")}:`, userObject);

  // Sicherstellung: Alle Benutzer-Daten auch mit password
  Object.keys(allUsersResponse).forEach((key) => {
    const user = allUsersResponse[key];
    console.log(`Data for ${user.email.replace("_", ".")}:`, user);
  });

  // Ausgabe des zweiten Objekts passenden Passworts
  if (secondObjectKey) {
    const secondUserObject = allUsersResponse[secondObjectKey];
    console.log("Second object data:", secondUserObject);

    const password = secondUserObject.password || "Password not available";
    console.log(`Password for second object: ${password}`);
  } else {
    console.error("No second object found.");
  }
}
