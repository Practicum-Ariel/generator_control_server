const techVisitController = require('../../DL/controllers/techVisitController');

/**
 * this function receives the data and check if the required fields exists in  the body, if true the body is passed to the controller
 * @param {{} | required} body
 * @returns a new technisian document
 */
async function createNewVisit(body) {
  console.log('techVisit service - create new visit, body: ', body);
  const { genId, techId, insightId } = body;
  if (!genId || !techId || !insightId)
    throw {
      code: 400,
      msg: 'ERROR IN *createNewVisit* - genId, techId, insightId query is erquired',
    };
  return await techVisitController.create(body);
}

/**
 * this function receives id(required) and populate(req.query), passes the params to the controller for further handeling. returns the data received from the controller
 * @param {string | required} id the id received in the req.params
 * @param {object | optional } query if received, the query should contain the populate as { populate : 'ref path' }
 * @returns one document from the DB
 */
async function getSingleVisit(id, query) {
  console.log('techVisit service - read a single visit, id, query: ', query);
  const { populate } = query;
  if (!id)
    throw { code: 400, msg: 'ERROR IN *getSingleVisit* - id is required' };
  let res = !populate
    ? await techVisitController.readOne(id)
    : await techVisitController.readOne(id, populate);
  return res;
}

async function getVisitsByFilter(query) {
  const { type, genId, techId } = query;
}

module.exports = { createNewVisit, getSingleVisit, getVisitsByFilter };
