const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json"); // certifique-se que está correto

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const perguntas = [

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