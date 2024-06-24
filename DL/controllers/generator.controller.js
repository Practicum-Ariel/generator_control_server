const generatorController = require('../models/generator.model')

// CRUD
async function create(data) {
    return await generatorController.create(data)
}
async function read(filter, Populate) {
    return await generatorController.find(filter)
}
async function readOne(filter, populate) {
    let data = await generatorController.findOne(filter)
    if (populate) data = await data.populate({ path: 'sensorsIds' })
    return data.toObject()
}
async function update(id, data) {
    return await generatorController.findByIdAndUpdate(id, data)
}
async function del(id) {
    return await update(id, { isActive: false })
}

module.exports = { create, read, readOne, update, del }