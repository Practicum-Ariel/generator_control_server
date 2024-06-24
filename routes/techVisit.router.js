const express = require('express');
const router = express.Router();
const techVisitService = require('../BL/services/techVisit.service');

/**
 * a post route, gets the body in the req (req.body)
 */
router.post('/new', async (req, res) => {
  try {
    let result = techVisitService.createNewVisit(req.body);
    res.send(result);
  } catch (error) {
    res.status(error.code || 500).send(error.msg || 'ERROR SUBMITING FORM');
  }
});

/**
 * GET REQUEST EXAMPLE -
 * id = req.params.id (required)
 * {populate: genId || techId || insightId} = req.query
 *  */
router.get('/:id', async (req, res) => {
  try {
    let result = !req.query
      ? techVisitService.getSingleVisit(req.params.id)
      : techVisitService.getSingleVisit(req.params.id, req.query);
    res.send(result);
  } catch (error) {
    res
      .status(error.code || 500)
      .send(error.msg || 'ERROR geting one techVisit');
  }
});

// /all?type=day
router.get('/all', async (req, res) => {
  try {
    let result = techVisitService.getVisitsByFilter(req.query);
    res.send(result);
  } catch (error) {
    res
      .status(error.code || 500)
      .send(error.msg || 'ERROR geting multyple techVisit ');
  }
});
