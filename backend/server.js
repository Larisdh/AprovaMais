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

// CORREÇÃO E MELHORIA: Configuração de CORS mais segura
// Define as origens que podem fazer requisições para esta API
const allowedOrigins = [
  'https://aprova-mais.vercel.app', // URL de produção do seu frontend
  'http://localhost:5173',          // URL de desenvolvimento (ajuste se sua porta for outra, ex: 3000)
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (como Postman) ou se a origem está na lista permitida
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não permitido pela política de CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Habilita CORS com as opções específicas
app.use(express.json()); // Middleware para parsear JSON no corpo das requisições

// -----------------------------------------------------------------------------
// Inicialização do Firebase Admin SDK
// -----------------------------------------------------------------------------
try {
  // Para Vercel, é mais seguro usar variáveis de ambiente do que um arquivo .json
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require("./firebase-key.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✔️ Firebase Admin SDK inicializado com sucesso.");
} catch (error) {
  console.error("❌ Erro ao inicializar Firebase Admin SDK:", error);
  process.exit(1); // Encerra o processo se o Firebase não puder ser inicializado
}

const db = admin.firestore(); // Instância do Firestore

// -----------------------------------------------------------------------------
// Rotas da API
// -----------------------------------------------------------------------------

/**
 * Rota para obter perguntas filtradas por matéria e quantidade.
 */
app.get("/perguntas", async (req, res) => {
  console.log(`[GET /perguntas] Recebida requisição com query:`, req.query);
  try {
    const { materia, quantidade } = req.query;

    let query = db.collection("perguntas");
    if (materia) {
      console.log(`[GET /perguntas] Filtrando por matéria: ${materia}`);
      query = query.where("materia", "==", materia);
    }

    const snapshot = await query.get();
    if (snapshot.empty) {
      console.log(`[GET /perguntas] Nenhuma pergunta encontrada para os critérios.`);
      return res.json([]);
    }

    let perguntas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`[GET /perguntas] ${perguntas.length} perguntas encontradas antes de limitar/embaralhar.`);

    if (quantidade && parseInt(quantidade) > 0) {
      const numQuantidade = parseInt(quantidade);
      perguntas = perguntas.sort(() => Math.random() - 0.5).slice(0, numQuantidade);
      console.log(`[GET /perguntas] Retornando ${perguntas.length} perguntas após limitar para ${numQuantidade}.`);
    }

// ... continuação do código anterior ...
    res.json(perguntas);
  } catch (error) {
    console.error("[GET /perguntas] Erro ao buscar perguntas:", error);
    res.status(500).json({ error: "Erro interno no servidor ao buscar perguntas." });
  }
});

/**
 * Rota para salvar o resultado de um quiz e atualizar estatísticas do usuário.
 */
app.post("/resultados", async (req, res) => {
  console.log(`[POST /resultados] Recebida requisição com corpo:`, req.body);
  try {
    const { userId, acertos, total, materia } = req.body;

    if (!userId || acertos === undefined || total === undefined || total <= 0) {
      console.warn("[POST /resultados] Dados incompletos ou inválidos:", req.body);
      return res.status(400).json({ error: "Dados incompletos ou inválidos. userId, acertos e total (maior que 0) são obrigatórios." });
    }

    let userSnapshot;
    try {
      userSnapshot = await admin.auth().getUser(userId);
    } catch (authError) {
      console.warn(`[POST /resultados] Usuário não encontrado no Firebase Auth: ${userId}`, authError.message);
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
    console.log(`[POST /resultados] Resultado salvo na coleção 'resultados' com ID: ${resultadoRef.id}`);

    const userStatsRef = db.collection("estatisticas").doc(userId);
    const userStatsDoc = await userStatsRef.get();
    const nomeUsuario = userSnapshot.displayName || userSnapshot.email || "Usuário Anônimo";

    if (userStatsDoc.exists) {
      const dadosAtuais = userStatsDoc.data();
      await userStatsRef.update({
        'materias': {
          ...dadosAtuais.materias,
          [materiaQuiz]: {
            acertos: (dadosAtuais.materias?.[materiaQuiz]?.acertos || 0) + acertos,
            total: (dadosAtuais.materias?.[materiaQuiz]?.total || 0) + total,
          },
        },
        'totalAcertos': admin.firestore.FieldValue.increment(acertos),
        'totalPerguntas': admin.firestore.FieldValue.increment(total),
        'ultimaAtualizacao': admin.firestore.FieldValue.serverTimestamp(),
        'nome': dadosAtuais.nome || nomeUsuario,
        'email': dadosAtuais.email || userSnapshot.email,
      });
      console.log(`[POST /resultados] Estatísticas do usuário ${userId} atualizadas.`);
    } else {
      await userStatsRef.set({
        userId,
        nome: nomeUsuario,
        email: userSnapshot.email,
        totalAcertos: acertos,
        totalPerguntas: total,
        materias: {
          [materiaQuiz]: { acertos, total },
        },
        ultimaAtualizacao: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`[POST /resultados] Estatísticas do usuário ${userId} criadas.`);
    }

    res.status(201).json({ message: "Resultado salvo com sucesso!", resultadoId: resultadoRef.id });
  } catch (error) {
    console.error("[POST /resultados] Erro ao salvar resultado:", error);
    res.status(500).json({ error: "Erro interno no servidor ao salvar resultado." });
  }
});

/**
 * Rota para obter o ranking geral dos usuários.
 * Busca dados da coleção 'estatisticas'.
 * Retorna os top 10 usuários por total de acertos.
 */
app.get("/ranking", async (req, res) => {
  console.log(`[GET /ranking] Recebida requisição.`);
  try {
    const snapshot = await db.collection("estatisticas")
      .orderBy("totalAcertos", "desc")
      .limit(10)
      .get();

    if (snapshot.empty) {
      console.log(`[GET /ranking] Nenhuma estatística encontrada para o ranking.`);
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
    console.log(`[GET /ranking] Ranking com ${ranking.length} usuários retornado.`);
    res.json(ranking);
  } catch (error) {
    console.error("[GET /ranking] Erro ao buscar ranking:", error);
    res.status(500).json({ error: "Erro interno no servidor ao buscar ranking." });
  }
});

// -----------------------------------------------------------------------------
// Inicialização do Servidor
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}!`);
  console.log(`🔗 API de Perguntas disponível em: http://localhost:${PORT}/api/perguntas`);
  console.log(`🔗 API de Ranking disponível em: http://localhost:${PORT}/api/ranking`);
});