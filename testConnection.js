const { Sequelize } = require('sequelize');

// Configuração do Sequelize
const sequelize = new Sequelize('erp_database', 'root', '28042022', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

// Teste de conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
