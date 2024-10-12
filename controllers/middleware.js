const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config.js')
const {Blog, User} = require('../models')
const  {Token} = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {

    const token = authorization.substring(7)
    const session = await Token.findByPk(token)
    if(!session){
      return res.status(401).json({ error: 'token invalid (not found in server)' })
    }

    try {
      req.decodedToken = jwt.verify(token, SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const noteFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)  
  next()
}

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)  
  next()
}

module.exports = { tokenExtractor, noteFinder, userFinder }