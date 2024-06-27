const express = require('express')
const router = express.Router()
const testGenRouter = require('./test.gen.router')
<<<<<<< HEAD
const { TechnicianAuth } = require('../BL/helpers/authToken')
=======
const aiApiServer = require('./insightsAiServer.router')

>>>>>>> 9f977dc9c4589fb3d60297ea1656130c33d0cdfd

router.use('/auth', require('./auth.router'))
router.use('/test', require('./test.router'))
router.use('/technician', require('./technician.router'))
router.use(TechnicianAuth)
router.use('/generator', require('./generatorChart.router'))
router.use('/test-gen', testGenRouter)
router.use('/visit', require('./techVisit.router'));
<<<<<<< HEAD
=======
router.use('/technician', require('./technician.router'))
router.use('/compare', require('./generatorCompare.router'))
router.use('/aiapiserver', aiApiServer)

>>>>>>> 9f977dc9c4589fb3d60297ea1656130c33d0cdfd

module.exports = router
