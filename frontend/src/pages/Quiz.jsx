import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import "./css/Quiz.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Quiz() {
  const navigate = useNavigate();
  const query = useQuery();
  // Se 'materia' não estiver na URL, query.get("materia") será null.
  // O || "Indefinida" garante que temos um valor, mas podemos tratar null/undefined diretamente.
  const materiaParam = query.get("materia"); // Pegar o parâmetro como está
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
      // Validação da quantidade
      if (!quantidade || quantidade <= 0) {
        setErro("Quantidade de perguntas inválida.");
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);
        
        // Constrói a URL base
        let apiUrl = `http://localhost:3000/api/perguntas?quantidade=${quantidade}`;
        // Adiciona o parâmetro 'materia' apenas se materiaParam tiver um valor
        if (materiaParam) {
          apiUrl += `&materia=${materiaParam}`;
        }
        // Se materiaParam for null/undefined, o backend não filtrará por matéria.

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorBody = await response.text();
          let errorJson = {};
          try { errorJson = JSON.parse(errorBody); } catch (e) { /* ignore */ }
          throw new Error(errorJson.error || `Falha ao buscar perguntas (status: ${response.status})`);
        }
        const data = await response.json();
        if (data.length === 0) {
          const materiaNome = materiaParam ? `"${materiaParam}"` : "gerais";
          setErro(`Nenhuma pergunta encontrada para ${materiaNome}. Tente outra configuração.`);
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

    buscarPerguntas();
  }, [materiaParam, quantidade]); // Depende de materiaParam e quantidade

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
                materia: materiaParam || "Geral", // Usa "Geral" se materiaParam for null/undefined
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
  }, [quizFinalizado, resultadoFinal, perguntas, materiaParam]); // Depende de materiaParam

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
    // Determina o título do quiz com base na presença de materiaParam
    const quizTitle = materiaParam ? `Quiz - ${materiaParam.charAt(0).toUpperCase() + materiaParam.slice(1)}` : "Quiz Geral";
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
    // ... (código de carregamento inalterado) ...
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
    // ... (código de erro inalterado) ...
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
    // ... (código de quiz finalizado, mas ajustando a exibição da matéria) ...
    const materiaExibida = materiaParam ? materiaParam.charAt(0).toUpperCase() + materiaParam.slice(1) : "Geral";
    return (
      <div className="page-container quiz-page-container">
        <HeaderQuiz titleOverride="Resultado do Quiz" />
        <main className="quiz-main-content">
          <div className="quiz-feedback-container quiz-result-container">
            <h2 className="quiz-result-title">🎉 Quiz Finalizado! 🎉</h2>
            <p className="quiz-result-score">
              Você acertou {resultadoFinal} de {perguntas.length} perguntas em {materiaExibida}!
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
                Jogar Novamente ({materiaExibida})
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!perguntas.length || !perguntas[indice]) {
    // ... (código de 'sem pergunta' inalterado) ...
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
    // ... (JSX principal do quiz inalterado, exceto o HeaderQuiz que já pega o título dinâmico) ...
    <div className="page-container quiz-page-container">
      <HeaderQuiz />
      <main className="quiz-main-content">
        <div 
            key={perguntaAtual.key}
            className={`quiz-card ${applyCardAnimation ? 'animate-card-enter' : ''}`}
        >
          <div className="quiz-question-text">
            {perguntaAtual.textos?.map((textoItem, idx) => (
              <p key={idx} className={idx === 0 ? "quiz-question-main-text" : "quiz-question-support-text"}>
                {typeof textoItem === "object" ? textoItem.conteudo : textoItem}
              </p>
            ))}
          </div>

          <div className="quiz-options">
            {perguntaAtual.alternativas.map((alt, i) => {
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
            })}
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