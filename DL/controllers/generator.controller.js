const mongoose = require("mongoose")

const exampleGen = "gen700"
// const GenModel = require(`../models/generators/${exampleGen}.js`)

// CRUD
async function create(gen, data) {
    return await mongoose.models[gen].create(data)
    // return await GenModel.create(data)
}
async function read(filter, isPopulate) {
    return await GenModel.find(filter).populate(isPopulate ? 'msg' : '')
}
async function readOne(filter, populate = {}) {
    let data = await GenModel.findOne(filter)

}
async function update(id, data) {
    // return await chatModel.findOneAndUpdate({_id:id}, data,{new : true})
    return await GenModel.findByIdAndUpdate(id, data, { new: true })
}
async function del(id) {
    return await update(id, { isActive: false })
}

// module.exports = { create, read, readOne, update, del }
module.exports = (genId) => { return { create: (data) => create(genId, data), read, readOne, update, del } }