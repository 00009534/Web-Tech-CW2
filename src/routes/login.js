import express from 'express';
const router = express.Router();

router.route('/')
    .get((req, res) => {
      res.render('login')
    })

export default router
