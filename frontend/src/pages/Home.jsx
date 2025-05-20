import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Home.css"; // Ajuste o caminho se necessário

export default function Home() {
  const [questions, setQuestions] = useState(1); // Estado para armazenar a quantidade de perguntas
  const navigate = useNavigate();

  const handleStartQuiz = (materia) => {
    navigate(`/materia/${materia}?questions=${questions}`); // Redireciona para o questionário com a quantidade de perguntas
  };

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <div className="home-header">
        <h1>BEM-VINDOS!</h1>
        <img src="/Logo.png" alt="Logo Aprova" className="home-logo" />
      </div>

      {/* Subtítulo faixa azul clara */}
      <div className="home-subtitle">
        "A CADA QUIZ, UM PASSO MAIS PERTO DA APROVAÇÃO"
      </div>

      {/* Conteúdo principal */}
      <main className="home-main">
        <div className="home-content">
          {/* Imagem */}
          <img
            src="/HomeAprova.png"
            alt="Estudante comemorando"
            className="home-image"
          />

          {/* Texto descritivo e botão */}
          <div className="home-description">
            <h2>
              Seja bem-vindo ao seu novo aliado na preparação para o vestibular!
            </h2>
            <p>
              Revise os principais conteúdos com nossos quizzes interativos.
              Teste seus conhecimentos, descubra onde melhorar e prepare-se para
              as provas.
            </p>
            <p>Comece agora e torne seu estudo mais inteligente e divertido!</p>

            {/* Botão */}
            <Link to="/perfil">
              <button
                className="home-button"
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#083a6b")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#0a518e")}
              >
                IR PARA O PERFIL
              </button>
            </Link>
          </div>
          <aside className="home-aside">
            <h3>Escolha uma matéria:</h3>
            <ul>
              <li>
                <button onClick={() => handleStartQuiz("historia")}>
                  História
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("filosofia")}>
                  Filosofia
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("sociologia")}>
                  Sociologia
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("geografia")}>
                  Geografia
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("matematica")}>
                  Matemática
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("fisica")}>
                  Física
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("quimica")}>
                  Química
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("biologia")}>
                  Biologia
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("portugues")}>
                  Português
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("ingles")}>
                  Inglês
                </button>
              </li>
              <li>
                <button onClick={() => handleStartQuiz("espanhol")}>
                  Espanhol
                </button>
              </li>
            </ul>

            {/* Botões de quantidade de perguntas */}
            <div className="question-selector">
              <h4>Quantidade de perguntas:</h4>
              <div className="question-buttons">
                {[5, 10, 15, 20, 25].map((value) => (
                  <button
                    key={value}
                    onClick={() => setQuestions(value)}
                    className={questions === value ? "active" : ""}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
