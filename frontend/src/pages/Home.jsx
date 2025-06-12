import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Importando o CSS específico para a página Home
import "./css/Home.css";
// O arquivo CSS a ser importado agora é o novo 'Home.css'
// import './Home.css'; 

export default function Home() {
  const [questions, setQuestions] = useState(10);
  const navigate = useNavigate();

  const handleStartQuizBySubject = (materia) => {
    navigate(`/quiz?materia=${materia}&questions=${questions}`);
  };

  const handleStartGeneralQuiz = () => {
    navigate(`/quiz?questions=${questions}`);
  };

  const materiasDisponiveis = [
    "Historia", "Filosofia", "Sociologia", "Geografia", "Matemática",
    "Física", "Química", "Biologia", "Português", "Inglês", "Espanhol",
  ];

  const quantidadesPerguntas = [5, 10, 15, 20, 25];

  return (
    // Estrutura principal com a classe 'home'
    <div className="home">
      {/* O cabeçalho foi mantido para navegação, mas o H1 usa a nova classe */}
      <header className="app-header">
        <img src="/Logo.png" alt="Logo Aprova" className="app-logo" />
        <h1 className="home__title">BEM-VINDOS!</h1>
        <nav className="app-header-nav">
          <Link to="/ranking" className="app-header-nav-link">
            Ranking
          </Link>
          <Link to="/perfil" className="app-header-nav-link">
            Perfil
          </Link>
        </nav>
      </header>

      <div className="main">
        {/* Wrapper para centralizar a frase motivacional */}
        <div style={{ textAlign: "center" }}>
          <span className="home__frase">
            "A CADA QUIZ, UM PASSO MAIS PERTO DA APROVAÇÃO"
          </span>
        </div>

        {/* Container principal que organiza as seções lado a lado */}
        <main className="home__container">

          {/* Seção 1: Escolha de Matérias */}
          <aside className="home__aside">
            <h2 className="home__subtitle">Escolha uma Matéria:</h2>
            <div className="home__buttons-grid">
              {materiasDisponiveis.map((materia) => (
                <button
                  key={materia}
                  className="btn-materia"
                  onClick={() => handleStartQuizBySubject(materia.toLowerCase())}
                >
                  {materia}
                </button>
              ))}
            </div>
            <div className="home__desafio">
              <h3>Ou aceite o Desafio Geral:</h3>
              <button
                className="btn-desafio"
                onClick={handleStartGeneralQuiz}
              >
                Todas as Matérias
              </button>
            </div>
          </aside>

          {/* Seção 2: Quantidade de Perguntas */}
          <aside className="home__aside home__aside--quantidade">
            <h2 className="home__subtitle">Quantidade de Perguntas:</h2>
            <ul>
              {quantidadesPerguntas.map((value) => (
                <li
                  key={value}
                  onClick={() => setQuestions(value)}
                  className={`quantidade-item ${questions === value ? "active" : ""
                    }`}
                >
                  {value}
                </li>
              ))}
            </ul>
          </aside>

          {/* Seção 3: Informações e Motivação */}
          <aside className="home__aside home__aside--info">
            <h2 className="home__subtitle">Seu novo aliado na preparação!</h2>
            <img
              src="/HomeAprova.png"
              alt="Estudante comemorando aprovação"
              className="home__image"
            />
            <p className="home__text">
              Revise os principais conteúdos com nossos quizzes interativos.
              Teste seus conhecimentos e sinta-se mais confiante para as provas.
            </p>
            <Link to="/perfil" className="btn-perfil">
              Ir para o Perfil
            </Link>
          </aside>

        </main>

      </div>
    </div>
  );
}