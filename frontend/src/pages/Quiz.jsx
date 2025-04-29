import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const perguntas = [
  {
    pergunta:
      "Em uma cidade, os impostos que incidem sobre o consumo de energia elétrica residencial são de 30% sobre o custo do consumo mensal. O valor total da conta a ser paga no mês é o valor cobrado pelo consumo acrescido dos impostos. Considerando x o valor total da conta mensal de uma determinada residência e y o valor dos impostos, qual é a expressão algébrica que relaciona x e y?",
    alternativas: [
      "y = 0,3x / 1,3",
      "y = 0,3x",
      "y = x / 1,3",
      "y = 1,3x / 0,3",
      "y = 0,7x",
    ],
    correta: 1,
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);

  const perguntaAtual = perguntas[indice];

  function responder(indiceAlternativa) {
    setRespostaSelecionada(indiceAlternativa);
    if (indiceAlternativa === perguntaAtual.correta) {
      setAcertos(acertos + 1);
    }
    setTimeout(() => {
      if (indice + 1 < perguntas.length) {
        setIndice(indice + 1);
        setRespostaSelecionada(null);
      } else {
        alert(
          `Você acertou ${
            acertos + (indiceAlternativa === perguntaAtual.correta ? 1 : 0)
          } de ${perguntas.length} perguntas!`
        );
      }
    }, 1000);
  }

  const styles = {
    body: {
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#B9DCF3",
      backgroundImage: "url('/imagem-fundo-enem.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Sans-serif",
    },
    header: {
      backgroundColor: "#0a518e",
      color: "white",
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomLeftRadius: "1rem",
      borderBottomRightRadius: "1rem",
      boxShadow: "0 4px 6px rgba(227, 203, 203, 0.1)",
    },
    nav: {
      display: "flex",
      gap: "2rem",
      alignItems: "center",
      fontSize: "1rem",
    },
    logo: {
      height: "5rem",
    },
    search: {
      padding: "0.5rem",
      borderRadius: "0.5rem",
      border: "1px solid #ccc", // Adicionado borda
      fontSize: "1rem",
      backgroundColor: "white", // Fundo branco
      color: "#333",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "0.5rem",
      borderBottom: "2px solid white", // Traço embaixo do título
      display: "inline-block",
    },
    main: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1.5rem",
      width: "100%",
    },
    questionContainer: {
      backgroundColor: "white",
      color: "#0D6E9C",
      width: "100%",
      maxWidth: "40rem",
      padding: "1.5rem",
      borderRadius: "1.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    questionText: {
      fontSize: "1rem",
      textAlign: "left",
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginTop: "1.5rem",
    },
    optionButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "1rem",
      borderRadius: "9999px",
      border: "2px solid #0D6E9C",
      fontWeight: "bold",
      fontSize: "1rem",
      textAlign: "left",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
      backgroundColor: "#d5f3ff", // Cor de fundo alterada
      color: "#0D6E9C", // Cor do texto
    },
    saveButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "1.5rem",
    },
    saveButton: {
      backgroundColor: "#0D6E9C",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "9999px",
      fontWeight: "bold",
      fontSize: "1rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  return (
    <div style={styles.body}>
      {/* Cabeçalho */}
      <header style={styles.header}>
        <span style={styles.title}>Quiz</span>
        <nav style={styles.nav}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Página Inicial
          </Link>
          <Link to="/perfil" style={{ color: "white", textDecoration: "none" }}>
            Perfil
          </Link>
          <input
            type="text"
            placeholder="Buscar..."
            style={styles.search}
          />
          <img src="/Logo.png" alt="Logo ENEM" style={styles.logo} />
        </nav>
      </header>

      {/* Corpo principal com pergunta */}
      <main style={styles.main}>
        <div style={styles.questionContainer}>
          <p style={styles.questionText}>{perguntaAtual.pergunta}</p>

          {/* Alternativas */}
          <div style={styles.optionsContainer}>
            {perguntaAtual.alternativas.map((alt, i) => (
              <button
                key={i}
                onClick={() => responder(i)}
                disabled={respostaSelecionada !== null}
                style={{
                  ...styles.optionButton,
                  ...(respostaSelecionada === null
                    ? {}
                    : i === perguntaAtual.correta
                    ? { backgroundColor: "#4CAF50", color: "white" }
                    : i === respostaSelecionada
                    ? { backgroundColor: "#F44336", color: "white" }
                    : { backgroundColor: "#E0E0E0", color: "#9E9E9E" }),
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {String.fromCharCode(65 + i)}){" "}
                </span>
                {alt}
              </button>
            ))}
          </div>

          {/* Botão de salvar resposta */}
          <div style={styles.saveButtonContainer}>
            <button
              onClick={() => alert("Resposta salva!")}
              style={styles.saveButton}
            >
              SALVAR RESPOSTA
            </button>
            <button
              onClick={() => navigate("/ranking")}
              style={styles.saveButton}
            >
              Ver Classificação
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}