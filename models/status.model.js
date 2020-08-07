module.exports = (sequelize,Sequelize) => {
    const status = sequelize.define('status',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        status: {
            type: Sequelize.STRING
        }
    })
    return status
}