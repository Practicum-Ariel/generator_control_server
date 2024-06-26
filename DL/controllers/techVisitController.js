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

async function readOne(filter, refPaths = []) {
  console.log(
    'readOne in techVisitController.js - id: ',
    id,
    ' refPaths: ',
    refPaths
  );
  {
    _id: id;
  }
  let result = techVisitModel.findOne(filter);
  // const paths = pathsToPopulate.map((p) => ({ path: p })); // creates an array of objects {path: path-reference}
  if (refPaths.length > 0) result = result.populate(refPaths);
  result = await result.exec();
  return result?.toObject();
}

// TODO
// - 1 get data with pagination
// - 2 get data by filter
async function read(filter = {}, populate = '', limit, page = 1) {
  const validPaths = ['genId', 'techId', 'insightId']; // all the reference paths that are in the model
  console.log(filter, populate, limit, page);

  let skip;
  if (limit) {
    skip = (+page - 1) * limit;
  }

  let pathsToPopulate = populate.includes(',')
    ? populate.split(',').filter((path) => validPaths.includes(path))
    : populate;

  console.log(pathsToPopulate);

  let trData = techVisitModel.find(filter);
  console.log(!skip);
  console.log(limit);

  trData = !skip
    ? trData.populate(pathsToPopulate)
    : trData
        .populate(pathsToPopulate)
        .skip(skip || 0)
        .limit(limit);

  trData = await trData.exec();
  console.log(trData);
  return trData;
}
// genId=667a8c00e30b38c5dad90562&populate=techId,insightId&page=1&limit=5
// read({ genId: '667a8c00e30b38c5dad90562' }, 'techId,genId', 5, 1);

module.exports = { create, readOne, read };
