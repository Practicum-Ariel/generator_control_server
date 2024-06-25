const express = require('express')
const router = express.Router()
const testGenRouter = require('./test.gen.router')


router.use('/test', require('./test.router'))
router.use('/generator', require('./generatorChart.router'))
router.use('/test-gen', testGenRouter)
router.use('/visit', require('./techVisit.router'));

module.exports = router