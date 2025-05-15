// Serviço para interagir com a API de quiz
const API_URL = "http://localhost:3000/api";

/**
 * Salva a pontuação do usuário no servidor
 * @param {string} user - Nome do usuário
 * @param {number} pontos - Pontuação obtida
 * @returns {Promise} - Promise com o resultado da operação
 */
export const saveScore = async (user, pontos) => {
  try {
    const response = await fetch(`${API_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, pontos }),
    });

    if (!response.ok) {
      throw new Error("Falha ao salvar pontuação");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao salvar pontuação:", error);
    throw error;
  }
};

/**
 * Busca o ranking dos melhores jogadores
 * @returns {Promise<Array>} - Promise com a lista de ranking
 */
export const fetchRanking = async () => {
  const response = await fetch(`${API_URL}/scores`);
  if (!response.ok) {
    throw new Error("Falha ao buscar ranking");
  }
  return await response.json();
};