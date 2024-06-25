const techVisitModel = require('../models/techVisit.model');

/**
 * creates the techVisit document
 * @param {object | required} data
 * @returns created techVisit document
 */
async function create(data) {
  console.log('create in techVisitController.js - data received: ', data);
  return await techVisitModel.create(data);
}

async function readOne(id, refPaths = []) {
  console.log(
    'readOne in techVisitController.js - id: ',
    id,
    ' refPaths: ',
    refPaths
  );
  let result = techVisitModel.findOne({ _id: id });
  // const paths = pathsToPopulate.map((p) => ({ path: p })); // creates an array of objects {path: path-reference}
  if (refPaths.length > 0) result = result.populate(refPaths);
  result = await result.exec();
  return result?.toObject();
}

// TODO
// - 1 get data with pagination
// - 2 get data by filter
async function read(filter) {}

module.exports = { create, readOne };
