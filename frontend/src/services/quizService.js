// src/services/quizService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Salva a pontuação do usuário no servidor (OBS: Esta função se torna redundante
 * se o POST para /api/resultados já está sendo feito diretamente no Quiz.jsx
 * e é a forma principal de registrar o resultado e atualizar estatísticas)
 *
 * Se você remover a chamada a esta função no Quiz.jsx, pode remover esta função daqui também.
 */
export const saveScore = async (user, pontos) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scores`, { // Esta rota foi removida do server.js refatorado
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, pontos }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Falha ao salvar pontuação (opcional)"}));
      console.error("Erro ao salvar pontuação (opcional):", response.status, errorData);
      throw new Error(errorData.error || errorData.message || `Falha ao salvar pontuação (opcional) (status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em saveScore (opcional):", error);
    // Não re-lançar se for opcional e o outro salvamento for o principal
    // throw error; 
    return { message: "Tentativa de salvamento opcional falhou ou não necessária." };
  }
};

/**
 * Busca o ranking dos melhores jogadores da coleção 'estatisticas'
 * @returns {Promise<Array>} - Promise com a lista de ranking
 */
export const fetchRanking = async () => {
  try {
    console.log("[quizService] Solicitando /api/ranking...");
    const response = await fetch(`${API_BASE_URL}/ranking`); // ✅ ALTERADO PARA /api/ranking
    
    if (!response.ok) {
      const errorBody = await response.text(); // Pegar o corpo do erro como texto
      let errorJson = {};
      try {
        errorJson = JSON.parse(errorBody);
      } catch (e) {
        // Não é JSON, usar o texto do corpo ou um erro padrão
        console.error("Erro na API de Ranking (não JSON):", response.status, errorBody);
        throw new Error(`Falha ao buscar ranking (status: ${response.status}) - ${errorBody.substring(0, 100)}`);
      }
      console.error("Erro na resposta da API de Ranking:", response.status, errorJson);
      throw new Error(errorJson.error || `Falha ao buscar ranking (status: ${response.status})`);
    }
    const data = await response.json();
    console.log("[quizService] Ranking recebido de /api/ranking:", data);
    return data;
  } catch (error) {
    console.error("Erro em fetchRanking:", error.message);
    throw error; // Re-lança o erro para ser pego pelo componente Ranking.jsx
  }
};