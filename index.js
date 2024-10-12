const { connectToDatabase } = require('./util/db')
const { Sequelize, Model, DataTypes } = require('sequelize')
const { PORT } = require('./util/config')

const express = require('express')
const app = express()
const blogrouter = require('./controllers/blogs')
const userrouter = require('./controllers/users')
const loginrouter = require('./controllers/login')
const logoutrouter = require('./controllers/logout')
const authorrouter = require('./controllers/authors')
const readingrouter = require('./controllers/readinglists')
const blockuser = require('./controllers/blockuser')

app.use(express.json())
app.use('/api/blogs', blogrouter)
app.use('/api/users', userrouter)
app.use('/api/login', loginrouter)
app.use('/api/logout', logoutrouter)
app.use('/api/authors', authorrouter)
app.use('/api/readinglists', readingrouter)
app.use('/api/blockuser', blockuser)

const unknownEndpoint = (request, response, next) => {
  next({name:"UnknownEndpointError"})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error);
  
  const errors = error.errors.map((error)=>error.message)
  console.error(`v:"${JSON.stringify(errors)}"`)

  return response.status(400).send(`${ error.name} v:${JSON.stringify(errors)}`)

  /*
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'SequelizeValidationError' })
  }
  if (error.name === 'MalformatRequestError') {
    return response.status(400).send({ error: 'MalformatRequestError' })
  }
  if (error.name === 'UnknownEndpointError') {
    return response.status(404).send({ error: 'Tuntematon pyyntö.' })
  }
  if (error.name === 'UserNotFoundError') {
    return response.status(404).send({ error: 'Virheellienn käyttäjä.' })
  } */ 

  //return response.status(404).send({ errors: errors})
  

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