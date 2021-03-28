import express from 'express';
import fs from 'fs';
import path from 'path';
import {isAdmin} from '../utils/auth.js';
import {logStatus} from '../utils/logStatus.js';

const __dirname = path.resolve()
const router = express.Router();

const dbEmployeePath = path.resolve(__dirname, './src/databases/employees.json')

router.get('/', isAdmin, (req, res) => {
  res.render('employeeDetails',
      {error: true, message: 'Please select an employee first!'})
})
router.get('/:employeeID', isAdmin, (req, res) => {
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).render('error', {error: err.message})
    // Get all employees from database
    const employeeList = JSON.parse(data)
    // Get a particular employee
    const employee =
        employeeList.find(employee => employee.id === req.params.employeeID)
    // Render the page and passing the employee as argument
    res.render('employeeDetails',
        {employee: employee, logged: logStatus.status})
  })
})

export default router
