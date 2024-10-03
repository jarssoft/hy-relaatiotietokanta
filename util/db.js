
const Sequelize = require('sequelize')
const { DATABASE } = require('../util/config')

const sequelize = new Sequelize(DATABASE)

module.exports = sequelize