const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultvalue: false,
    })
    await queryInterface.createTable('tokens', {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      user_username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'users', key: 'username' }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'disabled')
    await queryInterface.dropTable('tokens')
  },
}