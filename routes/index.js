const express = require('express')
const router = express.Router()


router.use('/test', require('./test.router'))
router.use('/generator', require('./generatorChart.router'))

module.exports = router