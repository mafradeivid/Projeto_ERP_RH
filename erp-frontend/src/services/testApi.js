import api from './api'; // Certifique-se de que o api.js está configurado corretamente

const testApi = async () => {
  try {
    const response = await api.get('/usuarios'); // Testa o endpoint GET /usuarios
    console.log('Resposta da API:', response.data);
  } catch (error) {
    console.error('Erro ao conectar à API:', error);
  }
};

export default testApi;
