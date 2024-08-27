const { exactSearch, fuzzySearch, getAllUsers } = require("../services/search");

exports.exactSearchHandler = async (req, res) => {
  const { field, query } = req.body;
  
  if (!field || !query) {
    return res.status(400).json({ error: "Se requieren los campos 'field' y 'query'." });
  }

  try {
    const results = await exactSearch(field, query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fuzzySearchHandler = async (req, res) => {
  const { field, query, fuzziness = 2, prefixLength = 0 } = req.body;

  if (!field || !query) {
    return res.status(400).json({ error: "Se requieren los campos 'field' y 'query'." });
  }

  try {
    const results = await fuzzySearch(field, query, fuzziness, prefixLength);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsersHandler = async(req, res) =>{
  try {
    const results = await getAllUsers();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
