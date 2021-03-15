import express from 'express';
import fs from 'fs';
import path from 'path';
import {uniqueID} from '../utils/uniqueId.js';

const __dirname = path.resolve()
const router = express.Router();

const dbEmployeePath = path.resolve(__dirname, './src/databases/employees.json')

router.route('/')
    .get((req, res) => {
      res.render('employeeManager')
    })

router.post('/create-employee', (req, res) => {
  const newEmployee = {
    id: uniqueID(),
    fullName: req.body.fullName,
    age: req.body.age,
    department: req.body.department,
    jobPosition: req.body.position,
    phone: req.body.phone,
    email: req.body.email,
    photo: req.file.filename ?? ''
  }
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).send({success: false, error: true})
    const employeeList = JSON.parse(data)
    employeeList.push(newEmployee)

    fs.writeFile(dbEmployeePath, JSON.stringify(employeeList), (err) => {
      if (err) res.status(400).send({success: false, error: true})
      res.status(201).send({success: true})
    })
  })
})

router.post('/update-employee/:employeeID', (req, res) => {
  const updatedEmployee = {
    id: req.params.employeeID,
    fullName: req.body.fullName,
    age: req.body.age,
    department: req.body.department,
    jobPosition: req.body.position,
    phone: req.body.phone,
    email: req.body.email,
    photo: req.file.filename ?? ''
  }
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).send({success: false, error: true})
    const employeeList = JSON.parse(data)
    const index = employeeList
        .findIndex(employee => employee.id === req.params.employeeID)
    employeeList[index] = updatedEmployee;
    fs.writeFile(dbEmployeePath, JSON.stringify(employeeList), (err) => {
      if (err) res.status(400).send({success: false, error: true})
      res.status(200).send({success: true})
    })
  })
})

export default router
