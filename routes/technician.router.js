const express = require('express');
const router = express.Router();
const technicianService = require('../BL/services/technician.service');
const { TechnicianAuth } = require('../BL/helpers/authToken')


router.post('/', async (req, res) => {
  try {
    const technician = await technicianService.addNewTechnician(req.body);
    console.log(technician);
    res.send(technician);
  } catch (err) {
    console.log(err);
    res.status(err.code < 900 ? err.code || 400 : 500).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const technicians = await technicianService.getAllTechnicians();
    res.send(technicians);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:idNum', async (req, res) => {
  try {
    if (!technician) {
      return res.status(404).send('Technician not found');
    }
    res.send(technician)
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('/:idNum', async (req, res) => {
  try {
    const technician = await technicianService.updateTechnician(req.params.idNum, req.body);
    if (!technician) {
      return res.status(404).send('Technician not found');
    }
    res.send(technician)
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:idNum', async (req, res) => {
  try {
    const technician = await technicianService.deleteTechnician(req.params.idNum);
    if (!technician) {
      return res.status(404).send('Technician not found');
    }
    res.status(200).send('Technician deleted');
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;