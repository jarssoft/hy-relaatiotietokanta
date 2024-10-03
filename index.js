const { connectToDatabase } = require('./util/db')
const { Sequelize, Model, DataTypes } = require('sequelize')
const { PORT } = require('./util/config')

const express = require('express')
const app = express()
const router = require('./controllers/blogs')

app.use(express.json())
app.use('/api/blogs', router)

const unknownEndpoint = (request, response, next) => {
  next({name:"UnknownEndpointError"})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'Syötettiin virheellinen blogi.' })
  }
  if (error.name === 'MalformatRequestError') {
    return response.status(400).send({ error: 'Syötettiin virheellinen likes-arvo.' })
  }
  if (error.name === 'UnknownEndpointError') {
    return response.status(404).send({ error: 'Tuntematon pyyntö.' })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()