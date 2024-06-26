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


async function read(filter = {}, page = 1, populate) {
  let limit = filter == undefined ? 10 : 5;
  const skip = (page - 1) * limit;
  console.log(filter, page, populate);

  let data = techVisitModel.find(filter);
  data = data.populate(populate).skip(skip).limit(limit);
  data = await data.exec();
  return data.toObject();
}
// read({ genId: '667af37245404530355ca226' }, 5, 'techId');

/**
 *
 * @param {data} data the data mongo shoeld update
 */
async function updateOne(filter, newData) {
  console.log(filter, newData);
  let updated = await techVisitModel.updateOne(filter, newData);
  return updated;
}

/**
 *
 */
async function deleteOne(filter) {
  return await techVisitModel.deleteOne(filter);
}

module.exports = { create, readOne, read, updateOne, deleteOne };
