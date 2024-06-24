const techVisitModel = require('../models/techVisit.model');

/**
 * creates the techVisit document
 * @param {object | required} data
 * @returns created techVisit document
 */
async function create(data) {
  return await techVisitModel.create(data);
}

// TODO
// - 1 get data with pagination
// - 2 get data by filter
async function read(filter) {}

async function readOne(filter, populate = undefined) {
  let data = await techVisitModel.findOne(filter);
  if (populate) data = await data.populate({ path: populate });
  return data.toObject();
}

module.exports = { create, readOne };
