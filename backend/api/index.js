// C:\AprovaMais-1\backend\api\index.js - VERSÃO CORRIGIDA

// -----------------------------------------------------------------------------
// Imports e Configurações Iniciais
// -----------------------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// -----------------------------------------------------------------------------
// Inicialização do Express App
// -----------------------------------------------------------------------------
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL_DEPLOYED || "*" }));
app.use(express.json());

// -----------------------------------------------------------------------------
// Inicialização do Firebase Admin SDK
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Middleware para verificar a inicialização do Firebase
// -----------------------------------------------------------------------------
const checkFirebaseInitialized = (req, res, next) => {
  if (!adminInitialized || !db) {
    console.error(`[${req.method} ${req.path}] Firebase Admin SDK não inicializado. Não é possível processar a requisição.`);
    return res.status(500).json({ error: "Erro interno no servidor: Serviço de banco de dados não configurado." });
  }
  next();
};

// -----------------------------------------------------------------------------
// Rotas da API
// -----------------------------------------------------------------------------

app.get("/api/perguntas", checkFirebaseInitialized, async (req, res) => {
  console.log(`[GET /api/perguntas] Recebida requisição com query:`, req.query);
  try {
    // Usamos 'let' para poder modificar a variável 'materia'
    let { materia, quantidade } = req.query;

    let query = db.collection("perguntas");
    if (materia) {
      // <<< CORREÇÃO AQUI >>>
      // Decodifica o parâmetro para lidar com acentos (ex: "Matem%C3%A1tica" vira "Matemática")
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

    console.log(`[GET /api/perguntas] ${perguntas.length} perguntas encontradas antes de limitar/embaralhar.`);

    if (quantidade && parseInt(quantidade) > 0) {
      const numQuantidade = parseInt(quantidade);
      perguntas = perguntas.sort(() => Math.random() - 0.5).slice(0, numQuantidade);
      console.log(`[GET /api/perguntas] Retornando ${perguntas.length} perguntas após limitar para ${numQuantidade}.`);
    }

    res.json(perguntas);
  } catch (error) {
    console.error("[GET /api/perguntas] Erro ao buscar perguntas:", error);
    res.status(500).json({ error: "Erro interno no servidor ao buscar perguntas." });
  }
});

app.post("/api/resultados", checkFirebaseInitialized, async (req, res) => {
  console.log(`[POST /api/resultados] Recebida requisição com corpo:`, req.body);
  try {
    const { userId, acertos, total, materia } = req.body;

    if (!userId || acertos === undefined || total === undefined || total <= 0) {
      console.warn("[POST /api/resultados] Dados incompletos ou inválidos:", req.body);
      return res.status(400).json({ error: "Dados incompletos ou inválidos. userId, acertos e total (maior que 0) são obrigatórios." });
    }

    let userSnapshot;
    try {
      userSnapshot = await admin.auth().getUser(userId);
    } catch (authError) {
      console.warn(`[POST /api/resultados] Usuário não encontrado no Firebase Auth: ${userId}`, authError.message);
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const percentual = (acertos / total) * 100;
    const materiaQuiz = materia || "Geral";

    const resultado = {
      userId,
      acertos,
      total,
      percentual: parseFloat(percentual.toFixed(2)),
      materia: materiaQuiz,
      dataHora: admin.firestore.FieldValue.serverTimestamp(),
    };

    const resultadoRef = await db.collection("resultados").add(resultado);
    console.log(`[POST /api/resultados] Resultado salvo na coleção 'resultados' com ID: ${resultadoRef.id}`);

    const userStatsRef = db.collection("estatisticas").doc(userId);
    const userStatsDoc = await userStatsRef.get();
    const nomeUsuario = userSnapshot.displayName || userSnapshot.email || "Usuário Anônimo";

    if (userStatsDoc.exists) {
      const dadosAtuais = userStatsDoc.data();
      const novasEstatisticas = {
        materias: {
          ...(dadosAtuais.materias || {}),
          [materiaQuiz]: {
            acertos: ((dadosAtuais.materias?.[materiaQuiz]?.acertos) || 0) + acertos,
            total: ((dadosAtuais.materias?.[materiaQuiz]?.total) || 0) + total,
          },
        },
        totalAcertos: (dadosAtuais.totalAcertos || 0) + acertos,
        totalPerguntas: (dadosAtuais.totalPerguntas || 0) + total,
        ultimaAtualizacao: admin.firestore.FieldValue.serverTimestamp(),
        nome: dadosAtuais.nome || nomeUsuario,
        email: dadosAtuais.email || userSnapshot.email,
      };
      await userStatsRef.update(novasEstatisticas);
      console.log(`[POST /api/resultados] Estatísticas do usuário ${userId} atualizadas.`);
    } else {
      const novasEstatisticas = {
        userId,
        nome: nomeUsuario,
        email: userSnapshot.email,
        totalAcertos: acertos,
        totalPerguntas: total,
        materias: {
          [materiaQuiz]: { acertos, total },
        },
        ultimaAtualizacao: admin.firestore.FieldValue.serverTimestamp(),
      };
      await userStatsRef.set(novasEstatisticas);
      console.log(`[POST /api/resultados] Estatísticas do usuário ${userId} criadas.`);
    }

    res.status(201).json({ message: "Resultado salvo com sucesso!", resultadoId: resultadoRef.id });
  } catch (error) {
    console.error("[POST /api/resultados] Erro ao salvar resultado:", error);
    res.status(500).json({ error: "Erro interno no servidor ao salvar resultado." });
  }
});

app.get("/api/ranking", checkFirebaseInitialized, async (req, res) => {
  console.log(`[GET /api/ranking] Recebida requisição.`);
  try {
    const snapshot = await db.collection("estatisticas")
      .orderBy("totalAcertos", "desc")
      .limit(10)
      .get();

    if (snapshot.empty) {
      console.log(`[GET /api/ranking] Nenhuma estatística encontrada para o ranking.`);
      return res.json([]);
    }

    const ranking = snapshot.docs.map((doc) => {
      const data = doc.data();
      const percentual = data.totalPerguntas > 0
        ? parseFloat(((data.totalAcertos / data.totalPerguntas) * 100).toFixed(2))
        : 0;
      return {
        id: doc.id,
        nome: data.nome || "Usuário Anônimo",
        totalAcertos: data.totalAcertos || 0,
        totalPerguntas: data.totalPerguntas || 0,
        percentual,
      };
    });
    console.log(`[GET /api/ranking] Ranking com ${ranking.length} usuários retornado.`);
    res.json(ranking);
  } catch (error) {
    console.error("[GET /api/ranking] Erro ao buscar ranking:", error);
    res.status(500).json({ error: "Erro interno no servidor ao buscar ranking." });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "Servidor rodando e pronto para receber requisições!", firebaseInitialized: adminInitialized });
});

module.exports = app;