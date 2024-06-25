const express = require('express')
const router = express.Router()


router.use('/test', require('./test.router'))
router.use('/chart', require('./chartData.router'))

module.exports = router