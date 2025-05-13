import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import "./css/Login.css"; // Adjust the path if the file exists in the correct location

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

  return (
    <div className="login-body">
      <header className="login-header">
        <span className="login-title">Login</span>
        <nav className="login-nav">
          <input
            type="text"
            placeholder="Buscar..."
            className="login-search"
          />
          <img src="/Logo.png" alt="Logo" className="login-logo" />
        </nav>
      </header>

      <form onSubmit={handleLoginEmailSenha} className="login-box">
        <input
          type="email"
          placeholder="E-MAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="SENHA"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="login-input"
        />

        {erro && <p className="login-error">{erro}</p>}

        <button type="submit" className="login-button">
          Entrar com E-mail
        </button>
      </form>

      <div className="login-box login-google">
        <div className="login-divisor">ou</div>
        <button onClick={handleLoginGoogle} className="login-button">
          Entrar com Google
        </button>
      </div>
    </div>
  );
}

export default Login;