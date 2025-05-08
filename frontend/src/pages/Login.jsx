import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
        <div style={styles.title}>Login</div>
        <img src="/Logo.png" alt="Logo" style={styles.logo} />
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