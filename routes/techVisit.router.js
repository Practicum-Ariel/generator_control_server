const express = require('express');
const router = express.Router();
const techVisitService = require('../BL/services/techVisit.service');

/**
 * a post route, gets the body in the req (req.body)
 */
router.post('/new', async (req, res) => {
  try {
    let result = await techVisitService.createNewVisit(req.body);
    console.log('result in **router.post** - ', result);
    res.send(result);
  } catch (error) {
    res.status(error.code || 500).send(error.msg || 'ERROR SUBMITING FORM');
  }
});

router.get('/:id', async (req, res) => {
  try {
    let result = await techVisitService.getVisitById(req.params.id, req?.query);
    res.send(result);
  } catch (error) {
    res
      .status(error.code || 500)
      .send(error.msg || 'ERROR geting one techVisit');
  }
});


router.get('/', async (req, res) => {
  try {
    let result = await techVisitService.getVisitsAll(req.query);
    res.send(result);
  } catch (error) {
    res
      .status(error.code || 500)
      .send(error.msg || 'ERROR getting multyple techVisit ');
  }
});
router.put('/update', async (req, res) => {
  try {
    let result = await techVisitService.updateVisit(req.body);
    res.send(result);
  } catch (error) {
    res.status(error.code || 500).send(error.msg || 'ERROR updating techVisit');
  }
});

router.delete('/', async (req, res) => {
  try {
    let result = await techVisitService.deleteVisit(req.body);
    res.send(result);
  } catch (error) {
    res.status(error.code || 500).send(error.msg || 'ERROR deleting techVisit');
  }
});


module.exports = router;