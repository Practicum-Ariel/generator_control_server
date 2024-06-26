const express = require('express')
const router = express.Router()
const testGenRouter = require('./test.gen.router')
const { TechnicianAuth } = require('../BL/helpers/authToken')

router.use('/auth', require('./auth.router'))
router.use('/test', require('./test.router'))
router.use('/technician', require('./technician.router'))
router.use(TechnicianAuth)
router.use('/generator', require('./generatorChart.router'))
router.use('/test-gen', testGenRouter)
router.use('/visit', require('./techVisit.router'));

module.exports = router
