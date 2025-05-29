import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./css/Home.css"; // Descomente se tiver um Home.css separado

export default function Home() {
  const [questions, setQuestions] = useState(10);
  const navigate = useNavigate();

  const handleStartQuizBySubject = (materia) => {
    navigate(`/quiz?materia=${materia}&questions=${questions}`);
  };

  const handleStartGeneralQuiz = () => {
    // Navega para o quiz sem o parâmetro 'materia',
    // o Quiz.jsx e o backend tratarão isso como "todas as matérias"
    navigate(`/quiz?questions=${questions}`);
  };

  const materiasDisponiveis = [
    "historia", "filosofia", "sociologia", "geografia", "matematica",
    "fisica", "quimica", "biologia", "portugues", "ingles", "espanhol"
  ];

  const quantidadesPerguntas = [5, 10, 15, 20, 25];

  return (
    <div className="page-container home-container">
      <header className="app-header">
        <Link to="/" className="app-header-logo-link">
          <img src="/Logo.png" alt="Logo Aprova" className="app-logo" />
        </Link>
        <h1 className="app-header-page-title home-header-custom-title">BEM-VINDOS!</h1>
        <nav className="app-header-nav">
          <Link to="/ranking" className="app-header-nav-link">Ranking</Link>
          <Link to="/perfil" className="app-header-nav-link">Perfil</Link>
        </nav>
      </header>

      <div className="home-subtitle">
        "A CADA QUIZ, UM PASSO MAIS PERTO DA APROVAÇÃO"
      </div>

      <main className="home-main-content">
        <div className="home-layout-grid">
          <aside className="home-aside">
            <h3 className="home-aside__title">Escolha uma Matéria:</h3>
            <ul className="home-aside__subject-list">
              {materiasDisponiveis.map((materia) => (
                <li key={materia}>
                  <button
                    className="home-aside__subject-button"
                    onClick={() => handleStartQuizBySubject(materia)}
                  >
                    {materia.charAt(0).toUpperCase() + materia.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Botão para Desafio Geral */}
            <div className="home-aside__general-challenge">
              <h4 className="home-aside__title">Ou tente um Desafio Geral:</h4>
              <button
                className="button button--primary home-aside__general-button" // Usando classes de botão global e uma específica
                onClick={handleStartGeneralQuiz}
              >
                Todas as Matérias
              </button>
            </div>

            <div className="home-aside__question-selector">
              <h4 className="home-aside__title">Quantidade de Perguntas:</h4>
              <div className="home-aside__question-buttons">
                {quantidadesPerguntas.map((value) => (
                  <button
                    key={value}
                    onClick={() => setQuestions(value)}
                    className={`home-aside__quantity-button ${questions === value ? "active" : ""}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="home-info-section">
            <div className="home-info-section__image-container">
              <img
                src="/HomeAprova.png"
                alt="Estudante comemorando aprovação"
                className="home-info-section__image"
              />
            </div>
            <div className="home-info-section__description">
              <h2>Seu novo aliado na preparação para o vestibular!</h2>
              <p>
                Revise os principais conteúdos com nossos quizzes interativos.
                Teste seus conhecimentos, descubra onde precisa melhorar e
                sinta-se mais confiante para as provas.
              </p>
              <p>
                Comece agora e torne seu estudo mais inteligente e divertido!
              </p>
              <Link to="/perfil" className="button button--primary home-info-section__action-button">
                Ir para o Perfil
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}