// import _pgp = from 'pg-promise'
// const pgp = _pgp()
import Sequelize from 'sequelize'

const databaseName = process.env.NODE_ENV === 'test' ?
  'jaredatron-test' : 'jaredatron';

const connectionString = process.env.DATABASE_URL ?
    process.env.DATABASE_URL :
    `postgres://${process.env.USER}@localhost:5432/${databaseName}`

const sequelize = new Sequelize(connectionString);

export { sequelize }

// const db = pgp(connectionString);


// export default {
//   getWikiPage: function(path){
//     const sql = `
//       SELECT
//         *
//       FROM
//         wiki_pages
//       WHERE
//         path=$1
//     `
//     return db.oneOrNone(sql, [path])
//   }

// }
