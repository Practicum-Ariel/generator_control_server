const technicianModel = require("../models/technician.model");
async function readOne(filter) {
    return await technicianModel.findOne(filter).select('+password');;
  }


module.exports = { readOne }