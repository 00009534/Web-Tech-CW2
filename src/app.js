// Built-in modules
import path from 'path'

// Third-party modules
import express from 'express'

// Local modules
import ApiRouter from './routes/API.js'
import homeRouter from './routes/index.js'
import aboutRouter from './routes/about.js'
import employeesRouter from './routes/employeeList.js'
import employeeRouter from './routes/employeeDetails.js'
import managerRouter from './routes/employeeManager.js'
import loginRouter from './routes/login.js'


// Configs
const PORT = process.env.PORT ?? 3000
const app = express()
const __dirname = path.resolve()


// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/public'))

// Setting template/view engine.
app.set('view engine', 'pug')
app.set('views', './src/views')

// Routes Handling
app.use('/api/v1', ApiRouter)
app.use('/', homeRouter)
app.use('/login', loginRouter)
app.use('/about', aboutRouter)
app.use('/employees', employeesRouter)
app.use('/employee-details', employeeRouter)
app.use('/manage-employees', managerRouter)

// Server running
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}...`)
})
