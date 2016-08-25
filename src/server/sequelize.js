import Sequelize from 'sequelize'

const databaseName = process.env.NODE_ENV === 'test' ?
  'jaredatron-test' : 'jaredatron';

const connectionString = process.env.DATABASE_URL ?
    process.env.DATABASE_URL :
    `postgres://${process.env.USER}@localhost:5432/${databaseName}`

const sequelize = new Sequelize(connectionString);

export default sequelize
export { sequelize, Sequelize }
