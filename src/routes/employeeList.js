import express from 'express';
import fs from 'fs';
import path from 'path';
import {logStatus} from '../utils/logStatus.js';

const __dirname = path.resolve()
const router = express.Router();

const dbEmployeePath = path.resolve(__dirname, './src/databases/employees.json')

router.route('/')
    .get((req, res) => {
      res.render('employeeList', {logged: logStatus.status})
    })

router.delete('/:employeeID', (req, res) => {
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).send({success: false, error: true})
    const employeeList = JSON.parse(data)
    const employees =
        employeeList.filter(employee => employee.id !== req.params.employeeID)

    fs.writeFile(dbEmployeePath, JSON.stringify(employees), (err) => {
      if (err) res.status(400).send({success: false, error: true})
      res.status(200).redirect('/employees?success')
    })
  })
})

export default router
