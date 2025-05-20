import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Home.css";

export default function Home() {
  const [questions, setQuestions] = useState(10);
  const navigate = useNavigate();

  const handleStartQuiz = (materia) => {
    navigate(`/quiz?materia=${materia}&questions=${questions}`);
  };

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <div className="home-header">
        <h1>BEM-VINDOS!</h1>
        <img src="/Logo.png" alt="Logo Aprova" className="home-logo" />
      </div>

      {/* Subtítulo */}
      <div className="home-subtitle">
        "A CADA QUIZ, UM PASSO MAIS PERTO DA APROVAÇÃO"
      </div>

      {/* Conteúdo */}
      <main className="home-main">
        <div className="home-content">
          {/* Aside lateral */}
          <aside className="home-aside">
            <h3>Escolha uma matéria:</h3>
            <ul>
              {[
                "historia", "filosofia", "sociologia", "geografia", "matematica",
                "fisica", "quimica", "biologia", "portugues", "ingles", "espanhol"
              ].map((materia) => (
                <li key={materia}>
                  <button onClick={() => handleStartQuiz(materia)}>
                    {materia.charAt(0).toUpperCase() + materia.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

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

          {/* Bloco com imagem e descrição */}
          <div className="home-info">
            <img
              src="/HomeAprova.png"
              alt="Estudante comemorando"
              className="home-image"
            />

            <div className="home-description">
              <h2>Seja bem-vindo ao seu novo aliado na preparação para o vestibular!</h2>
              <p>
                Revise os principais conteúdos com nossos quizzes interativos.
                Teste seus conhecimentos, descubra onde melhorar e prepare-se para
                as provas.
              </p>
              <p>Comece agora e torne seu estudo mais inteligente e divertido!</p>

              <Link to="/perfil">
                <button className="home-button">
                  IR PARA O PERFIL
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}