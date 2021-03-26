import express from 'express';
import fs from 'fs';
import path from 'path';
import {uniqueID} from '../utils/uniqueId.js';
import {isAdmin} from '../utils/auth.js';
import {logStatus} from '../utils/logStatus.js';
import multer from 'multer';

const __dirname = path.resolve()
const router = express.Router();
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: (req, file, cb) =>{
    cb(null, uniqueID() + file.originalname);
  }
});

const upload = multer({storage: storageConfig})
const dbEmployeePath = path.resolve(__dirname, './src/databases/employees.json')

router.route('/')
    .get(isAdmin, (req, res) => {
      res.render('employeeManager', {logged: logStatus.status})
    })

router.get('/:employeeID', isAdmin, (req, res) => {
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).send({success: false, error: true})
    const employeeList = JSON.parse(data)
    const employee =
        employeeList.find(employee => employee.id === req.params.employeeID)
    res.render('employeeManager',
        {logged: logStatus.status, employee: employee})
  })
})

router.post('/create-employee', isAdmin, upload.single('file'), (req, res) => {
  if (req.body) {
    const newEmployee = {
      id: uniqueID(),
      fullName: req.body.fullName,
      age: req.body.age,
      department: req.body.department,
      jobPosition: req.body.position,
      phone: req.body.phone,
      email: req.body.email,
      photo: req.file?.filename ?? 'hr_logo.jpg'
    }
    fs.readFile(dbEmployeePath, (err, data) => {
      if (err) res.status(404).send({success: false, error: true})
      const employeeList = JSON.parse(data)
      employeeList.push(newEmployee)

      fs.writeFile(dbEmployeePath, JSON.stringify(employeeList), (err) => {
        if (err) res.status(400).send({success: false, error: true})
        res.status(201).redirect('/manage-employees?success')
      })
    })
  }
})

router.route('/update-employee/:employeeID')
    .post( isAdmin, upload.single('file'),
        (req, res) => {
          if (req.body) {
            fs.readFile(dbEmployeePath, (err, data) => {
              if (err) res.status(404).send({success: false, error: true})
              const employeeList = JSON.parse(data)
              const index = employeeList
                  .findIndex(employee => employee.id === req.params.employeeID)
              const updatedEmployee = {
                id: req.params.employeeID,
                fullName: req.body.fullName,
                age: req.body.age,
                department: req.body.department,
                jobPosition: req.body.position,
                phone: req.body.phone,
                email: req.body.email,
                photo: req.file?.filename ?? employeeList[index].photo
              }
              employeeList[index] = updatedEmployee;
              fs.writeFile(dbEmployeePath, JSON.stringify(employeeList),
                  (err) => {
                    if (err) res.status(400).send({success: false, error: true})
                    res.status(200).redirect('/manage-employees?success')
                  })
            })
          }
        })

export default router
