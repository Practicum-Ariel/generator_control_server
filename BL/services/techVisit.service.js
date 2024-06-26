const techVisitController = require('../../DL/controllers/techVisitController');
const technicianController = require('../../DL/controllers/technician.controller');
const techVisitModel = require('../../DL/models/techVisit.model');


/**
 * this function receives the data and check if the required fields exists in  the body,
 *  if true the body is passed to the controller
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
  let treatment = await techVisitController.create(body);
  await technicianController.update(
    { _id: '667af35368cc9a905e960336' },
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
async function getVisitById(id, query) {
  const validPaths = ['genId', 'techId', 'insightId']; // all the reference paths that are in the model
  const { populate } = query;
  console.log(populate);
  
  /**
   * spliting the query, filtering based on valid paths maping
   * and creating an object for the populate in the controller file.
   */
  const pathsToPopulate = populate
    ? populate
        .split(',')
        .filter((path) => validPaths.includes(path))
        .map((p) => ({ path: p }))
    : null;
  console.log('techVisit service - read a single visit ', pathsToPopulate, id);
  if (!id) {
    // checks if id is received
    throw { code: 400, msg: 'ERROR IN *getVisitById* - id is required ' };
  }
  /**
   * if pathsToPopulate is !null it passes the id and the pathsToPopulate
   * else passes only id
   */
  let res = pathsToPopulate
    ? await techVisitController.readOne(id, pathsToPopulate)
    : await techVisitController.readOne(id);

  if (!res) {
    // if the document doesnot exist error is thrown
    throw {
      code: 404,
      msg: `ERROR IN *getVisitById* - document with id ${id} does not exist`,
    };
  }
  return res;
}

async function getVisitsAll(query) {
  console.log(query);
  const {filter, limit, page } = query;
  if (!techVisitModel.exists(filter))
    throw {
      code: 404,
      msg: `ERROR IN *getVisitsAll* - document with filter ${filter} does not exist`,
    };

  return await techVisitController.read(filter, Number(limit), Number(page));
}
// getVisitsAll({ type: 'day', limit: '2', page: '2' });

module.exports = { createNewVisit, getVisitById, getVisitsAll };
