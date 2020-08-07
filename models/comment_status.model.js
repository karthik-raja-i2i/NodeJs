module.exports = (sequelize,Sequelize) => {
    const CommentStatus = sequelize.define('comment_status',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        status: {
            type: Sequelize.STRING
        }
    })
    return CommentStatus
}