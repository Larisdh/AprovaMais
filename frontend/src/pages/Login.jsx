import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLoginEmailSenha = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/home");
    } catch {
      setErro("Usuário ou senha inválidos.");
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch {
      setErro("Erro ao fazer login com Google.");
    }
  };

  const styles = {
    body: {
      minHeight: "100vh", // Altura mínima igual à altura da tela
      width: "100vw", // Largura total da tela
      backgroundImage: "url('https://jwnews.com.br/wp-content/uploads/2024/08/enem1.jpg')",
      backgroundSize: "cover", // Faz a imagem cobrir toda a área
      backgroundPosition: "center", // Centraliza a imagem
      
      
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Sans-serif",
    },
    header: {
      backgroundColor: "#0a518e",
      width: "95.7%",
      padding: "1rem 2rem",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomLeftRadius: "1rem",
      borderBottomRightRadius: "1rem",
      boxShadow: "0 4px 6px rgba(227, 203, 203, 0.1)",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      borderBottom: "2px solid white",
      display: "inline-block",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      fontSize: "1rem",
    },
    logo: {
      height: "5rem",
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
    divisor: {
      textAlign: "center",
      fontWeight: "bold",
    },
    erro: {
      color: "red",
      fontWeight: "bold",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <span style={styles.title}>Login</span>
        <nav style={styles.nav}>
          
          <input
            type="text"
            placeholder="Buscar..."
            style={{
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              fontSize: "1rem",
              backgroundColor: "white",
              color: "#333",
            }}
          />
          <img src="/Logo.png" alt="Logo" style={styles.logo} />
        </nav>
      </header>

      <form onSubmit={handleLoginEmailSenha} style={styles.loginBox}>
        <input
          type="email"
          placeholder="E-MAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="SENHA"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={styles.input}
        />

        {erro && <p style={styles.erro}>{erro}</p>}

        <button type="submit" style={styles.button}>
          Entrar com E-mail
        </button>
      </form>

      <div style={{ ...styles.loginBox, alignItems: "center", padding: "1rem" }}>
        <div style={styles.divisor}>ou</div>
        <button onClick={handleLoginGoogle} style={styles.button}>
          Entrar com Google
        </button>
      </div>
    </div>
  );
}

export default Login;