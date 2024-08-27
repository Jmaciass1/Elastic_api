const axios = require("axios");
const { log } = require("./logger");

const API_URL = "http://localhost:3000/api";

// Función para indexar un usuario
async function indexUser(user) {
  try {
    const response = await axios.post(`${API_URL}/index/user`, user);
    log(`Usuario indexado: ${JSON.stringify(response.data)}`);
  } catch (error) {
    log(`Error al indexar usuario: ${error.response ? error.response.data : error.message}`);
  }
}

// Función para obtener todos los usuarios
async function getAllUsers() {
  try {
    const response = await axios.get(`${API_URL}/search/all`);
    log(`Todos los usuarios: ${JSON.stringify(response.data)}`);
  } catch (error) {
    log(`Error al obtener usuarios: ${error.response ? error.response.data : error.message}`);
  }
}

// Función para hacer una búsqueda exacta
async function exactSearch(query) {
  try {
    const response = await axios.post(`${API_URL}/search/exact`, { field: "name", query });
    log(`Resultados de la búsqueda exacta: ${JSON.stringify(response.data)}`);
  } catch (error) {
    log(`Error en la búsqueda exacta: ${error.response ? error.response.data : error.message}`);
  }
}

// Función para hacer una búsqueda difusa
async function fuzzySearch(query, fuzziness, prefixLength) {
  try {
    const response = await axios.post(`${API_URL}/search/fuzzy`, {
      field: "name",
      query,
      fuzziness,
      prefixLength,
    });
    log(`Resultados de la búsqueda difusa: ${JSON.stringify(response.data)}`);
  } catch (error) {
    log(`Error en la búsqueda difusa: ${error.response ? error.response.data : error.message}`);
  }
}

// Ejecutar pruebas
(async () => {
  // Indexar algunos usuarios para las pruebas
  await indexUser({ id: "1", name: "Alice Johnson", email: "alice@example.com", age: 30 });
  await indexUser({ id: "2", name: "Bob Smith", email: "bob@example.com", age: 40 });
  await indexUser({ id: "3", name: "Charlie Brown", email: "charlie@example.com", age: 25 });

  await getAllUsers();

  await exactSearch("Alice Johnson");

  await fuzzySearch("Alice", 2, 1);
})();

