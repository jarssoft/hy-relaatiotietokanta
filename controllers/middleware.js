const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config.js')
const {Blog} = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
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

module.exports = { tokenExtractor, noteFinder }