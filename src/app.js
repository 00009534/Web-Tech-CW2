// Built-in modules
import path from 'path'
// import fs from 'fs'

// Third-party modules
import express from 'express'

// Local modules
// import uniqueId from './utils/uniqueId.js'

// Configs
const PORT = process.env.PORT ?? 3000
const app = express()
const __dirname = path.resolve()

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/public'))

// Setting template/view engine.
app.set('view engine', 'pug')


app.get('/', (req, res) => {
  res.send('Home')
})

// Server running
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}...`)
})
