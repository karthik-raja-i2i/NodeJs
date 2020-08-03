const config = require('../db.config');
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.DIALECT,
    }
)

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user.model')(sequelize,Sequelize)
db.role = require('./role.model')(sequelize,Sequelize)

db.role.hasMany(db.user);
db.user.belongsTo(db.role)

db.ROLES = ['Super-admin','Admin','Author','Moderator']

module.exports = db;