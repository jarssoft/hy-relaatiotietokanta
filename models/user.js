const {DataTypes ,Sequelize, Model}= require("sequelize")
const {sequelize} = require("../util/db")

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,        
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

module.exports = User