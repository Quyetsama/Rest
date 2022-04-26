require('dotenv').config()
const express = require('express')
const route = require('./src/routes')
const PORT = process.env.PORT || 3000
const db = require('./src/db')

const app = express()

app.use(express.json())
app.use(express.static('./src/publics'))
app.set('views', './src/views')
app.set('view engine', 'ejs')

db.connect()

// app.get('/home', (req, res, next) => {
//     return res.render('./src/views/home')
// })

route(app)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))