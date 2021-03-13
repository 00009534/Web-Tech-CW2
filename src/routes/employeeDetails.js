import express from 'express';
const router = express.Router()

router.get('/', (req, res) => {
  res.render('employee-details')
})

export default router
