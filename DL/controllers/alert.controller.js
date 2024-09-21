const { trusted } = require("mongoose");
const alertModel = require("../models/alert.model");

async function create(data) {
  return await alertModel.create(data);
}

async function read(filter) {
  return await alertModel.find(filter);
}

async function readOne(filter) {
  return await alertModel.findOne(filter);
}


async function update(filter, newUpdateData) {
  return await alertModel.findOneAndUpdate(filter, newUpdateData, { new: true });
}

async function deleteTechnician(filter) {
  return await alertModel.findOneAndDelete(filter);
}
module.exports = {
  read,
  readOne,
  update,
  deleteTechnician,
  create
};
