const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const router = require('express').Router()
const  {Token} = require('../models')
const {tokenExtractor} = require('./middleware')

router.post('/', tokenExtractor, async (request, response) => {

  const token = request.get('authorization').substring(7);
  
  const session = await Token.findByPk(token.substring(0, 64))
  await session.destroy()

  response
      .status(200)
      .send("logged out")
})

module.exports = router