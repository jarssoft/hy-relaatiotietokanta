const sequelize = require('./util/db')
const { Sequelize, Model, DataTypes } = require('sequelize')
const { PORT } = require('./util/config')

const express = require('express')
const app = express()
const router = require('./controllers/blogs')

app.use(express.json())
app.use('/api/blogs', router) 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})