import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Certifique-se de que seu CSS global (style.css) está importado na raiz do projeto (ex: App.js ou index.js)
// Se você tiver um Home.css específico APENAS para estilos que não são globais, importe-o aqui.
// Para este exemplo, assumimos que a maioria dos estilos de home estará no style.css global.
// import "./css/Home.css"; // Descomente se tiver um Home.css separado para coisas muito específicas da Home.

export default function Home() {
  const [questions, setQuestions] = useState(10);
  const navigate = useNavigate();

  const handleStartQuiz = (materia) => {
    navigate(`/quiz?materia=${materia}&questions=${questions}`);
  };

  const materiasDisponiveis = [
    "historia", "filosofia", "sociologia", "geografia", "matematica",
    "fisica", "quimica", "biologia", "portugues", "ingles", "espanhol"
  ];

  const quantidadesPerguntas = [5, 10, 15, 20, 25];

  return (
    <div className="page-container home-container"> {/* Classe global e específica da página */}
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
                    onClick={() => handleStartQuiz(materia)}
                  >
                    {materia.charAt(0).toUpperCase() + materia.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

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