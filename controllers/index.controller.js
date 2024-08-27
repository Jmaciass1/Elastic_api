const client = require("../services/elasticsearch");

exports.indexUser = async (req, res) => {
  const user = req.body;

  if (!user || !user.id) {
    return res.status(400).json({ error: "Se requiere un usuario con 'id'." });
  }

  try {
    // Indexa el documento (usuario) en el índice "users"
    const result = await client.index({
      index: "users",
      id: user.id, // Usamos el id del usuario como identificador del documento
      body: user,
    });

    res.status(201).json({ message: "Usuario indexado con éxito", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
