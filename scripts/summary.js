let greeting;

/**
 * Is a body-onload function
 */
async function Init() {
  await getAllTasks();
  getLoggedInUserData();
  getFromLocalStorage();
  putName();
  greetingOnMobile();
}

/**
 * Changes the greeting text to match the time of day
 */
document.addEventListener("DOMContentLoaded", function () {
  let today = new Date();
  let hourNow = today.getHours();
  if (hourNow >= 0 && hourNow < 12) {
    greeting = "Good Morning";
  } else if (hourNow >= 12 && hourNow < 18) {
    greeting = "Good Afternoon";
  } else if (hourNow >= 18 && hourNow < 24) {
    greeting = "Good Evening";
  }
  document.getElementById("greeting").innerHTML = greeting;
});

/**
 * If the screen width is under 1400px it shows the greeting text in the loading of the html for three seconds
 */
async function greetingOnMobile() {
  if (window.innerWidth < 1400) {
    document.getElementById("headline").style = "display:none;";
    document.getElementById("Tasks").style = "display:none;";
    document.getElementById("greeting-top").classList.remove("d-none");

    setTimeout(() => {
      document.getElementById("greeting-top").classList.add("d-none");

      document.getElementById("headline").style = "";
      document.getElementById("Tasks").style = "";
    }, 3000);
  }
}

/**
 * Makes the first letter of the name toUpperCase and puts the name in the greeting
 */
function putName() {
  let name = String(User[0].name).charAt(0).toUpperCase() + String(User[0].name).slice(1);
  document.getElementById("name").innerHTML = `${name}`;
  let firstLetter = User[0].name.charAt(0).toUpperCase();
  document.getElementById("user").innerHTML = `${firstLetter}`;
}
