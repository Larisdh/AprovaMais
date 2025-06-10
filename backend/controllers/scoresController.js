// Controller para gerenciar as pontuações
const admin = require("firebase-admin");
const db = admin.firestore();

const scoresController = {
  // Criar nova pontuação
  create: async (req, res) => {
    try {
      const { user, pontos } = req.body;
      
      if (!user || pontos === undefined) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      // Salvar pontuação
      const novoScore = {
        user,
        pontos,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      };

      await db.collection("scores").add(novoScore);
      
      console.log(`Pontuação salva: ${user} - ${pontos} pontos`);
      res.status(201).json({ message: "Pontuação salva com sucesso" });
    } catch (error) {
      console.error("Erro ao salvar pontuação:", error);
      res.status(500).json({ error: "Erro ao salvar pontuação" });
    }
  },

  // Listar top pontuações
  listTop: async (req, res) => {
    try {
      console.log("🔍 Iniciando consulta ao ranking...");
      const snapshot = await db.collection("scores")
        .orderBy("pontos", "desc")
        .limit(10)
        .get();
      
      console.log("🔍 Dados obtidos do Firebase:", snapshot.size);
  
      const ranking = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log("🔍 Documento:", data);
        return {
          id: doc.id,
          user: data.user,
          pontos: data.pontos,
          timestamp: data.timestamp ? data.timestamp.toDate() : null
        };
      });
  
      console.log("✅ Ranking montado:", ranking);
      res.json(ranking);
    } catch (error) {
      console.error("❌ Erro ao buscar ranking:", error);
      res.status(500).json({ error: "Erro ao buscar ranking" });
    }
  },
};

module.exports = scoresController;