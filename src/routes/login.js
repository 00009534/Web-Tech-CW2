import express from 'express';
const router = express.Router();
import {logStatus} from '../utils/logStatus.js';

router.route('/')
    .get((req, res) => {
      res.render('login', {logged: logStatus.status})
    })

export default router
