require('dotenv').config()

const PORT = process.env.PORT || 3001
const DATABASE = process.env.DATABASE_URL

module.exports = {PORT, DATABASE}