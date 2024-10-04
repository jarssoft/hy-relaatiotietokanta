const express = require('express')
const router = express.Router()
const {User} = require('../models')

const noteFinder = async (req, res, next) => {
    req.user = await User.findByPk(req.params.id)  
    next()
  }

router.get('/', async (req, res, next) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res, next) => {
  console.log(req.body)  
  try {
    const user = await User.create(req.body) 
    res.json(user)
  } catch(exception) { 
    console.log("post virhe");
    
    next(exception)
  }  
})

router.put('/:id', noteFinder, async (req, res, next) => {
  if (req.user) {    
    if(!req.body.name){
      next({ name: 'MalformatRequestError' })
    }else{
      req.user.name = req.body.name
      await req.user.save()
      res.json(req.user)
    }
  }else{
    next({ name: 'UserNotFoundError' })
  }

})


module.exports = router