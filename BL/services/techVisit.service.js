const techVisitController = require('../../DL/controllers/techVisitController');
const technicianController = require('../../DL/controllers/technician.controller');

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
  if (treatment)
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
async function getVisitById(id, query) {
  const validPaths = ['genId', 'techId', 'insightId']; // all the reference paths that are in the model
  const { populate } = query;
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
  const validPaths = ['genId', 'techId', 'insightId'];

  console.log(query);
  const { populate, page, ...filter } = query.hasOwnProperty('populate')
    ? query
    : query.hasOwnProperty('page')
    ? query
    : {};
  console.log(filter, page, populate);
  let tr = await techVisitController.read(filter, Number(page), populate);
  return tr;
}
// getVisitsAll({ type: 'day', limit: '2', page: '2' });

async function updateVisit(body) {
  const { filter, newData } = body;
  if (!filter || !newData)
    throw {
      code: 400,
      msg: `ERROR IN *updateVisit* - to update a 'techVist' filter AND newData`,
    };

  await techVisitController.updateOne(filter, newData);
  let treatment = await techVisitController.readOne(filter);

  console.log(treatment);
}

async function deleteVisit(body) {
  if (!body)
    throw {
      code: 400,
      msg: `ERROR IN *deleteVisit* - to delete a 'techVist' body is required`,
    };
  return await techVisitController.deleteOne(body);
}

module.exports = {
  createNewVisit,
  getVisitById,
  getVisitsAll,
  updateVisit,
  deleteVisit,
};
