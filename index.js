// index.js
console.log("App iniciando...");

// Error intencionado solo al ejecutar
setTimeout(() => {
  throw new Error("Fallo intencionado Hito 3");
}, 1000);

function resta(a, b) {
  return a - b;
}

module.exports = { resta };
