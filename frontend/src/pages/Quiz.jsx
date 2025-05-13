import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Importando auth para identificar o usuário
import "./Quiz.css";

export default function Quiz() {
  const navigate = useNavigate();
  const [perguntas, setPerguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

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

  function responder(indiceAlternativa) {
    if (!perguntas.length || respostaSelecionada !== null) return;
    
    const perguntaAtual = perguntas[indice];
    setRespostaSelecionada(indiceAlternativa);
    
    if (indiceAlternativa === perguntaAtual.correta) {
      setAcertos(acertos + 1);
    }
    
    setTimeout(() => {
      if (indice + 1 < perguntas.length) {
        setIndice(indice + 1);
        setRespostaSelecionada(null);
      } else {
        const resultadoFinal = acertos + (indiceAlternativa === perguntaAtual.correta ? 1 : 0);
        alert(`Você acertou ${resultadoFinal} de ${perguntas.length} perguntas!`);
      }
    }, 1000);
  }

  return (
    <div className="quiz-body">
      <header className="quiz-header">
        <span className="quiz-title">Quiz</span>
        <nav className="quiz-nav">
          <Link to="/home" className="quiz-link">Página Inicial</Link>
          <Link to="/perfil" className="quiz-link">Perfil</Link>
          <input type="text" placeholder="Buscar..." className="quiz-search" />
          <img src="/Logo.png" alt="Logo ENEM" className="quiz-logo" />
        </nav>
      </header>

      <main className="quiz-main">
        <div className="quiz-question-container">
          {carregando ? (
            <div className="quiz-loading-container">
              <div className="quiz-progress-indicator">Carregando perguntas...</div>
            </div>
          ) : erro ? (
            <div className="quiz-error-message">{erro}</div>
          ) : perguntas.length === 0 ? (
            <div className="quiz-error-message">Nenhuma pergunta disponível</div>
          ) : (
            <>
              <p className="quiz-question-text">{perguntas[indice]?.pergunta}</p>
              <div className="quiz-options-container">
                {perguntas[indice]?.alternativas.map((alt, i) => (
                  <button
                    key={i}
                    onClick={() => responder(i)}
                    disabled={respostaSelecionada !== null}
                    className={`quiz-option-button ${
                      respostaSelecionada === null
                        ? ""
                        : i === perguntas[indice].correta
                        ? "quiz-option-correct"
                        : i === respostaSelecionada
                        ? "quiz-option-wrong"
                        : "quiz-option-disabled"
                    }`}
                  >
                    <span className="quiz-option-label">{String.fromCharCode(65 + i)}) </span>
                    {alt}
                  </button>
                ))}
              </div>
              <div className="quiz-save-button-container">
                <button onClick={() => alert("Resposta salva!")} className="quiz-save-button">
                  Salvar Resposta
                </button>
                <button onClick={() => navigate("/ranking")} className="quiz-save-button">
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