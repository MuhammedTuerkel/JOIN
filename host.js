/**
 * Configuration object for different environments.
 * Contains the base URLs for development, staging, and production environments.
 * @type {Object}
 * @property {string} development - The base URL for the development environment.
 * @property {string} staging - The base URL for the staging environment, if a second server is used.
 * @property {string} production - The base URL for the production environment.
 */
const CONFIG = {
  development: "http://127.0.0.1:5501",
  staging: "https://christian-schreter.developerakademie.net/JOIN",
  production: "https://christian-schreter.developerakademie.net/JOIN",
};

/**
 * Retrieves the base URL based on the current environment.
 * The function checks the hostname of the current location and returns the corresponding base URL.
 *
 * @returns {string} The base URL for the current environment.
 */
function getBaseWebsideURL() {
  const hostname = window.location.hostname;
  if (hostname.includes("127.0.0.1") || hostname.includes("localhost")) {
    return CONFIG.development;
  } else if (hostname.includes("new server if you want to get a second server")) {
    return CONFIG.staging;
  } else {
    return CONFIG.production;
  }
}
