const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json"); // certifique-se que está correto

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const perguntas = [
  {
    pergunta: "Qual é o valor de π (pi) arredondado para duas casas decimais?",
    opcoes: {
      0: "3,12",
      1: "3,14",
      2: "3,16",
      3: "3,18"
    },
    correta: 1, 
  },
  {
    pergunta: "Em um triângulo retângulo, qual é a relação entre os lados segundo o Teorema de Pitágoras?",
    opcoes: {
      0: "a² = b² + c²",
      1: "a² + b² = c²",
      2: "a × b = c²",
      3: "a + b + c = 180°"
    },
    correta: 1,
  },
  {
    pergunta: "Qual é a fórmula para calcular a área de um círculo?",
    opcoes: {
      0: "A = 2πr",
      1: "A = πr",
      2: "A = πr²",
      3: "A = 2πr²"
    },
    correta: 2,
  },
  {
    pergunta: "Se log₁₀(x) = 2, então x é igual a:",
    opcoes: {
      0: "20",
      1: "100",
      2: "200",
      3: "1000"
    },
    correta: 1,
  },
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