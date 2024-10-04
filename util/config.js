require('dotenv').config()

const PORT = process.env.PORT || 3001
const DATABASE = process.env.DATABASE_URL
const SECRET = "Salasana"

module.exports = {PORT, DATABASE, SECRET}