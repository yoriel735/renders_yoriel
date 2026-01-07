function resta(a, b) {
  return a - b;
}

module.exports = { resta };

// sólo en producción para no romper los tests locales
if (process.env.NODE_ENV === 'production') {
  setTimeout(() => {
    throw new Error("Fallo intencionado Hito 3");
  }, 2000); // falla después de 2s, para que tests y build pasen
}