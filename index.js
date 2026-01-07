// index.js
function initApp() {
  setTimeout(() => {
    throw new Error("Fallo intencionado Hito 3");
  }, 1000);
}

function resta(a, b) {
  return a - b;
}

module.exports = { resta, initApp };
