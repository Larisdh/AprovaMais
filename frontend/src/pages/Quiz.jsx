import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { saveScore } from "../services/quizService";
import "./css/Quiz.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Quiz() {
  const navigate = useNavigate();
  const query = useQuery();
  const materia = query.get("materia");
  const quantidade = query.get("questions");

  const [perguntas, setPerguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState(null);

  useEffect(() => {
    const buscarPerguntas = async () => {
      try {
        setCarregando(true);
        const response = await fetch(`http://localhost:3000/api/perguntas?materia=${materia}&quantidade=${quantidade}`);
        if (!response.ok) throw new Error("Falha ao buscar perguntas");
        const data = await response.json();
        if (data.length === 0) {
          setErro("Nenhuma pergunta encontrada");
        } else {
          setPerguntas(data);
        }
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
        setErro("Erro ao carregar perguntas. Por favor, tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

    buscarPerguntas();
  }, [materia, quantidade]);

  useEffect(() => {
    const salvarResultado = async () => {
      if (quizFinalizado && resultadoFinal !== null) {
        try {
          const user = auth.currentUser;
          if (user) {
            const nome = user.displayName || user.email;
            await saveScore(nome, resultadoFinal);
            await fetch("http://localhost:3000/api/resultados", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.uid,
                acertos: resultadoFinal,
                total: perguntas.length,
                materia: materia || "Geral",
              }),
            });
          }
        } catch (error) {
          console.error("Erro ao salvar resultado:", error);
        }
      }
    };

    salvarResultado();
  }, [quizFinalizado, resultadoFinal, perguntas.length, materia]);

  function responder(indiceAlternativa) {
    if (!perguntas.length || respostaSelecionada !== null) return;

    const perguntaAtual = perguntas[indice];
    setRespostaSelecionada(indiceAlternativa);

    const acertou = indiceAlternativa === perguntaAtual.correta;
    const novaPontuacao = acertou ? acertos + 1 : acertos;
    if (acertou) setAcertos((prev) => prev + 1);

    setTimeout(() => {
      if (indice + 1 < perguntas.length) {
        setIndice((prev) => prev + 1);
        setRespostaSelecionada(null);
      } else {
        setResultadoFinal(novaPontuacao);
        setQuizFinalizado(true);
        alert(`Você acertou ${novaPontuacao} de ${perguntas.length} perguntas!`);      }
    }, 1000);
  }

  const styles = {
    body: {
      minHeight: "100vh",
      width: "100%",
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
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "0.5rem",
      borderBottom: "2px solid white",
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
      width: "75%",
      maxWidth: "40rem",
      margin: "1.5rem",
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
      backgroundColor: "#d5f3ff",
      color: "#0D6E9C",
    },
    saveButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "1.5rem",
      gap: "1rem",
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
      border: "none",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "300px",
    },
    progressIndicator: {
      fontSize: "1rem",
      margin: "1rem 0",
      color: "#0D6E9C",
    },
    errorMessage: {
      color: "#F44336",
      textAlign: "center",
      fontSize: "1rem",
      padding: "2rem",
    },
    resultContainer: {
      textAlign: "center",
      padding: "2rem",
    },
    resultTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#0D6E9C",
    },
    resultScore: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      color: "#0D6E9C",
    },
    resultButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
    },
  };

  // Proteção contra erro de índice
  if (!quizFinalizado && (!perguntas[indice] || indice >= perguntas.length)) {
    return (
      <div style={{ ...styles.body, padding: "2rem", color: "#F44336" }}>
        ⚠️ Erro inesperado: pergunta inválida ou fora do índice.
      </div>
    );
  }

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <span style={styles.title}>Quiz - {materia}</span>
        <nav style={styles.nav}>
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
            Página Inicial
          </Link>
          <Link to="/ranking" style={{ color: "white", textDecoration: "none" }}>
            Ranking
          </Link>
          <img src="/Logo.png" alt="Logo ENEM" style={styles.logo} />
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.questionContainer}>
          {carregando ? (
            <div style={styles.loadingContainer}>
              <div style={styles.progressIndicator}>Carregando perguntas...</div>
            </div>
          ) : erro ? (
            <div style={styles.errorMessage}>{erro}</div>
          ) : quizFinalizado ? (
            <div style={styles.resultContainer}>
              <h2 style={styles.resultTitle}>Quiz Finalizado</h2>
              <div style={styles.resultScore}>
                Você acertou {resultadoFinal} de {perguntas.length} perguntas!
              </div>
              <div style={styles.resultButtons}>
                <button onClick={() => navigate("/ranking")} style={styles.saveButton}>
                  Ver Ranking
                </button>
                <button
                  onClick={() => {
                    setIndice(0);
                    setAcertos(0);
                    setRespostaSelecionada(null);
                    setResultadoFinal(null);
                    setQuizFinalizado(false);
                    setPerguntas((prev) => [...prev.sort(() => Math.random() - 0.5)]);
                  }}
                  style={{ ...styles.saveButton, backgroundColor: "#4CAF50" }}
                >
                  Jogar Novamente
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={styles.questionText}>
                {perguntas[indice]?.textos?.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    {perguntas[indice].textos.map((texto, index) => (
                      <p key={index} style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                        {typeof texto === "object" ? texto.conteudo : texto}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div style={styles.optionsContainer}>
                {perguntas[indice]?.alternativas.map((alt, i) => (
                  <button
                    key={i}
                    onClick={() => responder(i)}
                    disabled={respostaSelecionada !== null}
                    style={{
                      ...styles.optionButton,
                      ...(respostaSelecionada === null
                        ? {}
                        : i === perguntas[indice].correta
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

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                Pergunta {indice + 1} de {perguntas.length}
              </div>

              <div style={styles.saveButtonContainer}>
                <button onClick={() => navigate("/ranking")} style={styles.saveButton}>
                  Ver Ranking
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}