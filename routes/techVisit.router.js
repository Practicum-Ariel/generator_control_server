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
      .send(error.msg || 'ERROR geting multyple techVisit ');
  }
});


module.exports = router;