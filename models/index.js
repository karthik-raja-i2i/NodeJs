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

// creating all tables
db.user = require('./user.model')(sequelize,Sequelize)
db.role = require('./role.model')(sequelize,Sequelize)
db.blog = require('./blog.model')(sequelize,Sequelize)
db.comment = require('./comment.model')(sequelize,Sequelize)
db.reply = require('./reply.model')(sequelize,Sequelize)
db.category = require('./category.model')(sequelize,Sequelize)
db.status = require('./status.model')(sequelize,Sequelize)
db.commentStatus = require('./comment_status.model')(sequelize,Sequelize)
db.tag = require('./tag.model')(sequelize,Sequelize)

// one role can be assigned to many users, but a user has only one role
// so one-to-many mapping
db.role.hasMany(db.user);
db.user.belongsTo(db.role)

// one user(author) can write many blogs, but a blog has only one author
// so one-to-many mapping
db.user.hasMany(db.blog)
db.blog.belongsTo(db.user)

// a blog can have one status, while many blogs can share the same status
// so one-to-many
db.status.hasMany(db.blog)
db.blog.belongsTo(db.status)

// one blog can have many comments, but a comment is unique to its blog
// so one-to-many mapping
db.blog.hasMany(db.comment)
db.comment.belongsTo(db.blog)

// a comment can have one status, while many comments can share the same status
// so one-to-many
db.commentStatus.hasMany(db.comment)
db.comment.belongsTo(db.commentStatus)

// one comment can have many replies, but each reply can point to only one comment
// so one-to-many mapping
db.comment.hasMany(db.reply)
db.reply.belongsTo(db.comment)

// a blog can be under many categories and also each category can have many blogs
// so many-to-many mapping
db.category.belongsToMany(db.blog,{through: 'blog_categories'})
db.blog.belongsToMany(db.category,{through: 'blog_categories'})

// a blog can have many tags. Also, a tag can be used with many blogs
// son many-to-many mapping
db.tag.belongsToMany(db.blog,{through: 'blog_tags'})
db.blog.belongsToMany(db.tag,{through: 'blog_tags'})

// roles
db.ROLES = ['Super-admin','Admin','Author','Moderator','Guest','Visitor']

module.exports = db;