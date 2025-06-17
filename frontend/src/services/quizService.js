// src/services/quizService.js

// Esta variável deve conter APENAS a base da URL, sem /api.
// Exemplo correto na Vercel: https://aprova-mais-backend.vercel.app
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const saveScore = async (user, pontos) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, pontos }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Falha ao salvar pontuação"}));
      console.error("Erro ao salvar pontuação:", response.status, errorData);
      throw new Error(errorData.error || errorData.message || `Falha ao salvar pontuação (status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em saveScore:", error);
    throw error;
  }
};

/**
 * Busca o ranking dos melhores jogadores.
 * @returns {Promise<Array>} - Promise com a lista de ranking
 */
export const fetchRanking = async () => {
  try {
    console.log("[quizService] Solicitando ranking...");
    // CORREÇÃO: Adicionado /api/ para construir a URL correta e evitar a duplicação.
    const response = await fetch(`${API_BASE_URL}/ranking`); // <-- CORREÇÃO PRINCIPAL
    
    if (!response.ok) {
      const errorBody = await response.text();
      let errorJson = {};
      try {
        errorJson = JSON.parse(errorBody);
      } catch (e) {
        console.error("Erro na API de Ranking (não JSON):", response.status, errorBody);
        throw new Error(`Falha ao buscar ranking (status: ${response.status}) - ${errorBody.substring(0, 100)}`);
      }
      console.error("Erro na resposta da API de Ranking:", response.status, errorJson);
      throw new Error(errorJson.error || `Falha ao buscar ranking (status: ${response.status})`);
    }
    const data = await response.json();
    console.log("[quizService] Ranking recebido:", data);
    return data;
  } catch (error) {
    console.error("Erro em fetchRanking:", error.message);
    throw error; // Re-lança o erro para ser pego pelo componente Ranking.jsx
  }
};