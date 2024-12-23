'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar se a tabela já existe
    const tableInfo = await queryInterface.describeTable('usuarios').catch(() => null);

    if (!tableInfo) {
      // Criar a tabela usuarios com as colunas necessárias
      await queryInterface.createTable('usuarios', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true, // Garantir que os emails sejam únicos
        },
        senha: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    } else {
      console.log('Tabela "usuarios" já existe. Nenhuma ação foi realizada.');
    }
  },

  async down(queryInterface, Sequelize) {
    // Remover a tabela usuarios caso necessário
    const tableInfo = await queryInterface.describeTable('usuarios').catch(() => null);

    if (tableInfo) {
      await queryInterface.dropTable('usuarios');
    } else {
      console.log('Tabela "usuarios" não encontrada. Nenhuma ação foi realizada.');
    }
  },
};
