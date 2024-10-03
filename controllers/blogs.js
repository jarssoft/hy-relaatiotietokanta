const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

const noteFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)  
    next()
  }

router.get('/', async (req, res) => {
  //const notes = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const blog = await Blog.create(req.body) 
  res.json(blog)
})

router.put('/:id', noteFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  }else{
    res.status(404).end()
  }

})

router.delete('/:id', noteFinder, async (req, res) => {
  if (req.blog) {    
    await req.blog.destroy()
    res.json(req.blog)
  }else{
    res.status(404).end()
  }

})


module.exports = router