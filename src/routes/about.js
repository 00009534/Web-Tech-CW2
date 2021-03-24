import express from 'express';
const router = express.Router()
import {logStatus} from '../utils/logStatus.js';

router.get('/', (req, res) => {
  res.render('about', {logged: logStatus.status})
})

export default router
