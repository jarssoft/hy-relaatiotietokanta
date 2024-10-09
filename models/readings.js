const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Readings extends Model {}

Readings.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userUsername: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: 'users', key: 'username' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' }
  },
  readed: {
    type: DataTypes.BOOLEAN,
    default: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readings'
})

module.exports = Readings