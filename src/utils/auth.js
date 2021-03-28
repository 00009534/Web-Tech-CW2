import fs from 'fs'
import path from 'path';
import {logStatus} from './logStatus.js';

const __dirname = path.resolve()
const dbAdminPath = path.resolve(__dirname, './src/databases/admins.json')

// Set user as admin. Imitation of cookies
export function setUser(req, res, next) {
  if (req.body.email || req.body.password) {
    const reqUser = {
      email: req.body.email,
      password: req.body.password
    }
    req.user = JSON.stringify(reqUser)
  } else {
    return res.redirect('/login?login-error')
  }
  next()
}

export async function isAdmin(req, res, next) {
  try {
    if (req.user) {
      await checkIfAdmin(req, res)
    }
    checkIfLogged(req, res)
    next()
  } catch (err) {
    return res.status(400).redirect('/login?login-error')
  }
}

// Check if admin by comparing to the database of admin users
function checkIfAdmin(req, res) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(req.user)
    fs.readFile(dbAdminPath, (err, data) => {
      if (err) res.status(404).send({success: false, error: true})
      const admins = JSON.parse(data)
      admins.forEach(admin => {
        if (admin.email === user.email
            && admin.password === user.password) {
          // If user is admin, change the status of log
          logStatus.status = true
          return resolve()
        }
      })
      reject(new Error('User Error'))
    })
  })
}

function checkIfLogged(req, res) {
  if (!logStatus.status) {
    return res.status(403).redirect('/login?login-required')
  }
}
