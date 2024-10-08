const Sequelize = require('sequelize')
const { DATABASE } = require('../util/config')
const sequelize = new Sequelize(DATABASE)
const { Umzug, SequelizeStorage } = require('umzug')

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

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}
const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}


module.exports = { connectToDatabase, sequelize, runMigrations, rollbackMigration }