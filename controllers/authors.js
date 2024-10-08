const express = require('express')
const router = express.Router()
const {User, Blog} = require('../models')
const sequelize = require("sequelize");

router.get('/', async (req, res, next) => {
  let order =  [['sum_likes', 'DESC']]
  const users = await Blog.findAll(
      {attributes: ['author', [sequelize.fn('COUNT', sequelize.col('title')), 'n_title'], [sequelize.fn('SUM', sequelize.col('likes')), 'sum_likes']], 
        group:'author',
        order})
  res.json(users)
})

module.exports = router 