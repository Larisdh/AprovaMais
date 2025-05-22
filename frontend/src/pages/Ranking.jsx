import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchRanking } from "../services/quizService";
import "./css/Ranking.css";

function Ranking() {
  const [user] = useAuthState(auth);
  const [ranking, setRanking] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Buscar dados do ranking
  useEffect(() => {
    const buscarDados = async () => {
      try {
        setCarregando(true);
        console.log("🔍 Buscando ranking...");
        const rankingData = await fetchRanking();
        console.log("✅ Ranking obtido:", rankingData);
        setRanking(rankingData);
      } catch (error) {
        console.error("❌ Erro ao buscar ranking:", error);
        setErro("Erro ao carregar dados. Por favor, tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  // Função para formatar o ranking
  const renderizarRanking = () => {
    if (carregando) return <h2>Carregando dados...</h2>;
    if (erro) return <h2>{erro}</h2>;

    return ranking.length > 0 ? (
      ranking.map((aluno, index) => (
        <div key={aluno.id} className="bar">
          <div className="ranking-item">
            <span>
              <span className="ranking-number">{index + 1}</span>
              {aluno.user || "Usuário Anônimo"}
            </span>
            <span className="score-value">
              {aluno.pontos} pontos
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="bar">Nenhum dado de ranking disponível</div>
    );
  };

  return (
    <div className="ranking-body">
      <header className="ranking-header">
        <span className="ranking-title">Ranking</span>
        <nav className="ranking-nav">
          <Link to="/home" className="ranking-link">Página Inicial</Link>
          <Link to="/quiz" className="ranking-link">Quiz</Link>
          <img src="/Logo.png" alt="Logo Aprova" className="ranking-logo" />
        </nav>
      </header>

      <main className="ranking-main">
        <h2 className="ranking-intro">🏆 Recorde dos Jogadores!</h2>
        {renderizarRanking()}
      </main>
    </div>
  );
}

export default Ranking;
