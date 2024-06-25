const genModel = require('../models/generator.model')

async function addGenerator(generator){
    return await genModel.create(generator)
}

async function getGenerator(name){
    const result = await genModel.findOne({name, isActive: true});
    return result
}

async function getGenerators(limit){
    const result = await genModel.find({isActive: true}).limit(limit)
    return result
}

async function delGenerator(name){
    return await genModel.findOneAndUpdate({name}, {isActive: false})
}

async function updateGenerator(name, generator){
    return await genModel.findOneAndUpdate({name}, generator)
}

module.exports = { getGenerator, getGenerators, addGenerator, delGenerator, updateGenerator }
