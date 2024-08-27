const express = require("express");
const router = express.Router();
const {
  exactSearchHandler,
  fuzzySearchHandler,
  getAllUsersHandler,
} = require("../controllers/search.controller");

router.post("/exact", exactSearchHandler);

router.post("/fuzzy", fuzzySearchHandler);

router.get("/all", getAllUsersHandler);

module.exports = router;
