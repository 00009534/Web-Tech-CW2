// Built-in modules
import path from 'path'

// Third-party modules
import express from 'express'
import multer from 'multer';

// Local modules
import {uniqueID} from './utils/uniqueId.js'
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
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: (req, file, cb) =>{
    cb(null, uniqueID() + '.jpg');
  }
});

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/public'))
app.use(multer({storage: storageConfig}).single('photo'))

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
