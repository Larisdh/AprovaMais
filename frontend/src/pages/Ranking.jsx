import React from "react";
import { Link } from "react-router-dom";

function Ranking() {
  const styles = {
    body: {
      backgroundColor: "#88b7d5",
      fontFamily: "Sans-serif",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      backgroundColor: "#0a518e",
      color: "white",
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomLeftRadius: "1rem",
      borderBottomRightRadius: "1rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    nav: {
      display: "flex",
      gap: "2rem",
      alignItems: "center",
      fontSize: "1rem",
    },
    logo: {
      height: "3rem",
    },
    search: {
      padding: "0.5rem",
      borderRadius: "0.5rem",
      border: "1px solid #ccc", // Adicionado borda
      fontSize: "1rem",
      backgroundColor: "white", // Fundo branco
      color: "#333",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textDecoration: "underline",
      color: "white",
    },
    main: {
    flexGrow: 1, 
    display: "flex",
    padding: "2rem",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    width: "100%",
    },
    side: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    bar: {
      backgroundColor: "#d5f3ff",
      padding: "0.75rem 1rem",
      borderRadius: "2rem",
      minWidth: "15rem",
      fontWeight: "bold",
      color: "#003b6f",
      textAlign: "left",
    },
    image: {
      height: "16rem",
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <span style={styles.title}>Ranking</span>
        <nav style={styles.nav}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Página Inicial</Link>
          <Link to="/perfil" style={{ color: "white", textDecoration: "none" }}>Perfil</Link>
          <input type="text" placeholder="Buscar..." style={styles.search} />
          <img src="/Logo.png" alt="Logo Aprova" style={styles.logo} />
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.side}>
          <div style={styles.bar}>Matemática: 3/5</div>
          <div style={styles.bar}>Português: 4/5</div>
          <div style={styles.bar}>História: 5/5</div>
          <div style={styles.bar}>Geografia: 2/5</div>
          <div style={styles.bar}>Ciências: 3/5</div>
        </div>

        {/* Referência à imagem trofeu.png na pasta public */}
        <img src="/trofeu.png" alt="Personagem com troféu" style={styles.image} />

        <div style={styles.side}>
          <div style={styles.bar}>Aluno A</div>
          <div style={styles.bar}>Aluno B</div>
          <div style={styles.bar}>Aluno C</div>
          <div style={styles.bar}>Aluno D</div>
          <div style={styles.bar}>Aluno E</div>
        </div>
      </main>
    </div>
  );
}

export default Ranking;