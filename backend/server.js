const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// Inicialização do Firebase Admin
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Rota para obter perguntas
app.get("/api/perguntas", async (req, res) => {
  try {
    const snapshot = await db.collection("perguntas").get();
    const perguntas = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        pergunta: data.pergunta,
        alternativas: data.alternativas,
        correta: data.correta,
        materia: data.materia || "Geral" // Adicionando campo matéria com valor padrão
      };
    });
    res.json(perguntas);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    res.status(500).json({ error: "Erro ao buscar perguntas" });
  }
});

// Rota para salvar resultado de um quiz
app.post("/api/resultados", async (req, res) => {
  try {
    const { userId, acertos, total, materia } = req.body;
    
    if (!userId || acertos === undefined || !total) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    // Verificar se o usuário existe
    const userSnapshot = await admin.auth().getUser(userId).catch(() => null);
    if (!userSnapshot) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Salvar o resultado
    const resultado = {
      userId,
      acertos,
      total,
      percentual: (acertos / total) * 100,
      materia: materia || "Geral",
      dataHora: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection("resultados").add(resultado);

    // Atualizar ou criar estatísticas do usuário
    const userStatsRef = db.collection("estatisticas").doc(userId);
    const userStats = await userStatsRef.get();

    if (userStats.exists) {
      // Atualizar estatísticas existentes
      const dados = userStats.data();
      const materiaAtual = materia || "Geral";
      
      if (!dados.materias) {
        dados.materias = {};
      }
      
      if (!dados.materias[materiaAtual]) {
        dados.materias[materiaAtual] = { acertos: 0, total: 0 };
      }
      
      dados.materias[materiaAtual].acertos += acertos;
      dados.materias[materiaAtual].total += total;
      dados.totalAcertos = (dados.totalAcertos || 0) + acertos;
      dados.totalPerguntas = (dados.totalPerguntas || 0) + total;
      
      await userStatsRef.update(dados);
    } else {
      // Criar novas estatísticas
      const novosDados = {
        userId,
        nome: userSnapshot.displayName || "Usuário",
        email: userSnapshot.email,
        totalAcertos: acertos,
        totalPerguntas: total,
        materias: {
          [materia || "Geral"]: {
            acertos: acertos,
            total: total
          }
        },
        ultimaAtualizacao: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await userStatsRef.set(novosDados);
    }

    res.status(201).json({ message: "Resultado salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar resultado:", error);
    res.status(500).json({ error: "Erro ao salvar resultado" });
  }
});

// Rota para obter ranking geral
app.get("/api/ranking", async (req, res) => {
  try {
    const snapshot = await db.collection("estatisticas")
      .orderBy("totalAcertos", "desc")
      .limit(10)
      .get();
    
    const ranking = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nome: data.nome,
        email: data.email,
        totalAcertos: data.totalAcertos,
        totalPerguntas: data.totalPerguntas,
        percentual: data.totalPerguntas > 0 ? 
          (data.totalAcertos / data.totalPerguntas) * 100 : 0
      };
    });
    
    res.json(ranking);
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    res.status(500).json({ error: "Erro ao buscar ranking" });
  }
});

// Rota para obter estatísticas de um usuário específico
app.get("/api/usuarios/:userId/estatisticas", async (req, res) => {
  try {
    const { userId } = req.params;
    const userStatsRef = db.collection("estatisticas").doc(userId);
    const userStats = await userStatsRef.get();
    
    if (!userStats.exists) {
      return res.status(404).json({ error: "Estatísticas não encontradas" });
    }
    
    res.json(userStats.data());
  } catch (error) {
    console.error("Erro ao buscar estatísticas do usuário:", error);
    res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));