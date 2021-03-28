import express from 'express';
import fs from 'fs';
import path from 'path';
import {logStatus} from '../utils/logStatus.js';
import {isAdmin} from '../utils/auth.js';

const __dirname = path.resolve()
const router = express.Router();

const dbEmployeePath = path.resolve(__dirname, './src/databases/employees.json')

router.route('/')
    .get((req, res) => {
      // Get all employees from database
      fs.readFile(dbEmployeePath, (err, data) => {
        if (err) res.status(404).render('error', {error: err.message})
        const employeeList = JSON.parse(data)
        res.render('employeeList',
            {logged: logStatus.status, employees: employeeList})
      })
    })

router.delete('/:employeeID', isAdmin, (req, res) => {
  if (req.params.employeeID) {
    // Get all employees from database
    fs.readFile(dbEmployeePath, (err, data) => {
      if (err) res.status(404).render('error', {error: err.message})
      const employeeList = JSON.parse(data)
      // Remove employee by its id
      const employees =
          employeeList.filter(employee => employee.id !== req.params.employeeID)
      // Get employee that had to be deleted
      const employee = employeeList
          .find(employee => employee.id === req.params.employeeID)
      // Delete image of employee from public/images
      fs.unlink(path.resolve(__dirname, `./public/images/${employee.photo}`),
          (err) => {
            if (err) res.status(400).render('error', {error: err.message})
          })
      // Update database with new employee list
      fs.writeFile(dbEmployeePath, JSON.stringify(employees), (err) => {
        if (err) res.status(400).render('error', {error: err.message})
        res.status(200).redirect('/employees?success')
      })
    })
  }
})

export default router
