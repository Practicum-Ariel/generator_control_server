const genController = require('../../DL/controllers/generator.controller')

async function getGenerator(genName){
    console.log("generator service - get generator:", genName);
    if(!genName)throw new Error("generator name is required")
    const generator = await genController.getGenerator(genName)
    //if(!generator)throw new Error("something went wrong")
    if(!generator)throw { code: 404, msg: 'not found' }
    return generator
}

async function getGenerators(limit){
    console.log("generator service - get generators, limit: ", limit);
    const generators = await genController.getGenerators(parseInt(limit) || 100)
    //if(!generators)throw new Error("something went wrong")
    if(!generators)throw { code: 404, msg: 'not found' }
    console.log("service - result", generators);
    return generators
}

async function addGenerator(generator){
    console.log("generator service - add generator");
    //if(!generator)throw new Error("not a valid generator")
    if(!generator)throw { code: 400, msg: 'not a valid generator' }
    const {name, location, sensorsIds} = generator
    const newGenerator = { name, location, sensorsIds };
    const result = await genController.addGenerator(newGenerator)
    //if(!result)throw new Error("something went wrong")
    if(!result)throw { code: 400, msg: 'something went wrong' }
    return result
}

async function delGenerator(genName){
    console.log("generator service - delete generator:", genName);
    //if(!genName)throw new Error("generator name is required")
    if(!genName)throw { code: 400, msg: 'generator name is required' }
    const result = await genController.delGenerator(genName)//name, limit
    //if(!result)throw new Error("something went wrong")
    if(!result)throw { code: 404, msg: 'not found' }
    return result
}

async function updateGenerator(name, generator){
    console.log("generator service - update generator:", name, generator);
    //if(!name || !generator)throw new Error("generator and name is required")
    if(!name || !generator)throw { code: 400, msg: 'generator and name is required' }
    // const upGenerator = {}
    // for(k in generator){
    //     if(k != 'dataTableName')upGenerator[k] = generator[k]
    // }
    

    const upGenerator = {...generator}
    //console.log(upGenerator)
    if(upGenerator.dataTableName) delete upGenerator.dataTableName
    //console.log(upGenerator)

    const result = await genController.updateGenerator(name, upGenerator)
    //if(!result)throw new Error("something went wrong")
    if(!result)throw { code: 404, msg: 'not found' }
    return result
}

module.exports = { getGenerator, getGenerators, addGenerator, delGenerator, updateGenerator }