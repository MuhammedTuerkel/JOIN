const CONFIG = {
  development: "http://127.0.0.1:5500",
  staging: "new server if you want to get a second server",
  production: "https://join-401.developerakademie.net/JOIN",
};

function getBaseURL() {
  const hostname = window.location.hostname;
  if (hostname.includes("127.0.0.1") || hostname.includes("localhost")) {
    return CONFIG.development;
  } else if (hostname.includes("new server if you want to get a second server")) {
    return CONFIG.staging;
  } else {
    return CONFIG.production;
  }
}
