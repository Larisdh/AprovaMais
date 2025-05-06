import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Bem-vindo, ${form.nome}!`); // Corrigido para usar crases e interpolação
  }

  const styles = {
    body: {
      minHeight: "100vh",
      width: "100vw",
      backgroundImage: "url('/imagem-fundo-enem.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      backgroundColor: "#0a518e",
      width: "100%",
      padding: "1rem 2rem",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontStyle: "italic",
      fontSize: "1.2rem",
      textDecoration: "underline",
    },
    logo: {
      height: "3rem",
    },
    loginBox: {
      backgroundColor: "#e6f7ff",
      borderRadius: "2rem",
      padding: "2rem",
      marginTop: "4rem",
      width: "90%",
      maxWidth: "400px",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    input: {
      padding: "1rem",
      borderRadius: "2rem",
      border: "none",
      backgroundColor: "#7ec8e3",
      color: "white",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    button: {
      backgroundColor: "#0a518e",
      color: "white",
      border: "none",
      padding: "1rem",
      borderRadius: "2rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <div style={styles.title}>Login</div>
        <img src="/Logo.png" alt="Logo" style={styles.logo} />
      </header>

      <form style={styles.loginBox} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="nome"
          placeholder="NOME"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="E-MAIL"
          value={form.email}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="tel"
          name="telefone"
          placeholder="TELEFONE"
          value={form.telefone}
          onChange={handleChange}
        />
        <button type="submit" style={styles.button}>
          ENTRAR
        </button>
      </form>
    </div>
  );
}