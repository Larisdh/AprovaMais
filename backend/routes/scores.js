const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scoresController");

// Rota para salvar uma nova pontuação
router.post("/", scoresController.create);

// Rota para obter o ranking
router.get("/", scoresController.listTop);

module.exports = router;