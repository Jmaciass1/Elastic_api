const express = require("express");
const router = express.Router();
const { indexUser } = require("../controllers/index.controller");

// Ruta para indexar usuarios
router.post("/user", indexUser);

module.exports = router;
