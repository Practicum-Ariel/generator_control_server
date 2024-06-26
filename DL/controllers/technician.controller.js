const { trusted } = require("mongoose");
const technicianModel = require("../models/technician.model");

async function create(data) {
  return await technicianModel.create(data);
}

async function read(filter) {
  return await technicianModel.find(filter);
}

async function readOne(filter) {
  return await technicianModel.findOne(filter);
}

async function readFilter(filter = {}, sortBy, sortDir = 'asc', searchIn, searchBy) {
  const searchFilter = (searchBy && searchIn) ? { [searchIn]: { $regex: searchBy, $options: 'i' } } : {};
  const sortOptions = sortBy ? { [sortBy]: sortDir === 'desc' ? -1 : 1 } : {};

  return await technicianModel
    .find({
      ...filter,
      ...searchFilter
    })
    .sort(sortOptions)
    .exec();
}


async function update(filter, newUpdateData) {
  return await technicianModel.findOneAndUpdate(filter, newUpdateData, { new: true });
}

async function deleteTechnician(filter) {
  return await technicianModel.findOneAndDelete(filter);
}
module.exports = {
  read, readOne, readFilter, update, deleteTechnician, create
};
