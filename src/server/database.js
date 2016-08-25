import sequelize from './sequelize'
import WikiPage from './models/WikiPage'

export {
  sequelize,
  WikiPage
}

export default {
  sequelize,
  WikiPage,
  connect(){
    return sequelize.sync()
  }
}
