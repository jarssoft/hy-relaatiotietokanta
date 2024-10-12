const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const router = require('express').Router()
const  {Token, User} = require('../models')
const {userFinder} = require('./middleware')

router.post('/:id', userFinder, async (request, response, next) => {

  /* Käyttäjä blockatan tai unblockataan
     HTTP POST /api/blockuser/[username]
     {
          "blocked": [true/false]
     }
  */
  const blocked = request.body.blocked

  if (request.user) {
    request.user.disabled = blocked
    await request.user.save()

    console.log(request.user);
    
      if(blocked){
        await Token.destroy({
          where: {userUsername: request.user.username}
          })
      }

      response
          .status(200)
          .send(`user ${(blocked?"blocked":"unblocked")}`)

  }else{
    next({ name: 'UserNotFoundError' })
  }
})

module.exports = router