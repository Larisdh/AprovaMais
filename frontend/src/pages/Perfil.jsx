// src/pages/PerfilScreen.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/Perfil.css"; // CSS específico do Perfil

export default function PerfilScreen() {
  const [user, loadingAuth, errorAuth] = useAuthState(auth); // Adicionando loading e error do hook

  const [nome, setNome] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [prova, setProva] = useState("");
  const [materias, setMaterias] = useState("");
  const [rotina, setRotina] = useState("");
  const [carregandoPerfil, setCarregandoPerfil] = useState(true);
  const [erroPerfil, setErroPerfil] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!user && !loadingAuth) { // Se não houver usuário e autenticação não estiver carregando
      setCarregandoPerfil(false);
      // Poderia redirecionar para o login aqui se desejado
      // navigate("/login");
      return;
    }
    if (user) {
      async function carregarPerfil() {
        setCarregandoPerfil(true);
        setErroPerfil(null);
        try {
          const refUser = doc(db, "usuarios", user.uid);
          const snap = await getDoc(refUser);

          if (snap.exists()) {
            const data = snap.data();
            setNome(data.nome || "");
            setObjetivo(data.objetivo || "");
            setProva(data.prova || "");
            setMaterias(data.materias || "");
            setRotina(data.rotina || "");
          } else {
            console.log("Perfil ainda não existe, usuário pode preencher.");
          }
        } catch (err) {
          console.error("Erro ao carregar perfil:", err);
          setErroPerfil("Falha ao carregar dados do perfil.");
        } finally {
          setCarregandoPerfil(false);
        }
      }
      carregarPerfil();
    }
  }, [user, loadingAuth]); // Adicionado loadingAuth

  const handleSalvar = async (e) => {
    e.preventDefault(); // Prevenir submit padrão se estiver em um form
    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }
    setSalvando(true);
    try {
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome || "",
        objetivo: objetivo || "",
        prova: prova || "",
        materias: materias || "",
        rotina: rotina || "",
      });
      alert("Perfil atualizado com sucesso!"); // Idealmente, usar um toast/notificação
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil."); // Idealmente, usar um toast/notificação
    } finally {
      setSalvando(false);
    }
  };

  // Se autenticação ainda está carregando
  if (loadingAuth) {
    return (
      <div className="page-container perfil-page-container">
        {/* Pode usar o mesmo spinner da página de Quiz */}
        <div className="perfil-feedback-container">
          <p className="perfil-feedback-text">Verificando autenticação...</p>
          <div className="quiz-spinner"></div>
        </div>
      </div>
    );
  }

  // Se não há usuário logado (após autenticação terminar)
  if (!user) {
    return (
      <div className="page-container perfil-page-container">
        <header className="app-header perfil-custom-header">
          <Link to="/" className="app-header-logo-link">
            <img src="/Logo.png" alt="Logo Aprova+" className="app-logo" />
          </Link>
          <h1 className="app-header-page-title">Perfil</h1>
        </header>
        <main className="perfil-main-content">
          <div className="perfil-feedback-container">
            <p className="perfil-feedback-text">Você precisa estar logado para ver seu perfil.</p>
            <Link to="/login" className="button button--primary">Ir para Login</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    // Adiciona page-container para consistência com outras páginas
    <div className="page-container perfil-page-container">
      {/* Reutilizando o app-header global com customizações se necessário */}
      <header className="app-header perfil-custom-header">
<<<<<<< HEAD
        <Link to="/" className="app-header-logo-link">
          <img src="/Logo.png" alt="Logo Aprova+" className="app-logo" />
        </Link>
        <h1 className="app-header-page-title">Meu Perfil</h1>
        <nav className="app-header-nav perfil-custom-nav">
          <Link to="/home" className="app-header-nav-link">Início</Link>
          <Link to="/ranking" className="app-header-nav-link">Ranking</Link>
        </nav>
      </header>
=======
  <Link to="/home" className="app-header-logo-link"> {/* Alterado para redirecionar à página Home */}
    <img src="/Logo.png" alt="Logo Aprova+" className="app-logo" />
  </Link>
  <h1 className="app-header-page-title">Meu Perfil</h1>
  <nav className="app-header-nav perfil-custom-nav">
    <Link to="/home" className="app-header-nav-link">
      Início
    </Link>
    <Link to="/ranking" className="app-header-nav-link">
      Ranking
    </Link>
  </nav>
</header>
>>>>>>> 55cdc6a427071cd5a9b685b747e2b6863a167c75

      <main className="perfil-main-content">
        {carregandoPerfil ? (
          <div className="perfil-feedback-container">
            <p className="perfil-feedback-text">Carregando perfil...</p>
            <div className="quiz-spinner"></div> {/* Reutilizando spinner */}
          </div>
        ) : erroPerfil ? (
          <div className="perfil-feedback-container error-container">
            <p className="perfil-feedback-text error-text">{erroPerfil}</p>
          </div>
        ) : (
          // Formulário envolto em um 'card' para estilização
          <form className="perfil-form-card" onSubmit={handleSalvar}>
            <h2 className="perfil-form-title">Informações Pessoais</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome" className="form-label">👤 Nome Completo:</label>
                <input
                  type="text"
                  id="nome"
                  className="form-input"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome como será exibido"
                />
              </div>

              <div className="form-group">
                <label htmlFor="objetivo" className="form-label">🎯 Seu Principal Objetivo:</label>
                <input
                  type="text"
                  id="objetivo"
                  className="form-input"
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  placeholder="Ex: Ser aprovado em Medicina na USP"
                />
              </div>

              <div className="form-group">
                <label htmlFor="prova" className="form-label">📚 Estuda para qual prova?</label>
                <input
                  type="text"
                  id="prova"
                  className="form-input"
                  value={prova}
                  onChange={(e) => setProva(e.target.value)}
                  placeholder="Ex: ENEM, FUVEST, Vestibular específico"
                />
              </div>
            </div> {/* Fim do form-grid */}

            <div className="form-group">
              <label htmlFor="materias" className="form-label">🧠 Matérias de Maior Interesse/Foco:</label>
              <textarea
                id="materias"
                className="form-textarea"
                value={materias}
                onChange={(e) => setMaterias(e.target.value)}
                rows={4}
                placeholder="Liste as matérias que você mais se dedica ou tem interesse"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rotina" className="form-label">📅 Descreva sua Rotina de Estudos:</label>
              <textarea
                id="rotina"
                className="form-textarea"
                value={rotina}
                onChange={(e) => setRotina(e.target.value)}
                rows={4}
                placeholder="Como você organiza seus estudos? Manhã, tarde, noite? Quantas horas?"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="button button--primary perfil-save-button"
                disabled={salvando}
              >
                {salvando ? "Salvando..." : "Salvar Alterações"}
              </button>
              <Link
                to="/home"
                className="button button--secondary perfil-home-button"
              >Voltar para Início</Link>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}