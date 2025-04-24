import React, { useState } from 'react';

const perguntas = [
  {
    pergunta: "Qual é a fórmula da velocidade média?",
    alternativas: [
      "v = d / t",
      "v = m * a",
      "v = E / t",
      "v = F / m"
    ],
    correta: 0
  },
  {
    pergunta: "Qual planeta é conhecido como o planeta vermelho?",
    alternativas: [
      "Terra",
      "Marte",
      "Júpiter",
      "Vênus"
    ],
    correta: 1
  }
];

export default function Quiz() {
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);

  const perguntaAtual = perguntas[indice];

  function responder(indiceAlternativa) {
    setRespostaSelecionada(indiceAlternativa);
    if (indiceAlternativa === perguntaAtual.correta) {
      setAcertos(acertos + 1);
    }
    setTimeout(() => {
      if (indice + 1 < perguntas.length) {
        setIndice(indice + 1);
        setRespostaSelecionada(null);
      } else {
        alert(`Você acertou ${acertos + (indiceAlternativa === perguntaAtual.correta ? 1 : 0)} de ${perguntas.length} perguntas!`);
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/imagem-fundo-enem.jpg')" }}>
      <header className="bg-[#0D6E9C] text-white p-4 flex justify-between items-center italic underline text-lg">
        <span>ENEM360</span>
        <img src="/logo-enem.png" alt="Logo ENEM" className="h-12" />
      </header>

      <main className="flex-grow flex flex-col justify-center items-center gap-10 px-4 text-white text-center">
        <h2 className="text-3xl font-bold">{perguntaAtual.pergunta}</h2>
        <div className="grid gap-4 w-full max-w-xl">
          {perguntaAtual.alternativas.map((alt, i) => (
            <button
              key={i}
              onClick={() => responder(i)}
              disabled={respostaSelecionada !== null}
              className={`px-6 py-4 rounded-full font-bold text-lg transition duration-200
                ${respostaSelecionada === null
                  ? 'bg-white text-[#0D6E9C] hover:brightness-90'
                  : i === perguntaAtual.correta
                    ? 'bg-green-500 text-white'
                    : i === respostaSelecionada
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                }`}
            >
              {alt}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
