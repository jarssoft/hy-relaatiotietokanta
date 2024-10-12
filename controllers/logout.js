const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const router = require('express').Router()
const  {Token} = require('../models')
const {tokenExtractor} = require('./middleware')

router.post('/', tokenExtractor, async (request, response) => {

  await Token.destroy({
    where: {userUsername: request.decodedToken.username}
    }) //.substring(0, 64)

  response
      .status(200)
      .send("logged out")
})

module.exports = router