// src/pages/Quiz.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import "./css/Quiz.css";

// ✅ CORREÇÃO: Importamos os serviços centralizados.
import { fetchPerguntas, saveResultado } from "../services/quizService";

// ... (funções getNomeMateriaFormatado e useQuery permanecem iguais)
const nomesMateriasFormatados = {
  historia: "Historia",
  filosofia: "Filosofia",
  sociologia: "Sociologia",
  geografia: "Geografia",
  matematica: "Matematica",
  fisica: "Fisica",
  quimica: "Quimica",
  biologia: "Biologia",
  portugues: "Portugues",
  ingles: "Ingles",
  espanhol: "Espanhol",
};

const getNomeMateriaFormatado = (materiaKey) => {
  if (!materiaKey) return "Geral";
  return nomesMateriasFormatados[materiaKey.toLowerCase()] || 
         (materiaKey.charAt(0).toUpperCase() + materiaKey.slice(1));
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Quiz() {
  const navigate = useNavigate();
  const query = useQuery();
  const materiaParam = query.get("materia");
  
  const quantidade = parseInt(query.get("questions"), 10) || 10;
  const nomeMateriaExibicao = getNomeMateriaFormatado(materiaParam);

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
    const buscar = async () => {
      if (!quantidade || quantidade <= 0) {
        setErro("Quantidade de perguntas inválida.");
        setCarregando(false);
        return;
      }
      try {
        setCarregando(true);
        setErro(null);
        
        // ✅ CORREÇÃO: Usamos a função do serviço para buscar perguntas.
        const data = await fetchPerguntas(materiaParam, quantidade);

        if (data.length === 0) {
          const materiaNomeErro = getNomeMateriaFormatado(materiaParam);
          setErro(`Nenhuma pergunta encontrada para "${materiaNomeErro}". Tente outra configuração.`);
        } else {
          setPerguntas(data.map(p => ({...p, key: Math.random().toString(36).substring(7) })));
          setApplyCardAnimation(true);
        }
      } catch (error) {
        setErro(`Erro ao carregar perguntas: ${error.message}.`);
      } finally {
        setCarregando(false);
      }
    };
    buscar();
  }, [materiaParam, quantidade]); 

  useEffect(() => {
    const salvar = async () => {
      if (quizFinalizado && resultadoFinal !== null && perguntas.length > 0) {
        const user = auth.currentUser;
        if (user) {
          try {
            // ✅ CORREÇÃO: Usamos a função do serviço para salvar o resultado.
            const data = await saveResultado({
              userId: user.uid,
              acertos: resultadoFinal,
              total: perguntas.length,
              materia: materiaParam || "Geral",
            });
            console.log("Resultado salvo:", data.message);
          } catch (error) {
            console.error("Erro de rede ao salvar resultado:", error.message);
          }
        }
      }
    };
    salvar();
  }, [quizFinalizado, resultadoFinal, perguntas, materiaParam]);

  // ... (O resto do arquivo, com as funções responder, reiniciarQuiz, e toda a parte de renderização, permanece EXATAMENTE IGUAL)
  // ... (Cole o resto do seu código de Quiz.jsx aqui, pois ele já está correto)

  function responder(indiceAlternativa) {
    if (!perguntas.length || indice >= perguntas.length || respostaSelecionada !== null) return;
    const perguntaAtual = perguntas[indice];
    if (!perguntaAtual) {
        setErro("Erro ao processar a pergunta.");
        return;
    }
    setRespostaSelecionada(indiceAlternativa);
    const acertouResposta = indiceAlternativa === perguntaAtual.correta;
    let novaPontuacaoTemp = acertos;
    if (acertouResposta) {
      novaPontuacaoTemp = acertos + 1;
      setAcertos(prevAcertos => prevAcertos + 1);
    }
    const feedbackDuration = 1000;
    const transitionDelay = 200;
    setTimeout(() => {
      setApplyCardAnimation(false);
      setTimeout(() => {
        if (indice + 1 < perguntas.length) {
          setIndice((prevIndice) => prevIndice + 1);
          setRespostaSelecionada(null);
          setApplyCardAnimation(true); 
        } else {
          setResultadoFinal(novaPontuacaoTemp);
          setQuizFinalizado(true);
        }
      }, transitionDelay);
    }, feedbackDuration);
  }

  const reiniciarQuiz = () => {
    let quizUrl = `/quiz?questions=${quantidade}`;
    if (materiaParam) {
      quizUrl += `&materia=${materiaParam}`;
    }
    quizUrl += `&rerun=${Math.random().toString(36).substring(7)}`;
    navigate(quizUrl);
  };

  const HeaderQuiz = ({ titleOverride }) => {
    const quizTitle = `Quiz - ${nomeMateriaExibicao}`;
    return (
      <header className="app-header quiz-custom-header">
        <Link to="/home" className="app-header-logo-link">
          <img src="/Logo.png" alt="Logo Aprova+" className="app-logo" />
        </Link>
        <h1 className="app-header-page-title">{titleOverride || quizTitle}</h1>
        <nav className="app-header-nav quiz-custom-nav">
          <Link to="/home" className="app-header-nav-link">Início</Link>
          <Link to="/ranking" className="app-header-nav-link">Ranking</Link>
        </nav>
      </header>
    );
  };
  
  if (carregando) {
    return (
      <div className="page-container quiz-page-container">
        <HeaderQuiz titleOverride="Carregando Quiz" />
        <main className="quiz-main-content">
          <div className="quiz-feedback-container">
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
          <div className="quiz-feedback-container quiz-error-container">
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
          <div className="quiz-feedback-container quiz-result-container">
            <h2 className="quiz-result-title">🎉 Quiz Finalizado! 🎉</h2>
            <p className="quiz-result-score">
              Você acertou {resultadoFinal} de {perguntas.length} perguntas em {nomeMateriaExibicao}!
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
                Jogar Novamente ({nomeMateriaExibicao})
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
            className={`quiz-card ${applyCardAnimation ? 'animate-card-enter' : ''}`}
        >
          <div className="quiz-question-text">
            {perguntaAtual?.textos?.map((textoItem, idx) => (
                <p key={idx} className={idx === 0 ? "quiz-question-main-text" : "quiz-question-support-text"}>
                  {typeof textoItem === "object" && textoItem !== null && textoItem.hasOwnProperty('conteudo') ? textoItem.conteudo : textoItem}
                </p>
              ))
            }
          </div>
          <div className="quiz-options">
            {perguntaAtual?.alternativas?.map((alt, i) => {
                let buttonClass = "quiz-option-button";
                if (respostaSelecionada !== null) {
                  if (i === perguntaAtual.correta) {
                    buttonClass += " correct";
                  } else if (i === respostaSelecionada) {
                    buttonClass += " incorrect";
                  } else {
                    buttonClass += " disabled";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => responder(i)}
                    disabled={respostaSelecionada !== null}
                    className={buttonClass}
                  >
                    <span className="quiz-option-letter">{String.fromCharCode(65 + i)})</span>
                    <span className="quiz-option-text-content">{alt}</span>
                  </button>
                );
              })
            }
          </div>
          <div className="quiz-progress-indicator">
            Pergunta {indice + 1} de {perguntas.length}
          </div>
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