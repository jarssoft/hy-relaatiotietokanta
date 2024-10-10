const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'users', key: 'username' },
        unique: 'actions_unique',
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
        unique: 'actions_unique',
      },
      readed: {
        type: DataTypes.BOOLEAN,
        default: false,
        defaultValue: false,
      },
    }, {
      uniqueKeys: {
          actions_unique: {
              fields: ['user_username', 'blog_id']
          }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readings')
  },
}