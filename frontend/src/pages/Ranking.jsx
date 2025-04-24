import React from "react";

export default function Ranking() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/imagem-fundo-enem.jpg')" }}>
      <header className="bg-[#0D6E9C] text-white p-4 flex justify-between items-center italic underline text-lg">
        <span>ENEM360</span>
        <img src="/logo-enem.png" alt="Logo ENEM" className="h-12" />
      </header>

      <main className="flex-grow flex flex-col justify-center items-center gap-10 px-4">
        <h1 className="text-white text-4xl font-bold text-center leading-snug">
          Ranking
        </h1>
        <p className="text-white text-lg text-center">
          Veja aqui o ranking dos melhores desempenhos!
        </p>
      </main>
    </div>
  );
}   