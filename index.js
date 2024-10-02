require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})


app.get('/api/blogs', async (req, res) => {
  //const notes = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  const notes = await Blog.findAll()
  res.json(notes)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})