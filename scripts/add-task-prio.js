/**
 * Ensures that only one button is active and assigns the selected button its appearance.
 * @param {string} buttonId - The id of the selected button.
 * @param {string} svgId - The id of the corresponding svg.
 * @param {string} buttonClass - The class of the selected button.
 * @param {string} svgClass - The class of the corresponding svg.
 */
function activateButton(buttonId, svgId, buttonClass, svgClass) {
  const buttons = document.querySelectorAll(".prio-btn");
  buttons.forEach((button) => {
    button.classList.remove("urgent", "medium", "low", "active");
  });
  const svgs = document.querySelectorAll("svg");
  svgs.forEach((svg) => {
    svg.classList.remove("urgent-icon", "medium-icon", "low-icon");
  });
  document.getElementById(buttonId).classList.add(buttonClass, "active");
  document.getElementById(svgId).classList.add(svgClass);
}

/**
 * Sets the design of the Urgent button and temporarily saves the priority into the selectedPrio variable.
 */
function setUrgent() {
  activateButton("urgent-btn", "urgent-svg", "urgent", "urgent-icon");
  selectedPrio = "urgent";
}

/**
 * Sets the design of the Medium button and temporarily saves the priority into the selectedPrio variable.
 */
function setMedium() {
  activateButton("medium-btn", "medium-svg", "medium", "medium-icon");
  selectedPrio = "medium";
}

/**
 * Sets the design of the Low button and temporarily saves the priority into the selectedPrio variable.
 */
function setLow() {
  activateButton("low-btn", "low-svg", "low", "low-icon");
  selectedPrio = "low";
}

/**
 * Sets the design of the Urgent button and temporarily saves the priority into the selectedPrio variable.
 */
function setUrgentOnBoard() {
  activateButton("urgent-btn", "urgent-svg", "urgent", "urgent-icon");
  selectedPrioOnBoard = "urgent";
}

/**
 * Sets the design of the Medium button and temporarily saves the priority into the selectedPrio variable.
 */
function setMediumOnBoard() {
  activateButton("medium-btn", "medium-svg", "medium", "medium-icon");
  selectedPrioOnBoard = "medium";
}

/**
 * Sets the design of the Low button and temporarily saves the priority into the selectedPrio variable.
 */
function setLowOnBoard() {
  activateButton("low-btn", "low-svg", "low", "low-icon");
  selectedPrioOnBoard = "low";
}
