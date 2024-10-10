const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const express = require('express')
const router = express.Router()
const {Blog, User} = require('../models')
const { Op } = require('sequelize')
const {tokenExtractor, noteFinder} = require('./middleware')

router.get('/', async (req, res, next) => {  
  let where = {}
  let order =  [['likes', 'DESC']]

  if (req.query.search) {
    const pattern = {[Op.like]: `%${req.query.search}%`}
    where =
      {
        [Op.or]: [
          { title: pattern },
          { author: pattern} 
        ]
      }
    
    console.log(`etsitään=${req.query.search}`)
  }

  const blogs = await Blog.findAll({
      attributes: { exclude: ['userUsername'] }, 
      include: { model: User, attributes: ['username', 'name', 'created_at'] } ,
      where, 
      order
    })

  res.json(blogs)
}) 

router.post('/', tokenExtractor, async (req, res, next) => { 
  console.log(req.body)  
  console.log(req.decodedToken);

  if(req.body.year && (req.body.year<1991 || req.body.year>new Date().getFullYear())){
    next({ name: 'Malformat Year Error' })
    return
  }

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
    next({ name: 'blog not found' })
    //res.status(404).end()
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
    next({ name: 'blog not found' })
    //res.status(404).end()
  }
})

module.exports = router