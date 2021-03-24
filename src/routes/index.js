import express from 'express';
import {setUser, isAdmin} from '../utils/auth.js';
import {logStatus} from '../utils/logStatus.js';
const router = express.Router();

router.route('/')
    .get((req, res) => {
      res.render('home', {logged: logStatus.status})
    })
    .post(setUser, isAdmin, (req, res) => {
      res.render('home', {logged: logStatus.status})
    })

export default router
