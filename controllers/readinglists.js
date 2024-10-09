const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const router = require('express').Router()
const {Readings} = require('../models/')

router.post('/', async (req, res, next) => { 
  console.log(req.body)  
  //try {
    const reading = await Readings.create({
      blogId:req.body.blog_id, 
      userUsername:req.body.user_username
    })
    res.json(reading)
  //  res.json(reading)
  //} catch(exception) { 
  //  next(exception)
  //}  
})

module.exports = router