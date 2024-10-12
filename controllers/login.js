const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const router = require('express').Router()
const  {User, Token} = require('../models')

router.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findByPk(body.username)  
  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {

      next({ errors:[{message: 'invalid username or password' }]})
      return
  }

  if (user.disabled) {
    //return response.status(403).json({
    //  error: 'forbidden for illegal activity of user'
    //})
    next({ errors:[{message: 'forbidden for illegal activity of user' }]})
    return
  }

  const userForToken = {
    username: user.username,
    name: user.name,
  }

  console.log(`SECRET=${SECRET}`);
  
  const token = jwt.sign(userForToken, SECRET)

  await Token.create({
    token: token, //.substring(0, 64), 
    userUsername: user.username
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router