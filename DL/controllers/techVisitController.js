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

async function readOne(filter, populate) {
  let result = techVisitModel.findOne(filter);
  if (populate) result = result.populate(populate);
  result = await result.exec();
  return result?.toObject();
}

// TODO
// - 1 get data with pagination
// - 2 get data by filter
async function read(filter = {}, populate, limit, page = 1) {
  // populate = 'genId techId';

  let trData = techVisitModel.find(filter);

  if (populate) trData = trData.populate(populate);

  if (limit) trData = trData.skip((page - 1) * limit).limit(limit);

  trData = await trData.exec();
  console.log(trData);
  return trData;
}
// genId=667a8c00e30b38c5dad90562&populate=techId,insightId&page=1&limit=5
// read({ genId: '667a8c00e30b38c5dad90562' }, 'techId,genId', 5, 1);

module.exports = { create, readOne, read };
