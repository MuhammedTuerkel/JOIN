
/**
 * Closes the overlay, after clicking outside of the Overlay-Ticket
 * 
 * @param {*} event 
 */
function closeOverlayOnClick(event) {
    if (event.target === document.getElementById('overlayID')) {
        toggleOverlay();
    }
}

/**
 * Toggles the Overlay view
 */
function toggleOverlay() {
    let overlay = document.getElementById('overlayID');
    if (overlay.classList.contains('d_none')) {
        overlay.classList.remove('d_none');
        overlay.classList.add('d_flex');
        document.body.style.overflow = "hidden";
    } else {
        overlay.classList.remove('d_flex');
        overlay.classList.add('d_none');
        document.body.style.overflow = "auto";
    }
}

/**
 * Shows the ticket in the overlay when clicked on it
 * @param {string} category - The category of the ticket
 * @param {string} ticketTitle  - The Ticket title
 * @param {string} ticketDescription - The Ticket description
 * @param {string} ticketDate - The due date of the ticket
 * @param {string} prio - The Priority of the ticket
 * @param {string} ticketID - The exact ID which is based on the Firebase-ID
 */
function showOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID) {
    document.getElementById('overlayID').innerHTML = renderOverlayTicket(category, ticketTitle, ticketDescription, ticketDate, prio, ticketID);
    renderAssignedUsersOverlay(ticketID);
    renderSubtasksOverlay(ticketID);
}

/**
 * 
 * @param {*} ticketID 
 * @param {*} ticketTitle 
 * @param {*} ticketDescription 
 * @param {*} ticketDate 
 * @param {*} prio 
 */
function editTicket(ticketID, ticketTitle, ticketDescription, ticketDate, prio) {
    let target = document.getElementById('overlayCard');
    target.innerHTML = '';
    target.innerHTML = renderOverlayEditTicket();
    document.getElementById('task-title-overlay-edit').value = ticketTitle;
    document.getElementById('task-description-overlay-edit').value = ticketDescription;
    document.getElementById('task-due-date-overlay-edit').value = ticketDate;
    setPriorityOnEdit(prio);
}

/**
 * Sets the Priority on the Edit-Overlay based on the prio the task has
 * @param {string} prio 
 */
function setPriorityOnEdit(prio) {
    if(prio === 'urgent') {
        setUrgent();
    } else if(prio === 'medium') {
        setMedium();
    } else if(prio = 'low') {
        setLow();
    }
}

/**
 * Sets the Design of the Urgent-Button and temporarily saves the prio into the selectedPrio variable
 */
function setUrgent() {
    activateButton('urgent-btn', 'urgent-svg', 'urgent', 'urgent-icon');
    editedPrio = 'urgent';
}

/**
 * Sets the Design of the Medium-Button and temporarily saves the prio into the selectedPrio variable
 */
function setMedium() {
    activateButton('medium-btn', 'medium-svg', 'medium', 'medium-icon');
    editedPrio = 'medium';
}

/**
 * Sets the Design of the Low-Button and temporarily saves the prio into the selectedPrio variable
 */
function setLow() {
    activateButton('low-btn', 'low-svg', 'low', 'low-icon');
    editedPrio = 'low';
}

/**
 * Based on the clicked Prio-Button, the style of the button is changing. Makes sure, that only one Prio-Button could be active.
 * @param {string} buttonId 
 * @param {string} svgId 
 * @param {string} buttonClass 
 * @param {string} svgClass 
 */
function activateButton(buttonId, svgId, buttonClass, svgClass) {
    const buttons = document.querySelectorAll('.prio-btn');
    buttons.forEach((button) => {
        button.classList.remove('urgent', 'medium', 'low', 'active');
    });
    const svgs = document.querySelectorAll('svg');
    svgs.forEach((svg) => {
        svg.classList.remove('urgent-icon', 'medium-icon', 'low-icon');
    });
    document.getElementById(buttonId).classList.add(buttonClass, 'active');
    document.getElementById(svgId).classList.add(svgClass);
}

/**
 * 
 */
function saveEditonClick() {
    let newTitle = document.getElementById('task-title-overlay-edit').value;
    let newDescription = document.getElementById('task-description-overlay-edit').value;
    let newDueDate = document.getElementById('task-due-date-overlay-edit').value;
    let newPrio = editedPrio;
    let newAssignedUser = '';
    let newSubtasks = '';
}