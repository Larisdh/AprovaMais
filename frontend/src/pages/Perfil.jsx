import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Perfil.css";

export default function PerfilScreen() {
  const [nome, setNome] = useState("");
  const [objetivo, setObjetivo] = useState("Ser aprovado(a) no vestibular!");
  const [prova, setProva] = useState("ENEM");
  const [materias, setMaterias] = useState("História\nGeografia\nFilosofia\nAtualidades");
  const [rotina, setRotina] = useState(
    "Estudar em casa\nUsar simulados e questões comentadas\nFazer revisões regulares com foco em desempenho"
  );

  // Caminho inicial da imagem do perfil (localizada na pasta public)
  const [imagemPerfil, setImagemPerfil] = useState("/user-default.png");

  const handleSalvar = () => {
    alert("Informações salvas com sucesso!");
  };

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagemPerfil(url); // Atualiza a imagem com a URL do arquivo selecionado
    }
  };

  const handleRemoverImagem = () => {
    setImagemPerfil(""); // Remove a imagem do perfil
  };

  return (
    <>
      {/* Cabeçalho igual ao do Quiz */}
      <header className="perfil-header">
        <span className="perfil-title">Perfil</span>
        <nav className="perfil-nav">
          <Link to="/home" className="perfil-link">
            Página Inicial
          </Link>
          <Link to="/ranking" className="perfil-link">
            Ranking
          </Link>
          <img src="/Logo.png" alt="Logo ENEM" className="perfil-logo" />
        </nav>
      </header>

      <div className="container">
        <div className="profile-pic-wrapper">
          {/* Exibe a imagem do perfil */}
          <div
            className="profile-pic"
            style={{
              backgroundImage: imagemPerfil ? `url(${imagemPerfil})` : "none",
              backgroundColor: imagemPerfil ? "transparent" : "#f0f0f0", // Fundo cinza claro se não houver imagem
            }}
          ></div>
          <input
            type="file"
            id="imagemInput"
            accept="image/*"
            onChange={handleImagemChange}
            hidden
          />
          <button
            onClick={() => document.getElementById("imagemInput").click()}
            className="mudar-foto-btn"
          >
            Mudar imagem
          </button>
          <button
            onClick={handleRemoverImagem}
            className="remover-foto-btn"
          >
            Remover imagem
          </button>
        </div>

        <div className="profile-info">
          <label>👤 Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />

          <label>🎯 Objetivo:</label>
          <input
            type="text"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
          />

          <label>📚 Estuda para:</label>
          <input
            type="text"
            value={prova}
            onChange={(e) => setProva(e.target.value)}
          />

          <label>🧠 Matérias de maior Interesse:</label>
          <textarea
            value={materias}
            onChange={(e) => setMaterias(e.target.value)}
            rows={4}
          />

          <label>📅 Rotina de Estudos:</label>
          <textarea
            value={rotina}
            onChange={(e) => setRotina(e.target.value)}
            rows={4}
          />

          <button className="save-button" onClick={handleSalvar}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
}