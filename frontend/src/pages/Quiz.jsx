// src/pages/Quiz.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Verifique o caminho
import "./css/Quiz.css"; // Importa o CSS refatorado

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Quiz() {
  const navigate = useNavigate();
  const query = useQuery();
  const materia = query.get("materia") || "Indefinida";
  const quantidade = parseInt(query.get("questions"), 10) || 10;

  const [perguntas, setPerguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const [applyCardAnimation, setApplyCardAnimation] = useState(false);


  useEffect(() => {
    const buscarPerguntas = async () => {
      if (!materia || materia === "Indefinida" || !quantidade) {
        setErro("Matéria ou quantidade de perguntas não especificadas corretamente.");
        setCarregando(false);
        return;
      }
      try {
        setCarregando(true);
        setErro(null);
        const response = await fetch(
          `http://localhost:3000/api/perguntas?materia=${materia}&quantidade=${quantidade}`
        );
        if (!response.ok) {
          const errorBody = await response.text();
          let errorJson = {};
          try { errorJson = JSON.parse(errorBody); } catch (e) { /* ignore */ }
          throw new Error(errorJson.error || `Falha ao buscar perguntas (status: ${response.status})`);
        }
        const data = await response.json();
        if (data.length === 0) {
          setErro(`Nenhuma pergunta encontrada para "${materia}". Tente outra matéria.`);
        } else {
          // Adiciona uma key única para cada pergunta para ajudar na animação do React
          setPerguntas(data.map(p => ({...p, key: Math.random().toString(36).substring(7) })));
          setApplyCardAnimation(true);
        }
      } catch (error) {
        setErro(`Erro ao carregar perguntas: ${error.message}.`);
      } finally {
        setCarregando(false);
      }
    };

    buscarPerguntas();
  }, [materia, quantidade]); // Removido 'navigate' das dependências, pois não é usado para refetch aqui

  useEffect(() => {
    const salvarResultadoNoBackend = async () => {
      if (quizFinalizado && resultadoFinal !== null && perguntas.length > 0) {
        try {
          const user = auth.currentUser;
          if (user) {
            const response = await fetch("http://localhost:3000/api/resultados", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.uid,
                acertos: resultadoFinal,
                total: perguntas.length,
                materia: materia,
              }),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Erro ao salvar resultado:", response.status, errorData);
            } else {
                const successData = await response.json();
                console.log("Resultado salvo:", successData);
            }
          }
        } catch (error) {
          console.error("Erro de rede ao salvar resultado:", error);
        }
      }
    };
    salvarResultadoNoBackend();
  }, [quizFinalizado, resultadoFinal, perguntas, materia]);

  function responder(indiceAlternativa) {
    if (!perguntas.length || indice >= perguntas.length || respostaSelecionada !== null) return;

    const perguntaAtual = perguntas[indice];
    if (!perguntaAtual) {
        setErro("Erro ao processar a pergunta.");
        return;
    }
    setRespostaSelecionada(indiceAlternativa);

    const acertouResposta = indiceAlternativa === perguntaAtual.correta;
    const novaPontuacao = acertouResposta ? acertos + 1 : acertos;
    
    if (acertouResposta) {
      setAcertos(prevAcertos => prevAcertos + 1);
    }

    const feedbackDuration = 1000;
    const transitionDelay = 200;

    setTimeout(() => {
      setApplyCardAnimation(false); // Desativa a animação do card atual
      
      setTimeout(() => {
        if (indice + 1 < perguntas.length) {
          setIndice((prevIndice) => prevIndice + 1);
          setRespostaSelecionada(null);
          setApplyCardAnimation(true); // Ativa animação para o novo card
        } else {
          setResultadoFinal(novaPontuacao);
          setQuizFinalizado(true);
        }
      }, transitionDelay);

    }, feedbackDuration);
  }

  const reiniciarQuiz = () => {
    // Força um refetch da página do quiz com um parâmetro aleatório para garantir a remontagem
    navigate(`/quiz?materia=${materia}&questions=${quantidade}&rerun=${Math.random().toString(36).substring(7)}`);
    // Opcionalmente, resetar estados locais aqui se a navegação não remontar totalmente.
    // Mas a navegação com query param diferente geralmente força.
  };

  const HeaderQuiz = ({ titleOverride }) => (
    <header className="app-header quiz-custom-header">
  <Link to="/home" className="app-header-logo-link"> {/* Alterado para redirecionar à página Home */}
    <img src="/Logo.png" alt="Logo Aprova+" className="app-logo" />
  </Link>
  <h1 className="app-header-page-title">{titleOverride || `Quiz - ${materia}`}</h1>
  <nav className="app-header-nav quiz-custom-nav">
    <Link to="/home" className="app-header-nav-link">Início</Link>
    <Link to="/ranking" className="app-header-nav-link">Ranking</Link>
  </nav>
</header>
  );

  if (carregando) {
    return (
      <div className="page-container quiz-page-container">
        <HeaderQuiz titleOverride="Carregando Quiz" />
        <main className="quiz-main-content">
          <div className="quiz-feedback-container"> {/* Usando uma classe genérica para o container */}
            <p className="quiz-feedback-text">Carregando perguntas...</p>
            <div className="quiz-spinner"></div>
          </div>
        </main>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="page-container quiz-page-container">
        <HeaderQuiz titleOverride="Erro no Quiz" />
        <main className="quiz-main-content">
          <div className="quiz-feedback-container quiz-error-container"> {/* Classe adicional para erro */}
            <p className="quiz-feedback-text error-text">{erro}</p>
            <Link to="/home" className="button button--primary quiz-error-button">
              Voltar para Início
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (quizFinalizado) {
    return (
      <div className="page-container quiz-page-container">
        <HeaderQuiz titleOverride="Resultado do Quiz" />
        <main className="quiz-main-content">
          <div className="quiz-feedback-container quiz-result-container"> {/* Classe adicional para resultado */}
            <h2 className="quiz-result-title">🎉 Quiz Finalizado! 🎉</h2>
            <p className="quiz-result-score">
              Você acertou {resultadoFinal} de {perguntas.length} perguntas em {materia}!
            </p>
            <div className="quiz-result-actions">
              <button
                onClick={() => navigate("/ranking")}
                className="button button--primary"
              >
                Ver Ranking
              </button>
              <button
                onClick={reiniciarQuiz}
                className="button button--secondary"
              >
                Jogar Novamente ({materia})
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!perguntas.length || !perguntas[indice]) {
     return (
      <div className="page-container quiz-page-container">
        <HeaderQuiz titleOverride="Erro no Quiz" />
        <main className="quiz-main-content">
          <div className="quiz-feedback-container quiz-error-container">
             <p className="quiz-feedback-text error-text">Não foi possível carregar a pergunta. Por favor, tente selecionar a matéria novamente.</p>
            <Link to="/home" className="button button--primary quiz-error-button">
              Voltar para Início
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const perguntaAtual = perguntas[indice];

  return (
  <div className="page-container quiz-page-container">
    <HeaderQuiz />
    <main className="quiz-main-content">
      <div
        key={perguntaAtual.key}
        className={`quiz-card ${applyCardAnimation ? "animate-card-enter" : ""}`}
      >
        {/* Texto da pergunta permanece visível */}
        <div className="quiz-question-text">
          {perguntaAtual.textos?.map((textoItem, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "quiz-question-main-text"
                  : "quiz-question-support-text"
              }
            >
              {typeof textoItem === "object" ? textoItem.conteudo : textoItem}
            </p>
          ))}
        </div>

        {/* Alternativas com cores de certo/errado */}
        <div className="quiz-options">
          {perguntaAtual.alternativas.map((alt, i) => {
            let buttonClass = "quiz-option-button";
            if (respostaSelecionada !== null) {
              if (i === perguntaAtual.correta) {
                buttonClass += " correct"; // Verde para resposta correta
              } else if (i === respostaSelecionada) {
                buttonClass += " incorrect"; // Vermelho para resposta errada
              } else {
                buttonClass += " disabled"; // Desabilitado para outras opções
              }
            }

            return (
              <button
                key={i}
                onClick={() => responder(i)}
                disabled={respostaSelecionada !== null}
                className={buttonClass}
              >
                <span className="quiz-option-letter">
                  {String.fromCharCode(65 + i)}) {/* Letra da alternativa */}
                </span>
                {alt}
              </button>
            );
          })}
        </div>

        {/* Indicador de progresso */}
        <div className="quiz-progress-indicator">
          Pergunta {indice + 1} de {perguntas.length}
        </div>

        {/* Botão para escolher matéria */}
        <div className="quiz-actions">
          <button
            onClick={() => navigate("/home")}
            className="button button--secondary quiz-action-button"
          >
            Escolher Matéria
          </button>
        </div>
      </div>
    </main>
  </div>
);
}