/**
 * Creates a toast element and append it to the container. The toast will be removed after three seconds
 * @param {string} message
 */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  const container = document.getElementById("toast-container");
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
