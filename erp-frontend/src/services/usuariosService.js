import api from './api'; // Importa o Axios configurado no arquivo `api.js`

/**
 * Serviço para realizar login de um usuário.
 * @param {Object} dados - Dados de login (email e senha).
 * @returns {Promise<Object>} - Resposta do servidor.
 */
export const login = async (dados) => {
  try {
    const response = await api.post('/usuarios/login', dados);
    // Salva o token no localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

/**
 * Serviço para registrar um novo usuário.
 * @param {Object} dados - Dados do novo usuário (nome, email, senha).
 * @returns {Promise<Object>} - Resposta do servidor.
 */
export const register = async (dados) => {
  try {
    const response = await api.post('/usuarios/register', dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

/**
 * Serviço para listar todos os usuários.
 * @returns {Promise<Object[]>} - Lista de usuários.
 */
export const listarUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    throw error;
  }
};

/**
 * Serviço para deletar um usuário.
 * @param {number} id - ID do usuário a ser deletado.
 * @returns {Promise<void>} - Confirmação de exclusão.
 */
export const deletarUsuario = async (id) => {
  try {
    await api.delete(`/usuarios/${id}`);
    console.log(`Usuário com ID ${id} deletado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${id}:`, error);
    throw error;
  }
};
