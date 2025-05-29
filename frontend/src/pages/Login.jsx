import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig"; // Verifique se este caminho está correto
import { useNavigate } from "react-router-dom";
import "./css/Login.css"; // Importa o arquivo CSS específico do Login

// Ícone do Google
const GoogleIcon = () => (
  <svg className="google-icon-svg" viewBox="0 0 24 24" width="20px" height="20px">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLoginEmailSenha = async (e) => {
    e.preventDefault();
    setErro("");
    if (!email || !senha) {
      setErro("Por favor, preencha e-mail e senha.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/home");
    } catch (error) {
      console.error("Erro no login com email/senha:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setErro("E-mail ou senha inválidos.");
      } else if (error.code === 'auth/invalid-email') {
        setErro("O formato do e-mail é inválido.");
      } else {
        setErro("Ocorreu um erro ao tentar fazer login.");
      }
    }
  };

  const handleLoginGoogle = async () => {
    setErro("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      console.error("Erro no login com Google:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setErro("Login com Google cancelado pelo usuário.");
      } else {
        setErro("Erro ao fazer login com Google. Tente novamente.");
      }
    }
  };

  return (
    <div className="page-container login-page-container">
      <header className="app-header login-custom-header">
        {/* O span para o título e o img para o logo são estilizados globalmente por .app-header */}
        <span className="app-header-page-title">Login</span>
        <img src="/Logo.png" alt="Logo Aprova+" className="app-logo" />
      </header>

      <main className="login-main-content">
        <div className="login-content-wrapper">
          <form onSubmit={handleLoginEmailSenha} className="login-box">
            <h2 className="login-box__title">Acesse sua conta</h2>

            <div className="form-group">
              <label htmlFor="email-login" className="form-label sr-only">E-mail</label>
              <input
                type="email"
                id="email-login"
                className="form-input login-input" // Garanta que .form-input e .login-input sejam aplicados
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Campo de e-mail"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha-login" className="form-label sr-only">Senha</label>
              <input
                type="password"
                id="senha-login"
                className="form-input login-input" // Garanta que .form-input e .login-input sejam aplicados
                placeholder="Sua Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                aria-label="Campo de senha"
                autoComplete="current-password"
              />
            </div>

            {erro && <p className="form-message form-message--error login-error">{erro}</p>}

            <button type="submit" className="button button--primary login-button">
              Entrar com E-mail
            </button>
          </form>

          <div className="login-social-separator">
            <span className="login-divisor__line"></span>
            <span className="login-divisor__text">ou</span>
            <span className="login-divisor__line"></span>
          </div>

          <div className="login-box login-social-box">
            {/* Adicionando .button--secondary explicitamente */}
            <button onClick={handleLoginGoogle} className="button button--secondary login-button-google">
              <GoogleIcon />
              Entrar com Google
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Login;