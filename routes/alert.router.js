const express = require('express')
const router = express.Router()

const alertService = require('../BL/services/alert.service');

router.get('/', async (req, res) => {
  try {
    const alerts = await alertService.getAllAlerts();
    res.send(alerts);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;