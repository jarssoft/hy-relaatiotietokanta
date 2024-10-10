const {DataTypes ,Sequelize, Model}= require("sequelize")
const {sequelize} = require("../util/db")

class Token extends Model {}

Token.init({
    token: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'users', key: 'username' }
    }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  createdAt: true,
  updatedAt: false,
  modelName: 'token'   
})

module.exports = User