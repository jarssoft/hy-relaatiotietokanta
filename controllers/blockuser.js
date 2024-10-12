const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const router = require('express').Router()
const  {Token, User} = require('../models')
const {userFinder} = require('./middleware')

router.post('/:id', userFinder, async (request, response, next) => {

  //request.blog = await Blog.findByPk(req.params.id) 
  const blocked = request.body.blocked

  if (request.user) {
    request.user.disabled = blocked
    await request.user.save()
  }else{
    next({ name: 'UserNotFoundError' })
  }
 console.log(request.user);
 
  if(blocked){
    await Token.destroy({
      where: {userUsername: request.user.username}
      })
  }

  response
      .status(200)
      .send(`user ${(blocked?"blocked":"unblocked")}`)
})

module.exports = router