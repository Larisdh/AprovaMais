// src/services/quizService.js

// ❗ IMPORTANTE: Sua variável de ambiente VITE_API_BASE_URL no projeto frontend (na Vercel e no .env.local)
// deve ser apenas a URL base do backend, sem barras no final.
// Exemplo: VITE_API_BASE_URL=https://aprova-mais-backend.vercel.app
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Busca uma lista de perguntas com base na matéria e quantidade.
 * @param {string | null} materia - A matéria para filtrar as perguntas.
 * @param {number} quantidade - O número de perguntas a serem retornadas.
 * @returns {Promise<Array>}
 */
export const fetchPerguntas = async (materia, quantidade) => {
  try {
    // ✅ CORREÇÃO: Construímos a URL com o prefixo /api/ obrigatório.
    let url = `${API_BASE_URL}/perguntas?quantidade=${quantidade}`;
    if (materia) {
      url += `&materia=${encodeURIComponent(materia)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Falha ao buscar perguntas (status: ${response.status})`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro em fetchPerguntas:", error);
    throw error; // Re-lança o erro para ser tratado no componente.
  }
};

/**
 * Salva o resultado de um quiz para um usuário.
 * @param {object} resultadoData - Objeto com { userId, acertos, total, materia }.
 * @returns {Promise<object>}
 */
export const saveResultado = async (resultadoData) => {
  try {
    // ✅ CORREÇÃO: Rota corrigida para /api/resultados.
    const response = await fetch(`${API_BASE_URL}/api/resultados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultadoData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Falha ao salvar resultado (status: ${response.status})`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro em saveResultado:", error);
    throw error;
  }
};


/**
 * Busca o ranking geral dos melhores jogadores.
 * @returns {Promise<Array>}
 */
export const fetchRanking = async () => {
  try {
    // ✅ CORREÇÃO: Rota corrigida para /api/ranking.
    const response = await fetch(`${API_BASE_URL}/api/ranking`);
    
    if (!response.ok) {
      const errorBody = await response.text();
      let errorJson = {};
      try {
        errorJson = JSON.parse(errorBody);
      } catch (e) {
        throw new Error(`Falha ao buscar ranking (status: ${response.status}) - ${errorBody.substring(0, 100)}`);
      }
      throw new Error(errorJson.error || `Falha ao buscar ranking (status: ${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro em fetchRanking:", error.message);
    throw error; 
  }
};