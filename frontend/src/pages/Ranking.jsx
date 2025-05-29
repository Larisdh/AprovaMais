// src/pages/Ranking.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRanking } from "../services/quizService"; // Verifique o caminho do serviço
import "./css/Ranking.css";

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setCarregando(true);
        setErro(null);
        const rankingData = await fetchRanking();
        setRanking(rankingData);
      } catch (error) {
        console.error("[Ranking.jsx] Erro ao buscar ranking:", error.message);
        setErro(
          error.message || "Erro ao carregar dados do ranking. Tente novamente."
        );
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  const renderizarRanking = () => {
    if (ranking.length === 0 && !carregando && !erro) {
      return (
        <div className="ranking-message ranking-empty">
          <p>Nenhum dado de ranking disponível no momento. 🤔</p>
          <p>Jogue alguns quizzes para aparecer aqui!</p>
          <Link to="/home" className="button button--primary ranking-empty-button">
            Escolher Matéria
          </Link>
        </div>
      );
    }

    return ranking.map((aluno, index) => {
      // Define classe para os top 3
      let positionClass = "ranking-position-number";
      if (index === 0) positionClass += " gold";
      if (index === 1) positionClass += " silver";
      if (index === 2) positionClass += " bronze";

      return (
        <div key={aluno.id || index} className="ranking-entry">
          <div className="ranking-position">
            <span className={positionClass}>{index + 1}º</span>
          </div>
          <div className="ranking-name" title={aluno.nome || "Usuário Anônimo"}>
            {aluno.nome || "Usuário Anônimo"}
          </div>
          <div className="ranking-score">
            {aluno.totalAcertos} pts
          </div>
          <div className="ranking-percentage">
            ({aluno.totalPerguntas > 0 ? aluno.percentual.toFixed(0) : 0}%)
          </div>
        </div>
      );
    });
  };

  return (
    // Usando a estrutura .page-container
    <div className="page-container ranking-page-container">
      {/* Reutilizando o app-header global */}
      <header className="app-header ranking-custom-header">
  <Link to="/home" className="app-header-logo-link"> {/* Alterado para redirecionar à página Home */}
    <img src="/Logo.png" alt="Logo Aprova+" className="app-logo" />
  </Link>
  <h1 className="app-header-page-title">Ranking Geral</h1>
  <nav className="app-header-nav ranking-custom-nav">
    <Link to="/home" className="app-header-nav-link">
      Início
    </Link>
    <Link to="/ranking" className="app-header-nav-link active"> {/* Adiciona classe 'active' */}
      Ranking
    </Link>
    <Link to="/perfil" className="app-header-nav-link">
      Perfil
    </Link>
  </nav>
</header>

      <main className="ranking-main-content">
        <div className="ranking-card">
          <h2 className="ranking-card-title">🏆 Melhores Pontuações 🏆</h2>
          
          {carregando && (
            <div className="ranking-message ranking-loading">
              <div className="quiz-spinner"></div> {/* Reutiliza o spinner */}
              <p>Carregando ranking...</p>
            </div>
          )}

          {erro && (
            <div className="ranking-message ranking-error">
              <p>😕 Oops! Algo deu errado.</p>
              <p>{erro}</p>
              <button onClick={() => window.location.reload()} className="button button--secondary">
                Tentar Novamente
              </button>
            </div>
          )}

          {!carregando && !erro && (
            <div className="ranking-list-wrapper">
              <div className="ranking-list-header">
                <span className="header-position">Pos.</span>
                <span className="header-name">Nome</span>
                <span className="header-score">Pontos</span>
                <span className="header-percentage">% Acerto</span>
              </div>
              <div className="ranking-list-entries">
                {renderizarRanking()}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Ranking;