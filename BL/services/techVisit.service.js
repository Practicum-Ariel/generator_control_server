const techVisitController = require('../../DL/controllers/techVisitController');
const technicianController = require('../../DL/controllers/technician.controller');
const techVisitModel = require('../../DL/models/techVisit.model');
const Technician = require('../../DL/models/technician.model');

/**
 * this function receives the data and check if the required fields exists in  the body,
 *  if true the body is passed to the controller
 * @param {{} | required} body
 * @returns a new technisian document
 */
async function createNewVisit(body) {
  console.log('techVisit service - create new visit, body: ', body);
  const { genId, techId } = body;
  if (!genId || !techId)
    throw {
      code: 400,
      msg: 'ERROR IN *createNewVisit* - genId, techId query is required',
    };
  s;
  let treatment = await techVisitController.create(body);
  await technicianController.update(
    { _id: techId },
    { $push: { treatmentsId: treatment._id } }
  );
  return treatment;
}

/**
 * this function receives id(required) and populate(req.query), passes the params to the controller for further handeling. returns the data received from the controller
 * @param {string | required} id the id received in the req.params
 * @param {optional | string  } query if received, the query should contain the populate as string - genId,techId,...
 * @returns one document from the DB
 */
async function getVisitById(id) {
  return await techVisitController.readOne(
    { _id: id },
    'genId techId insightId'
  );
}

async function getVisitsAll(query) {
  console.log(query);
  const { populate, limit, page, ...filter } = query;
  console.log(populate, limit, page, filter);
  // if (!techVisitModel.exists(filter))
  //   throw {
  //     code: 404,
  //     msg: `ERROR IN *getVisitsAll* - document with filter ${filter} does not exist`,
  //   };

  // let data = await techVisitController.read(filter, populate, limit, page);
  let data = await techVisitController.read({}, 'techId', 5);
  console.log(data);
  return data;
}
// getVisitsAll({ type: 'day', limit: '2', page: '2' });

module.exports = { createNewVisit, getVisitById, getVisitsAll };
