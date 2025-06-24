// /api/index.js (Backend - Versão Final para Vercel)

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

// --- Configuração de CORS (Melhorada) ---
// Lista de origens permitidas
const allowedOrigins = [
  process.env.FRONTEND_URL_DEPLOYED, // URL do seu frontend em produção (ex: https://aprova-mais.vercel.app)
  'http://localhost:5173',          // URL do seu frontend em desenvolvimento local
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem 'origin' (ex: Postman) ou se a origem estiver na lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Acesso não permitido pela política de CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Inicialização do Firebase Admin SDK ---
let db;
// Verifica se o app já foi inicializado para evitar erros durante o hot-reload da Vercel
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✔️ Firebase Admin SDK inicializado com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao inicializar Firebase Admin SDK:", error.message);
  }
}
db = admin.firestore();

// --- Rotas da API ---

// Rota de teste para verificar o status do servidor
app.get("/", (req, res) => {
  res.json({ 
    status: "Servidor rodando", 
    firebaseInitialized: !!admin.apps.length 
  });
});

// --- Rota de Perguntas ---
app.get("/api/perguntas", async (req, res) => {
  if (!db) return res.status(500).json({ error: "Erro interno: BD não configurado." });
  console.log(`[GET /perguntas] Query recebida:`, req.query);
  try {
    let { materia, quantidade } = req.query;
    let query = db.collection("perguntas");

    if (materia) {
      const materiaParaBusca = decodeURIComponent(materia).toLowerCase();
      console.log(`[GET /perguntas] Filtrando por matéria (padronizada): ${materiaParaBusca}`);
      query = query.where("materia", "==", materiaParaBusca);
    }

    const snapshot = await query.get();
    if (snapshot.empty) {
      console.log(`[GET /perguntas] Nenhuma pergunta encontrada.`);
      return res.json([]);
    }

    let perguntas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (quantidade && parseInt(quantidade) > 0) {
      const numQuantidade = parseInt(quantidade);
      perguntas = perguntas.sort(() => 0.5 - Math.random()).slice(0, numQuantidade);
    }
    res.json(perguntas);
  } catch (error) {
    console.error("[GET /perguntas] Erro ao buscar perguntas:", error);
    res.status(500).json({ error: "Erro interno ao buscar perguntas." });
  }
});


// --- Rota para Salvar Resultados ---
// Lógica copiada do seu server.js anterior
app.post("/resultados", async (req, res) => {
  if (!db) return res.status(500).json({ error: "Erro interno: BD não configurado." });
  console.log(`[POST /resultados] Recebida requisição com corpo:`, req.body);
  try {
    const { userId, acertos, total, materia } = req.body;
    if (!userId || acertos === undefined || total === undefined || total <= 0) {
      return res.status(400).json({ error: "Dados incompletos ou inválidos." });
    }

    const userSnapshot = await admin.auth().getUser(userId);
    const nomeUsuario = userSnapshot.displayName || userSnapshot.email || "Usuário Anônimo";
    
    const userStatsRef = db.collection("estatisticas").doc(userId);
    // Lógica para atualizar/criar estatísticas... (seu código estava ótimo)
    // Usando uma transação para garantir a consistência dos dados
    await db.runTransaction(async (transaction) => {
      const userStatsDoc = await transaction.get(userStatsRef);
      if (userStatsDoc.exists) {
        transaction.update(userStatsRef, {
            totalAcertos: admin.firestore.FieldValue.increment(acertos),
            totalPerguntas: admin.firestore.FieldValue.increment(total),
            ultimaAtualizacao: admin.firestore.FieldValue.serverTimestamp(),
        });
      } else {
        transaction.set(userStatsRef, {
            userId,
            nome: nomeUsuario,
            email: userSnapshot.email,
            totalAcertos: acertos,
            totalPerguntas: total,
            ultimaAtualizacao: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    });

    res.status(201).json({ message: "Resultado salvo com sucesso!" });
  } catch (error) {
    console.error("[POST /resultados] Erro ao salvar resultado:", error);
    if(error.code === 'auth/user-not-found') {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(500).json({ error: "Erro interno no servidor ao salvar resultado." });
  }
});


// --- Rota do Ranking ---
// Lógica copiada do seu server.js anterior
app.get("/api/ranking", async (req, res) => {
  if (!db) return res.status(500).json({ error: "Erro interno: BD não configurado." });
  console.log(`[GET /ranking] Recebida requisição.`);
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
      const percentual = data.totalPerguntas > 0 ? (data.totalAcertos / data.totalPerguntas) * 100 : 0;
      return {
        id: doc.id,
        nome: data.nome || "Usuário Anônimo",
        totalAcertos: data.totalAcertos || 0,
        totalPerguntas: data.totalPerguntas || 0,
        percentual: parseFloat(percentual.toFixed(2)),
      };
    });
    res.json(ranking);
  } catch (error) {
    console.error("[GET /ranking] Erro ao buscar ranking:", error);
    res.status(500).json({ error: "Erro interno ao buscar ranking." });
  }
});

// Exporta o app para a Vercel
module.exports = app;