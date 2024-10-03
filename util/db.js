
const Sequelize = require('sequelize')
const { DATABASE } = require('../util/config')

const sequelize = new Sequelize(DATABASE)

const connectToDatabase = async () => {
    try {
      await sequelize.authenticate()
      console.log('database connected')
    } catch (err) {
      console.log('connecting database failed')
      return process.exit(1)
    }
  
    return null
  }

module.exports = {sequelize, connectToDatabase}