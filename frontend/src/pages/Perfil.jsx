import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/Perfil.css";

export default function PerfilScreen() {
  const [user] = useAuthState(auth);

  const [nome, setNome] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [prova, setProva] = useState("");
  const [materias, setMaterias] = useState("");
  const [rotina, setRotina] = useState("");

  useEffect(() => {
    if (!user) return;

    async function carregarPerfil() {
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
          console.log("Perfil ainda não existe.");
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    }

    carregarPerfil();
  }, [user]);

  const handleSalvar = async () => {
    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome || "",
        objetivo: objetivo || "",
        prova: prova || "",
        materias: materias || "",
        rotina: rotina || "",
      });

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil.");
    }
  };

  return (
    <>
      <header className="perfil-header">
        <span className="perfil-title">Perfil</span>
        <nav className="perfil-nav">
          <Link
            to="/home"
            style={{
              color: "white",
              textDecoration: "none",
              transition: "color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#405ceaee")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Página Inicial
          </Link>
          <Link
            to="/ranking"
            style={{
              color: "white",
              textDecoration: "none",
              transition: "color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#405ceaee")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Ranking
          </Link>
          <img src="/Logo.png" alt="Logo ENEM" className="perfil-logo" />
        </nav>
      </header>

      <div className="container">
        <div className="profile-info">
          <label>👤 Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
