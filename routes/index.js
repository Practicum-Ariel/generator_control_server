const express = require('express')
const router = express.Router()


router.use('/test', require('./test.router'))
router.use('/generator', require('./generatorChart.router'))

const testGenRouter = require('./test.gen.router')
router.use('/test-gen', testGenRouter)

module.exports = router