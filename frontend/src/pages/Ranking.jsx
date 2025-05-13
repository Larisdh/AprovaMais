import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/Ranking.css"; // Adjust the path if the file exists in the correct location

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

  // Função para formatar percentuais
  const formatarPercentual = (valor) => {
    return `${valor.toFixed(1)}%`;
  };

  // Função para renderizar estatísticas por matéria
  const renderizarEstatisticasPorMateria = () => {
    if (!estatisticas || !estatisticas.materias) {
      return <div className="bar">Sem dados disponíveis</div>;
    }

    return Object.entries(estatisticas.materias).map(([materia, dados]) => {
      const percentual = dados.total > 0 ? (dados.acertos / dados.total) * 100 : 0;
      return (
        <div key={materia} className="bar">
          {materia}: {dados.acertos}/{dados.total} ({formatarPercentual(percentual)})
        </div>
      );
    });
  };

  return (
    <div className="ranking-body">
      <header className="ranking-header">
        <span className="ranking-title">Ranking</span>
        <nav className="ranking-nav">
          <Link to="/home" className="ranking-link">Página Inicial</Link>
          <Link to="/quiz" className="ranking-link">Quiz</Link>
          <input type="text" placeholder="Buscar..." className="ranking-search" />
          <img src="/Logo.png" alt="Logo Aprova" className="ranking-logo" />
        </nav>
      </header>

      {carregando ? (
        <div className="loading-container">
          <h2>Carregando dados...</h2>
        </div>
      ) : erro ? (
        <div className="error-message">{erro}</div>
      ) : (
        <main className="ranking-main">
          {/* Estatísticas do usuário */}
          <div className="ranking-side">
            <h2>Seu Desempenho</h2>
            {user && estatisticas ? (
              <>
                <div className="user-container">
                  <div>{estatisticas.nome || "Usuário"}</div>
                  <div>{estatisticas.email}</div>
                  <div>Total: {estatisticas.totalAcertos}/{estatisticas.totalPerguntas}</div>
                </div>
                {renderizarEstatisticasPorMateria()}
              </>
            ) : (
              <div className="bar">Faça login para ver suas estatísticas</div>
            )}
          </div>

          {/* Imagem central */}
          <img src="/trofeu.png" alt="Personagem com troféu" className="ranking-image" />

          {/* Ranking geral */}
          <div className="ranking-side">
            <h2>Top 10 Alunos</h2>
            {ranking.length > 0 ? (
              ranking.map((aluno, index) => (
                <div key={aluno.id} className="bar">
                  <div className="ranking-item">
                    <span>
                      <span className="ranking-number">{index + 1}</span>
                      {aluno.nome}
                    </span>
                    <span className="score-value">
                      {formatarPercentual(aluno.percentual)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bar">Nenhum dado de ranking disponível</div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default Ranking;