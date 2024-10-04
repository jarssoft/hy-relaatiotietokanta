const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const express = require('express')
const router = express.Router()
const {Blog, User} = require('../models')

const noteFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)  
    next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', async (req, res, next) => {  
  const blogs = await Blog.findAll()
  res.json(blogs)
}) 

router.post('/', tokenExtractor, async (req, res, next) => {
  console.log(req.body)  
  console.log(req.decodedToken);
  try {
    const user = await User.findByPk(req.decodedToken.username)
    console.log({...req.body, userUsername: user.username});
    const blog = await Blog.create({...req.body, userUsername: user.username})
    res.json(blog)
  } catch(exception) { 
    next(exception)
  }  
})

router.put('/:id', noteFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    if(!req.body.likes){
      next({ name: 'MalformatRequestError' })
    }else{
      await req.blog.save()
      res.json(req.blog)
    }
  }else{
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, noteFinder, async (req, res, next) => {
  if (req.blog) {
    if(req.blog.userUsername===req.decodedToken.username){
      await req.blog.destroy()
      res.json(req.blog)
    }else{
      res.status(401).end()
    }
  }else{
    res.status(404).end()
  }
})

module.exports = router