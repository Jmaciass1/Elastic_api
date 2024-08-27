const { exactSearch, fuzzySearch } = require('./services/search');
const client = require('./services/elasticsearch');
const users = require('./data/users');

async function indexDocuments() {
  try {
    for (const user of users) {
      await client.index({
        index: 'users',
        id: user.id,
        body: user,
      });
    }
    await client.indices.refresh({ index: 'users' });
    console.log("Documentos indexados correctamente.");
  } catch (error) {
    console.error("Error al indexar documentos:", error);
  }
}

(async () => {
  try {
    await indexDocuments();

    // Búsqueda exacta en el campo 'name'
    const exactResults = await exactSearch('name', "Alice Johnson");
    console.log("Resultados de la búsqueda exacta:", exactResults);

    // Búsqueda difusa usando el campo 'email' con fuzziness de 2 y prefix_length de 2
    const fuzzyResults = await fuzzySearch('email', 'Alice', 2, 2);
    console.log("Resultados de la búsqueda difusa:", fuzzyResults);
  } catch (error) {
    console.error(error.message);
  }
})();

