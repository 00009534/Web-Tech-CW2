import path from 'path'
import fs from 'fs'
import express from 'express'

const PORT = process.env.PORT ?? 3000
const app = express()

app.get('/', (req, res) => {
  res.send('Home')
})

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port http://localhost:${PORT}...`)
})
