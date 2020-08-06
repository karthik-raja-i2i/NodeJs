// categories table definition
// sequelize is the db connection instance
module.exports = (sequelize,Sequelize) => {
    const Category = sequelize.define('categories',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: Sequelize.STRING
        },
        status : {
            type: Sequelize.STRING
        }
    })
    return Category
}