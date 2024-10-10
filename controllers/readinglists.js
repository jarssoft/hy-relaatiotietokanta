const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const router = require('express').Router()
const {Readings, Blog} = require('../models/')
const {tokenExtractor, noteFinder} = require('./middleware')

router.post('/', async (req, res, next) => { 
  console.log(req.body)  
  try {
    const reading = await Readings.create({
      blogId: req.body.blog_id, 
      userUsername: req.body.user_username
    })
    res.json(reading)
  
  } catch(exception) { 
    next(exception)
  }  
})

router.put('/:id', tokenExtractor, noteFinder, async (req, res, next) => { 
  
  console.log("PUT /api/readinglist:")
  console.log(req.decodedToken.username)
  console.log(req.blog.id)
  console.log(req.body.read)
  
  const reading = await Readings.findOne({
    where: {
      userUsername: req.decodedToken.username,
      blogId: req.blog.id
    }
  })

  console.log(`reading=${reading}`)

  if (reading) {
    reading.readed = req.body.read
    await reading.save()
    res.json(reading)
  } else {
    res.status(404).end()
  }

})

module.exports = router