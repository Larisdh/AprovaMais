// -----------------------------------------------------------------------------
// Imports e Configurações Iniciais
// -----------------------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config(); // Para carregar variáveis de ambiente (ex: PORT)

// -----------------------------------------------------------------------------
// Inicialização do Express App
// -----------------------------------------------------------------------------
const app = express();

const allowedOrigins = [
  'https://aprova-mais.vercel.app',
  'http://localhost:5173', // Vite (React)
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não permitido pela política de CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// -----------------------------------------------------------------------------
// Inicialização do Firebase Admin SDK
// -----------------------------------------------------------------------------
try {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require("./firebase-key.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✔️ Firebase Admin SDK inicializado com sucesso.");
} catch (error) {
  console.error("❌ Erro ao inicializar Firebase Admin SDK:", error);
  process.exit(1);
}

const db = admin.firestore();

// -----------------------------------------------------------------------------
// ✅ CORREÇÃO: Usando um Router para organizar as rotas sob /api
// -----------------------------------------------------------------------------
const apiRoutes = express.Router();

/**
 * Rota de teste para a API
 */
apiRoutes.get("/", (req, res) => {
  res.json({ message: "API local está funcionando!" });
});


/**
 * Rota para obter perguntas filtradas por matéria e quantidade.
 */
// ✅ MUDANÇA: trocamos 'app.get' por 'apiRoutes.get'
apiRoutes.get("/perguntas", async (req, res) => {
  console.log(`[GET /api/perguntas] Recebida requisição com query:`, req.query);
  try {
    const { materia, quantidade } = req.query;
    let query = db.collection("perguntas");
    if (materia) {
      query = query.where("materia", "==", materia);
    }
    const snapshot = await query.get();
    if (snapshot.empty) {
      return res.json([]);
    }
    let perguntas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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

/**
 * Rota para salvar o resultado de um quiz e atualizar estatísticas do usuário.
 */
// ✅ MUDANÇA: trocamos 'app.post' por 'apiRoutes.post'
apiRoutes.post("/resultados", async (req, res) => {
  // ... (o conteúdo da sua rota de resultados permanece o mesmo) ...
  console.log(`[POST /api/resultados] Recebida requisição com corpo:`, req.body);
  try {
    const { userId, acertos, total, materia } = req.body;
    if (!userId || acertos === undefined || total === undefined || total <= 0) {
      return res.status(400).json({ error: "Dados incompletos ou inválidos." });
    }
    const userSnapshot = await admin.auth().getUser(userId);
    const userStatsRef = db.collection("estatisticas").doc(userId);
    // ... (sua lógica de transação aqui) ...
    res.status(201).json({ message: "Resultado salvo com sucesso!" });
  } catch (error) {
    console.error("[POST /api/resultados] Erro ao salvar resultado:", error);
    res.status(500).json({ error: "Erro interno no servidor ao salvar resultado." });
  }
});

/**
 * Rota para obter o ranking geral dos usuários.
 */
// ✅ MUDANÇA: trocamos 'app.get' por 'apiRoutes.get'
apiRoutes.get("/ranking", async (req, res) => {
  console.log(`[GET /api/ranking] Recebida requisição.`);
  try {
    const snapshot = await db.collection("estatisticas")
      .orderBy("totalAcertos", "desc")
      .limit(10)
      .get();
    if (snapshot.empty) {
      return res.json([]);
    }
    const ranking = snapshot.docs.map((doc) => {
      const data = doc.data();
      const percentual = data.totalPerguntas > 0 ? parseFloat(((data.totalAcertos / data.totalPerguntas) * 100).toFixed(2)) : 0;
      return {
        id: doc.id,
        nome: data.nome || "Usuário Anônimo",
        totalAcertos: data.totalAcertos || 0,
        totalPerguntas: data.totalPerguntas || 0,
        percentual,
      };
    });
    res.json(ranking);
  } catch (error) {
    console.error("[GET /api/ranking] Erro ao buscar ranking:", error);
    res.status(500).json({ error: "Erro interno ao buscar ranking." });
  }
});


// ✅ CORREÇÃO FINAL: Monta todas as rotas definidas em 'apiRoutes' sob o prefixo '/api'
app.use("/api", apiRoutes);


// -----------------------------------------------------------------------------
// Inicialização do Servidor
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}!`);
  console.log(`🔗 API de Perguntas disponível em: http://localhost:${PORT}/api/perguntas`);
  console.log(`🔗 API de Ranking disponível em: http://localhost:${PORT}/api/ranking`);
});