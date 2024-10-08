const express = require('express')
const router = express.Router()
const {User, Blog} = require('../models')
const sequelize = require("sequelize");

router.get('/', async (req, res, next) => {  
  const users = await Blog.findAll({attributes: ['author', [sequelize.fn('COUNT', sequelize.col('title')), 'n_title'], [sequelize.fn('SUM', sequelize.col('likes')), 'sum_likes']], group:'author'})
  res.json(users)
})

module.exports = router 