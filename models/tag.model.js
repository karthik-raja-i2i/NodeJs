// tags table definition
// sequelize is the db connection instance
module.exports = (sequelize,Sequelize) => {
    const Tag = sequelize.define('tags',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
          },
        name: {
            type: Sequelize.STRING
        }
    })
    return Tag
}