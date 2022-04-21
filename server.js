const express = require('express')
const route = require('./src/routes')
const PORT = 3000
const app = express()

route(app)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))