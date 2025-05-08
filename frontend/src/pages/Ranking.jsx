import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function Ranking() {
  const [user] = useAuthState(auth);
  const [ranking, setRanking] = useState([]);
  const [estatisticas, setEstatisticas] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Buscar dados do ranking
  useEffect(() => {
    const buscarDados = async () => {
      try {
        setCarregando(true);
        
        // Buscar ranking geral
        const rankingResponse = await fetch("http://localhost:3000/api/ranking");
        
        if (!rankingResponse.ok) {
          throw new Error("Falha ao buscar ranking");
        }
        
        const rankingData = await rankingResponse.json();
        setRanking(rankingData);
        
        // Se o usuário estiver autenticado, buscar suas estatísticas
        if (user) {
          const statsResponse = await fetch(
            `http://localhost:3000/api/usuarios/${user.uid}/estatisticas`
          );
          
          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            setEstatisticas(statsData);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setErro("Erro ao carregar dados. Por favor, tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, [user]);

  const styles = {
    body: {
      backgroundColor: "#88b7d5",
      fontFamily: "Sans-serif",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
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
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    nav: {
      display: "flex",
      gap: "2rem",
      alignItems: "center",
      fontSize: "1rem",
    },
    logo: {
      height: "3rem",
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
      textDecoration: "underline",
      color: "white",
    },
    main: {
      flexGrow: 1,
      display: "flex",
      padding: "2rem",
      justifyContent: "center",
      alignItems: "center",
      gap: "2rem",
      width: "100%",
    },
    side: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    bar: {
      backgroundColor: "#d5f3ff",
      padding: "0.75rem 1rem",
      borderRadius: "2rem",
      minWidth: "15rem",
      fontWeight: "bold",
      color: "#003b6f",
      textAlign: "left",
    },
    image: {
      height: "16rem",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "300px",
    },
    errorMessage: {
      color: "white",
      backgroundColor: "#F44336",
      textAlign: "center",
      fontSize: "1rem",
      padding: "1rem",
      borderRadius: "0.5rem",
      margin: "1rem",
    },
    userContainer: {
      backgroundColor: "#0a518e",
      color: "white",
      padding: "1rem",
      borderRadius: "1rem",
      marginBottom: "1rem",
      textAlign: "center",
    },
    rankingItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    scoreValue: {
      fontWeight: "bold",
      color: "#0a518e",
    },
    rankingNumber: {
      backgroundColor: "#0a518e",
      color: "white",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "0.5rem",
      fontSize: "0.875rem",
    }
  };

  // Função para formatar percentuais
  const formatarPercentual = (valor) => {
    return `${valor.toFixed(1)}%`;
  };

  // Função para renderizar estatísticas por matéria
  const renderizarEstatisticasPorMateria = () => {
    if (!estatisticas || !estatisticas.materias) {
      return <div style={styles.bar}>Sem dados disponíveis</div>;
    }

    return Object.entries(estatisticas.materias).map(([materia, dados]) => {
      const percentual = dados.total > 0 ? (dados.acertos / dados.total) * 100 : 0;
      return (
        <div key={materia} style={styles.bar}>
          {materia}: {dados.acertos}/{dados.total} ({formatarPercentual(percentual)})
        </div>
      );
    });
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <span style={styles.title}>Ranking</span>
        <nav style={styles.nav}>
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>Página Inicial</Link>
          <Link to="/quiz" style={{ color: "white", textDecoration: "none" }}>Quiz</Link>
          <input type="text" placeholder="Buscar..." style={styles.search} />
          <img src="/Logo.png" alt="Logo Aprova" style={styles.logo} />
        </nav>
      </header>

      {carregando ? (
        <div style={styles.loadingContainer}>
          <h2 style={{ color: "white" }}>Carregando dados...</h2>
        </div>
      ) : erro ? (
        <div style={styles.errorMessage}>{erro}</div>
      ) : (
        <main style={styles.main}>
          {/* Estatísticas do usuário */}
          <div style={styles.side}>
            <h2 style={{ color: "white", textAlign: "center" }}>Seu Desempenho</h2>
            {user && estatisticas ? (
              <>
                <div style={styles.userContainer}>
                  <div>{estatisticas.nome || "Usuário"}</div>
                  <div>{estatisticas.email}</div>
                  <div>Total: {estatisticas.totalAcertos}/{estatisticas.totalPerguntas}</div>
                </div>
                {renderizarEstatisticasPorMateria()}
              </>
            ) : (
              <div style={styles.bar}>Faça login para ver suas estatísticas</div>
            )}
          </div>

          {/* Imagem central */}
          <img src="/trofeu.png" alt="Personagem com troféu" style={styles.image} />

          {/* Ranking geral */}
          <div style={styles.side}>
            <h2 style={{ color: "white", textAlign: "center" }}>Top 10 Alunos</h2>
            {ranking.length > 0 ? (
              ranking.map((aluno, index) => (
                <div key={aluno.id} style={styles.bar}>
                  <div style={styles.rankingItem}>
                    <span>
                      <span style={styles.rankingNumber}>{index + 1}</span>
                      {aluno.nome}
                    </span>
                    <span style={styles.scoreValue}>
                      {formatarPercentual(aluno.percentual)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.bar}>Nenhum dado de ranking disponível</div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default Ranking;