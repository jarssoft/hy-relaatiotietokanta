const Blog = require('./blog')
const User = require('./user')
const Token = require('./token')
const Readings = require('./readings')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Token)
Token.belongsTo(User)

//Blog.sync({ alter: true })
//User.sync({ alter: true })

User.belongsToMany(Blog, { through: Readings, as: 'readlist'})
Blog.belongsToMany(User, { through: Readings, as: 'readers'})

module.exports = {
    Blog, User, Readings, Token
}