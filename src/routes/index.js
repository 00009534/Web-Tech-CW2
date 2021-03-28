import express from 'express';
import {setUser, isAdmin} from '../utils/auth.js';
import {logStatus} from '../utils/logStatus.js';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve()
const router = express.Router();

const dbEmployeePath = path.resolve(__dirname, './src/databases/employees.json')

router.route('/')
    .get(async (req, res) => {
      renderPage(res)
    })
    .post(setUser, isAdmin, (req, res) => {
      renderPage(res)
    })

function renderPage(res) {
  // Get the list of employees and render page
  fs.readFile(dbEmployeePath, (err, data) => {
    if (err) res.status(404).render('error', {error: err.message})
    const employeeList = JSON.parse(data)
    res.render('home', {logged: logStatus.status, employees: employeeList})
  })
}
export default router
