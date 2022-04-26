require('dotenv').config()
const express = require('express')
const route = require('./src/routes')
const PORT = process.env.PORT || 3000
const db = require('./src/db')

const app = express()

app.use(express.json())
app.use(express.static('./src/publics'))

db.connect()

route(app)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))