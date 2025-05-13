import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Importando auth para identificar o usuário

export default function Quiz() {
  const navigate = useNavigate();
  const [perguntas, setPerguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Buscar perguntas da API ao carregar o componente
  useEffect(() => {
    const buscarPerguntas = async () => {
      try {
        setCarregando(true);
        const response = await fetch("http://localhost:3000/api/perguntas");
        
        if (!response.ok) {
          throw new Error("Falha ao buscar perguntas");
        }
        
        const data = await response.json();
        
        if (data.length === 0) {
          setErro("Nenhuma pergunta encontrada");
        } else {
          setPerguntas(data);
        }
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
        setErro("Erro ao carregar perguntas. Por favor, tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    };

    buscarPerguntas();
  }, []);

  // Função para responder pergunta
  function responder(indiceAlternativa) {
    if (!perguntas.length || respostaSelecionada !== null) return;
    
    const perguntaAtual = perguntas[indice];
    setRespostaSelecionada(indiceAlternativa);
    
    if (indiceAlternativa === perguntaAtual.correta) {
      setAcertos(acertos + 1);
    }
    
    setTimeout(() => {
      if (indice + 1 < perguntas.length) {
        // Vai para próxima pergunta
        setIndice(indice + 1);
        setRespostaSelecionada(null);
      } else {
        // Salva o resultado no Firestore (implementar em versão futura)
        const resultadoFinal = acertos + (indiceAlternativa === perguntaAtual.correta ? 1 : 0);
        alert(`Você acertou ${resultadoFinal} de ${perguntas.length} perguntas!`);
        
        // Aqui poderia ser implementado o envio do resultado para o backend
        // salvarResultado(resultadoFinal);
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
      border: "1px solid #ccc",
      fontSize: "1rem",
      backgroundColor: "white",
      color: "#333",
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
    }
  };

  return (
    <div style={styles.body}>
      {/* Cabeçalho */}
      <header style={styles.header}>
        <span style={styles.title}>Quiz</span>
        <nav style={styles.nav}>
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
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
          {carregando ? (
            <div style={styles.loadingContainer}>
              <div style={styles.progressIndicator}>Carregando perguntas...</div>
            </div>
          ) : erro ? (
            <div style={styles.errorMessage}>{erro}</div>
          ) : perguntas.length === 0 ? (
            <div style={styles.errorMessage}>Nenhuma pergunta disponível</div>
          ) : (
            <>
              <p style={styles.questionText}>{perguntas[indice]?.pergunta}</p>

              {/* Alternativas */}
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

              {/* Botões de ação */}
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}