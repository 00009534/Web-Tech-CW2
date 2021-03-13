import express from 'express';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve()
const router = express.Router();

const dbEmployeePath = path.resolve(__dirname, './src/databases/employees.json')

router.route('/')
    .get((req, res) => {
      res.render('employeeList')
    })

router.delete('/:employeeID', (req, res) => {
  const employeeID = req.params.employeeID
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).send({success: false, error: true})
    const employeeList = JSON.parse(data)
    const employees =
        employeeList.filter(employee => employee.id !== employeeID)

    fs.writeFile(dbEmployeePath, JSON.stringify(employees), (err) => {
      if (err) res.status(400).send({success: false, error: true})
      res.status(200).send({success: true})
    })
  })
})

export default router
