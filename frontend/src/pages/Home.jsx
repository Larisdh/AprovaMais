import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css"; // Adjust the path if the file exists in the correct location

export default function Home() {
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
        {/* Ilustração */}
        <img
          src="/HomeAprova.png"
          alt="Estudante comemorando"
          className="home-image"
        />

        {/* Texto descritivo */}
        <div className="home-description">
          <h2>
            Seja bem-vindo ao seu novo aliado na preparação para o vestibular!
          </h2>
          <p>
            Revise os principais conteúdos com nossos quizzes interativos. Teste
            seus conhecimentos, descubra onde melhorar e prepare-se para as
            provas.
          </p>
          <p>
            Comece agora e torne seu estudo mais inteligente e divertido!
          </p>

          {/* Botão */}
          <Link to="/quiz">
            <button
              className="home-button"
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#083a6b")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#0a518e")
              }
            >
              QUERO INICIAR!!
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}