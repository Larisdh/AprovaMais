const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json"); // certifique-se que está correto

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const perguntas = [
  {
    pergunta: "Qual é a capital do Brasil?",
    opcoes: ["Brasília", "São Paulo", "Rio de Janeiro", "Salvador"],
    correta: "Brasília",
    categoria: "Geografia",
  },
  {
    pergunta: "Quem descobriu o Brasil?",
    opcoes: ["Pedro Álvares Cabral", "Dom Pedro I", "Tiradentes", "Cabralinho"],
    correta: "Pedro Álvares Cabral",
    categoria: "História",
  },
  {
    pergunta: "Qual é o resultado de 9 x 7?",
    opcoes: ["56", "63", "72", "69"],
    correta: "63",
    categoria: "Matemática",
  },
  {
    pergunta: "Qual elemento tem o símbolo químico 'O'?",
    opcoes: ["Ouro", "Oxigênio", "Ósmio", "Prata"],
    correta: "Oxigênio",
    categoria: "Química",
  },
  {
    pergunta: "Quem escreveu Dom Casmurro?",
    opcoes: ["Machado de Assis", "José de Alencar", "Carlos Drummond", "Manuel Bandeira"],
    correta: "Machado de Assis",
    categoria: "Literatura",
  }
];

// Função para inserir
async function inserirPerguntas() {
  const batch = db.batch();

  perguntas.forEach((pergunta) => {
    const docRef = db.collection("perguntas").doc(); // ID automático
    batch.set(docRef, pergunta);
  });

  await batch.commit();
  console.log("✅ Perguntas inseridas com sucesso!");
}

inserirPerguntas().catch(console.error);