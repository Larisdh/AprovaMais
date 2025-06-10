import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
<<<<<<< HEAD

import Home from "./pages/Home";

=======
import Home from "./pages/Home";
>>>>>>> release/1.0
import Quiz from "./pages/Quiz";

import Ranking from "./pages/Ranking";
import PerfilScreen from "./pages/Perfil"; // ✅ CORRETA
import PrivateRoute from "./pages/PrivateRoute";

import "./App.css";

import PrivateRoute from "./pages/PrivateRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
<<<<<<< HEAD
          <PrivateRoute> <Home /> </PrivateRoute>}/>
        <Route path="/quiz" element={
            <PrivateRoute> <Quiz /> </PrivateRoute>}/>
=======
          <PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="/quiz" element={
          <PrivateRoute> <Quiz /> </PrivateRoute>} />
>>>>>>> release/1.0
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/perfil" element={
          <PrivateRoute> <PerfilScreen /> </PrivateRoute>} /> {/* ✅ CORRIGIDA */}
      </Routes>
    </Router>
  );
}

export default App;
