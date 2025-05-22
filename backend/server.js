const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicialização do Firebase Admin
const serviceAccount = require("./firebase-key.json"); // Certifique-se que este caminho está correto
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Importar rotas
const scoresRouter = require("./routes/scores"); // Se você tiver este arquivo de rotas

// Aplicar rotas
app.use("/api/scores", scoresRouter); // Se você tiver este arquivo de rotas

// Rota atualizada para obter perguntas filtradas por matéria e quantidade
app.get("/api/perguntas", async (req, res) => {
  try {
    const { materia, quantidade } = req.query;

    let query = db.collection("perguntas");
    if (materia) {
      query = query.where("materia", "==", materia);
    }

    const snapshot = await query.get();
    let perguntas = snapshot.docs.map((doc) => {
      const data = doc.data();
      // Ajustado para corresponder à estrutura dos JSONs corrigidos
      return {
        id: doc.id,
        textos: data.textos || [], // O frontend espera 'textos' como um array
        alternativas: data.alternativas || [], // O frontend espera 'alternativas' como um array
        correta: data.correta,
        materia: data.materia || "",
        explicacao: data.explicacao || ""
        // O campo 'pergunta' (data.pergunta) foi removido daqui, pois o conteúdo principal
        // da pergunta deve estar dentro do array 'textos' conforme a estrutura do frontend.
        // Se você ainda tiver um campo 'pergunta' separado no Firestore e quiser combiná-lo:
        // textos: data.pergunta ? [data.pergunta, ...(data.textos || [])] : (data.textos || []),
        // Mas pela nossa correção dos JSONs, o enunciado já está em 'data.textos[0]'
      };
    });

    // Embaralhar perguntas e limitar se necessário
    if (quantidade && parseInt(quantidade) > 0) { // Adicionado verificação para quantidade > 0
      perguntas = perguntas.sort(() => Math.random() - 0.5).slice(0, parseInt(quantidade));
    } else if (quantidade === undefined || parseInt(quantidade) <= 0) {
      // Se quantidade não for fornecida ou for inválida, pode-se optar por retornar todas ou um número padrão
      // Aqui, estou mantendo o comportamento de retornar todas se a quantidade for inválida/ausente após o filtro de matéria
      // Ou você pode adicionar um limite padrão:
      // perguntas = perguntas.sort(() => Math.random() - 0.5).slice(0, 10); // Exemplo: padrão de 10
    }


    if (perguntas.length === 0 && materia) {
        // Se nenhuma pergunta foi encontrada para a matéria específica,
        // você pode querer retornar um array vazio em vez de um erro,
        // ou uma mensagem específica. O frontend já trata data.length === 0.
        console.log(`Nenhuma pergunta encontrada para a matéria: ${materia}`);
    }

    res.json(perguntas);
  } catch (error) {
    console.error("Erro ao buscar perguntas no servidor:", error); // Log de erro mais específico
    res.status(500).json({ error: "Erro interno no servidor ao buscar perguntas." }); // Mensagem mais genérica para o cliente
  }
});

// Rota para salvar resultado do quiz
app.post("/api/resultados", async (req, res) => {
  try {
    const { userId, acertos, total, materia } = req.body;

    if (!userId || acertos === undefined || total === undefined || total <= 0) { // Verificação de 'total'
      return res.status(400).json({ error: "Dados incompletos ou inválidos" });
    }

    // Verificar se o usuário existe
    const userSnapshot = await admin.auth().getUser(userId).catch((err) => {
      console.error("Erro ao buscar usuário no Firebase Auth:", err);
      return null;
    });
    if (!userSnapshot) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const percentual = total > 0 ? (acertos / total) * 100 : 0; // Evitar divisão por zero

    const resultado = {
      userId,
      acertos,
      total,
      percentual,
      materia: materia || "Geral",
      dataHora: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("resultados").add(resultado);
    console.log("Resultado salvo com ID:", docRef.id);


    // Atualizar ou criar estatísticas
    const userStatsRef = db.collection("estatisticas").doc(userId);
    const userStatsDoc = await userStatsRef.get(); // Renomeado para userStatsDoc para clareza

    const materiaAtual = materia || "Geral";

    if (userStatsDoc.exists) {
      const dados = userStatsDoc.data();
      
      // Inicializar campos se não existirem
      if (!dados.materias) dados.materias = {};
      if (!dados.materias[materiaAtual]) dados.materias[materiaAtual] = { acertos: 0, total: 0 };
      
      dados.materias[materiaAtual].acertos = (dados.materias[materiaAtual].acertos || 0) + acertos;
      dados.materias[materiaAtual].total = (dados.materias[materiaAtual].total || 0) + total;
      dados.totalAcertos = (dados.totalAcertos || 0) + acertos;
      dados.totalPerguntas = (dados.totalPerguntas || 0) + total;
      dados.ultimaAtualizacao = admin.firestore.FieldValue.serverTimestamp();

      await userStatsRef.update(dados);
      console.log("Estatísticas do usuário atualizadas:", userId);
    } else {
      const novasEstatisticas = {
        userId,
        nome: userSnapshot.displayName || userSnapshot.email || "Usuário Anônimo", // Melhor fallback para nome
        email: userSnapshot.email,
        totalAcertos: acertos,
        totalPerguntas: total,
        materias: {
          [materiaAtual]: {
            acertos,
            total,
          },
        },
        ultimaAtualizacao: admin.firestore.FieldValue.serverTimestamp(),
      };
      await userStatsRef.set(novasEstatisticas);
      console.log("Estatísticas do usuário criadas:", userId);
    }

    res.status(201).json({ message: "Resultado salvo com sucesso", resultadoId: docRef.id });
  } catch (error) {
    console.error("Erro ao salvar resultado no servidor:", error);
    res.status(500).json({ error: "Erro interno no servidor ao salvar resultado." });
  }
});

// Rota para ranking geral (estatísticas)
app.get("/api/ranking", async (req, res) => {
  try {
    const snapshot = await db.collection("estatisticas")
      .orderBy("totalAcertos", "desc")
      .limit(10) // Você pode querer tornar este limite configurável via query param
      .get();

    const ranking = snapshot.docs.map((doc) => {
      const data = doc.data();
      const percentual = data.totalPerguntas > 0
          ? parseFloat(((data.totalAcertos / data.totalPerguntas) * 100).toFixed(2)) // Arredondar percentual
          : 0;
      return {
        id: doc.id, // ou userId, se preferir
        nome: data.nome || "Usuário Anônimo",
        // email: data.email, // Considere se realmente precisa expor o email no ranking público
        totalAcertos: data.totalAcertos || 0,
        totalPerguntas: data.totalPerguntas || 0,
        percentual,
      };
    });

    res.json(ranking);
  } catch (error) {
    console.error("Erro ao buscar ranking no servidor:", error);
    res.status(500).json({ error: "Erro interno no servidor ao buscar ranking." });
  }
});

// Rota para estatísticas por usuário
app.get("/api/usuarios/:userId/estatisticas", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "ID do usuário não fornecido."});
    }
    const userStatsRef = db.collection("estatisticas").doc(userId);
    const userStatsDoc = await userStatsRef.get();

    if (!userStatsDoc.exists) {
      return res.status(404).json({ error: "Estatísticas não encontradas para este usuário." });
    }

    res.json(userStatsDoc.data());
  } catch (error) {
    console.error("Erro ao buscar estatísticas do usuário no servidor:", error);
    res.status(500).json({ error: "Erro interno no servidor ao buscar estatísticas do usuário." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`)); // Mensagem um pouco mais amigável