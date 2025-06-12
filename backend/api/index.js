// C:\AprovaMais-1\backend\api\index.js - VERSÃO CORRETA (JÁ ESTAVA OK)

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
  console.error("❌ Erro ao inicializar Firebase Admin SDK. Verifique a variável de ambiente FIREBASE_SERVICE_ACCOUNT_KEY.", error);
}

const checkFirebaseInitialized = (req, res, next) => {
  if (!adminInitialized || !db) {
    console.error(`[${req.method} ${req.path}] Firebase Admin SDK não inicializado.`);
    return res.status(500).json({ error: "Erro interno no servidor: Serviço de banco de dados não configurado." });
  }
  next();
};

app.get("/api/perguntas", checkFirebaseInitialized, async (req, res) => {
  console.log(`[GET /api/perguntas] Recebida requisição com query:`, req.query);
  try {
    let { materia, quantidade } = req.query;
    let query = db.collection("perguntas");

    if (materia) {
      // Esta linha é crucial e já está correta.
      materia = decodeURIComponent(materia); 
      console.log(`[GET /api/perguntas] Filtrando por matéria (decodificada): ${materia}`);
      query = query.where("materia", "==", materia);
    }

    const snapshot = await query.get();
    if (snapshot.empty) {
      console.log(`[GET /api/perguntas] Nenhuma pergunta encontrada para os critérios.`);
      return res.json([]);
    }

    let perguntas = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        textos: data.textos || [],
        alternativas: data.alternativas || [],
        correta: data.correta,
        materia: data.materia || "",
        explicacao: data.explicacao || "",
      };
    });

    if (quantidade && parseInt(quantidade) > 0) {
      const numQuantidade = parseInt(quantidade);
      perguntas = perguntas.sort(() => Math.random() - 0.5).slice(0, numQuantidade);
    }

    res.json(perguntas);
  } catch (error) {
    console.error("[GET /api/perguntas] Erro ao buscar perguntas:", error);
    res.status(500).json({ error: "Erro interno no servidor ao buscar perguntas." });
  }
});

// ... O resto das rotas (resultados, ranking, etc.) continua igual ...

app.post("/api/resultados", checkFirebaseInitialized, async (req, res) => {
  // Código da rota de resultados
});

app.get("/api/ranking", checkFirebaseInitialized, async (req, res) => {
  // Código da rota de ranking
});

app.get("/", (req, res) => {
  res.json({ status: "Servidor rodando e pronto para receber requisições!", firebaseInitialized: adminInitialized });
});

module.exports = app;