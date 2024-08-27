const client = require("./elasticsearch");

// Búsqueda exacta
async function exactSearch(field, query) {
  try {
    const result = await client.search({
      index: "users",
      body: {
        query: {
          match: { [field]: query },
        },
      },
    });
    return result.hits.hits;
  } catch (error) {
    throw new Error(`Error en la búsqueda exacta: ${error.message}`);
  }
}

// Búsqueda difusa
async function fuzzySearch(field, query) {
  try {
    const result = await client.search({
      index: "users",
      body: {
        query: {
          fuzzy: { [field]: query },
        },
      },
    });
    return result.hits.hits;
  } catch (error) {
    throw new Error(`Error en la búsqueda difusa: ${error.message}`);
  }
}

async function getAllUsers(field, query) {
  try {
    const result = await client.search({
      index: "users",
      body: {
        query: {
          match_all: {}
        }
      }
    });

    return result.hits.hits;
  } catch (error) {
    throw new Error(`Error en la búsqueda difusa: ${error.message}`);
  }
}

module.exports = { exactSearch, fuzzySearch, getAllUsers };
