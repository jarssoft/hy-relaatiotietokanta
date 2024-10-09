const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'users', key: 'username' },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
      readed: {
        type: DataTypes.BOOLEAN,
        default: false,
        defaultValue: false
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readings')
  },
}