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
    if (err) res.status(404).send({success: false, error: true})
    const employeeList = JSON.parse(data)
    const employee =
        employeeList.find(employee => employee.id === req.params.employeeID)
    res.render('employeeDetails',
        {employee: employee, logged: logStatus.status})
  })
})

export default router
