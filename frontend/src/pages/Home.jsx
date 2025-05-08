import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#d5f3ff",
        fontFamily: "Sans-serif",
        width: "100vw", // Garante que ocupa 100% da largura da tela
        height: "100vh", // Garante que ocupa 100% da altura da tela
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          backgroundColor: "#0a518e",
          color: "white",
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center", 
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            letterSpacing: "0.1em",
          }}
        >
          BEM-VINDOS!
        </h1>
        <img
          src="/Logo.png"
          alt="Logo Aprova"
          style={{
            height: "6rem",
            position: "absolute",
            top: "50%",
            right: "1.5rem",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      {/* Subtítulo faixa azul clara */}
      <div
        style={{
          backgroundColor: "#a7cceb",
          color: "white",
          textAlign: "center",
          padding: "0.75rem 0",
          fontSize: "1.25rem",
          fontWeight: "600",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          margin: "1rem 1rem",
        }}
      >
        "A CADA QUIZ, UM PASSO MAIS PERTO DA APROVAÇÃO"
      </div>

      {/* Conteúdo principal */}
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        {/* Ilustração */}
        <img
          src="/HomeAprova.png"
          alt="Estudante comemorando"
          style={{
            width: "30rem",
          }}
        />

        {/* Texto descritivo */}
        <div
          style={{
            maxWidth: "40rem",
            color: "#003b6f",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            Seja bem-vindo ao seu novo aliado na preparação para o vestibular!
          </h2>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
            Revise os principais conteúdos com nossos quizzes interativos.
            Teste seus conhecimentos, descubra onde melhorar e prepare-se para
            as provas.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: "700",
            }}
          >
            Comece agora e torne seu estudo mais inteligente e divertido!
          </p>

          {/* Botão */}
          <Link to="/quiz"> {/* Link para a página de login */}
            {/* Botão de início */}

            <button
              style={{
                backgroundColor: "#0a518e",
                color: "white",
                fontWeight: "700",
                fontSize: "1rem",
                padding: "0.75rem 2rem",
                borderRadius: "0.75rem",
                marginTop: "1.5rem",
                transition: "background-color 0.2s",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
                cursor: "pointer",
              }}
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