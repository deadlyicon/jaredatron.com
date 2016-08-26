import sequelize from './sequelize'

export default {
  connect(){
    return sequelize.sync()
  }
}
