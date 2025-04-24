import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/imagem-fundo-enem.jpg')" }}
    >
      {/* Top Bar */}
      <header className="bg-[#0D6E9C] text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-extrabold tracking-wide"></div>
        <img src="/aprovamais.png"  className="h-10" />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-6 py-10 gap-8">
        <h2 className="text-[#0D6E9C] text-lg font-semibold tracking-wide uppercase">
          "A cada quiz, um passo mais perto da aprovação"
        </h2>

        <h1 className="text-4xl md:text-5xl font-bold text-[#002B50] leading-snug max-w-3xl">
          Seja bem-vindo ao seu novo aliado na preparação para o vestibular!
        </h1>

        <p className="text-[#03436C] text-lg max-w-2xl font-medium">
          Revise os principais conteúdos com nossos quizzes interativos. Teste seus conhecimentos,
          descubra onde melhorar e prepare-se para as provas.
          <br />
          <span className="font-bold text-[#002B50]">
            Comece agora e torne seu estudo mais inteligente e divertido!
          </span>
        </p>

        <Link to="/quiz">
          <button className="bg-[#0073B1] hover:bg-[#005f91] transition text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg mt-4">
            QUERO INICIAR!!
          </button>
        </Link>

        {/* Ilustração (opcional, caso queira adicionar como na imagem) */}
        <img
          src="/carinhaaprovando.png"
          alt="Ilustração Estudante Aprovado"
          className="max-w-sm w-full mt-6"
        />
      </main>
    </div>
  );
}
