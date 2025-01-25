/**
 * Creates a toast element and append it to the container. The toast will be removed after three seconds
 * @param {string} message
 */
function showToast(message, status) {
  const toast = document.createElement("div");
  toast.className = "toast";
  if (status == "alert") {
    toast.style.backgroundColor = "#ff3d00";
  } else if (status == "success") {
    toast.style.backgroundColor = "#7ae229";
  }
  toast.innerText = message;
  const container = document.getElementById("toast-container");
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 1000);
}
