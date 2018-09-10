import sequelize from 'sequelize'
import User from './models_users'

export default function(config) {

  const Sequelize = new sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
  })

  const res = User(Sequelize, sequelize)

  Sequelize.sync({logging: console.log})

  return {res}

}
