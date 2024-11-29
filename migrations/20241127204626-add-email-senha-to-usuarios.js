'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('usuarios', 'senha', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Verifica a estrutura da tabela antes de remover as colunas
    const tableDescription = await queryInterface.describeTable('usuarios');

    if (tableDescription.email) {
      await queryInterface.removeColumn('usuarios', 'email');
    }
    if (tableDescription.senha) {
      await queryInterface.removeColumn('usuarios', 'senha');
    }
  },
};
