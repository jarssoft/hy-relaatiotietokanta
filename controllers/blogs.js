const express = require('express')
const router = express.Router()
const {Blog} = require('../models')

const noteFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)  
    next()
  }

router.get('/', async (req, res, next) => {
  //const notes = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  console.log(req.body)  
  try {
    const blog = await Blog.create(req.body) 
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

router.delete('/:id', noteFinder, async (req, res, next) => {
  if (req.blog) {    
    await req.blog.destroy()
    res.json(req.blog)
  }else{
    res.status(404).end()
  }

})


module.exports = router