const genModel = require('../models/generator.model')

async function addGenerator(generator){
    console.log("generator controller - create generator", generator);

    return await genModel.create(generator)
}

async function getGenerator(name){
    console.log("generator controller - get generator", name);
    
    //return await genModel.findOne({name});
    const result = await genModel.findOne({name, isActive: true});
    console.log("controller result:", result);
    return result
}

async function getGenerators(limit){
    console.log("generator controller - get generators, limit: ", limit);

    //return genModel.find({}).limit(limit)
    const result = await genModel.find({isActive: true}).limit(limit)
    console.log("get generators: ", result);
    return result
}

async function delGenerator(name){
    console.log("generator controller - delete generator", name);

    //return await genModel.findOneAndDelete({ name });
    return await genModel.findOneAndUpdate({name}, {isActive: false})
}

async function updateGenerator(name, generator){
    console.log("generator controller - update generator", generator);

    return await genModel.findOneAndUpdate({name}, generator)
}

module.exports = { getGenerator, getGenerators, addGenerator, delGenerator, updateGenerator }













// const basePath = "../models/generators/"

// async function createGenerator(data){
//     const model = require(`${basePath}${data.name}`)
//     return await model.create(data)
// }

// async function getGenerator(name){
//     const model = require(`${basePath}${name}`)
//     return await model.findOne({name})
// }

// module.exports = (gen_id) => {return {}}