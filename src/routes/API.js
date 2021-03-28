import express from 'express';
import fs from 'fs';
import path from 'path';
import {isAdmin} from '../utils/auth.js';
import {logStatus} from '../utils/logStatus.js';

const __dirname = path.resolve()
const router = express.Router();

const dbEmployeePath = path.resolve(__dirname, './src/databases/employees.json')

router.get('/get-employees', (req, res) => {
  // Get all employees from database
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).send({success: false, error: true})
    const employeeList = JSON.parse(data)
    res.json(employeeList)
  })
})

router.get('/get-employee/:employeeID', isAdmin, (req, res) => {
  // Get the employee with specific id
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).render('error', {error: err.message})
    const employeeList = JSON.parse(data)
    const employee =
        employeeList.find(employee => employee.id === req.params.employeeID)
    res.json(employee)
  })
})

router.get('/logout', (req, res) => {
  logStatus.status = false
  res.redirect('/')
})

export default router
