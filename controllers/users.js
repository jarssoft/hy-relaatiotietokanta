const express = require('express')
const router = express.Router()
const {User, Blog} = require('../models')

const userFinder = async (req, res, next) => {
    req.user = await User.findByPk(req.params.id)  
    next()
  }

router.get('/', async (req, res, next) => {
  const users = await User.findAll({
      include: { model: Blog, attributes: ['id', 'title','likes'] } 
    })
  res.json(users)
})

router.get('/:id', userFinder, async (req, res, next) => {

  const where = (req.query.read
      ? {readed: req.query.read}
      : {})

  console.log(where);
  

  const user = await User.findByPk(req.params.id, { 
    attributes: { exclude: [''] } ,
    include:[
      {
        model: Blog,
        
        as: 'readlist',
        attributes: { exclude: ['userId']},
        through: {
          where,
          attributes: ["id", "readed"]
        },
      }
    ]
  }) 

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
  
})

router.post('/', async (req, res, next) => {
  console.log(req.body)  
  try {
    const user = await User.create({...req.body, disabled:false}) 
    res.json(user)
  } catch(exception) { 
    //console.log("post virhe");
    
    next(exception)
  }  
})

router.put('/:id', userFinder, async (req, res, next) => {
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