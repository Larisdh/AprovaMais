// C:\AprovaMais-1\backend\api\index.js - VERSÃO FINAL E CORRIGIDA

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL_DEPLOYED || "*" }));
app.use(express.json());

let db;
let adminInitialized = false;

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  db = admin.firestore();
  adminInitialized = true;
  console.log("✔️ Firebase Admin SDK inicializado com sucesso.");
} catch (error) {
  console.error("❌ Erro ao inicializar Firebase Admin SDK:", error);
}

const checkFirebaseInitialized = (req, res, next) => {
  if (!adminInitialized || !db) {
    console.error(`[${req.method} ${req.path}] Firebase não inicializado.`);
    return res.status(500).json({ error: "Erro interno: BD não configurado." });
  }
  next();
};

// --- Rota de Perguntas ---
app.get("/api/perguntas", checkFirebaseInitialized, async (req, res) => {
  console.log(`[GET /api/perguntas] Query recebida:`, req.query);
  try {
    let { materia, quantidade } = req.query;
    let query = db.collection("perguntas");

    if (materia) {
      // 1. Decodifica o parâmetro para lidar com acentos
      materia = decodeURIComponent(materia);
      
      // <<< SOLUÇÃO DEFINITIVA AQUI >>>
      // 2. Padroniza a string para letras minúsculas
      const materiaParaBusca = materia.toLowerCase();
      
      console.log(`[GET /api/perguntas] Filtrando por matéria (padronizada): ${materiaParaBusca}`);
      
      // 3. Usa a string padronizada na consulta
      query = query.where("materia", "==", materiaParaBusca);
    }

    const snapshot = await query.get();
    if (snapshot.empty) {
      console.log(`[GET /api/perguntas] Nenhuma pergunta encontrada.`);
      return res.json([]);
    }

    let perguntas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (quantidade && parseInt(quantidade) > 0) {
      const numQuantidade = parseInt(quantidade);
      perguntas = perguntas.sort(() => 0.5 - Math.random()).slice(0, numQuantidade);
    }

    res.json(perguntas);
  } catch (error) {
    console.error("[GET /api/perguntas] Erro ao buscar perguntas:", error);
    res.status(500).json({ error: "Erro interno ao buscar perguntas." });
  }
});

// --- Outras Rotas ---
// (Nenhuma alteração necessária nas outras rotas)

app.post("/api/resultados", checkFirebaseInitialized, async (req, res) => {
    // seu código...
});

app.get("/api/ranking", checkFirebaseInitialized, async (req, res) => {
    // seu código...
});

app.get("/", (req, res) => {
  res.json({ status: "Servidor rodando", firebaseInitialized: adminInitialized });
});

module.exports = app;