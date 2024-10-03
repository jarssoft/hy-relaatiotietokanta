const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

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

router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  //const blog = await Blog.delete(req.params.id) 

  const blog = await Blog.findByPk(req.params.id)
  if (blog) {    
    await blog.destroy()
    res.json(blog)
  }else{
    res.status(404).end()
  }

})

module.exports = router