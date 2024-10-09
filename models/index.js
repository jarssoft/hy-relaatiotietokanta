const Blog = require('./blog')
const User = require('./user')
const Readings = require('./readings')

User.hasMany(Blog)
Blog.belongsTo(User)

//Blog.sync({ alter: true })
//User.sync({ alter: true })

User.belongsToMany(Blog, { through: Readings })
Blog.belongsToMany(User, { through: Readings })

module.exports = {
    Blog, User, Readings
}