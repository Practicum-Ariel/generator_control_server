const express = require('express')
const router = express.Router()


router.use('/test', require('./test.router'))
router.use('/gen',require('./gen.router') )
//router.use('/test-gen2', require('./test.gen.router') )
//router.use('/chart', require('./chartData.router'))

module.exports = router