const express = require('express')
const router = express.Router()


router.use('/test', require('./test.router'))
router.use('/technician', require('./technician.router'))
module.exports = router