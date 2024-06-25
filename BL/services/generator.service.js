const genController = require('../../DL/controllers/generator.controller')

async function getGenerator(genName){
    if(!genName)throw new Error("generator name is required")
    const generator = await genController.getGenerator(genName)
    if(!generator)throw { code: 404, msg: 'not found' }
    return generator
}

async function getGenerators(limit){
    const generators = await genController.getGenerators(parseInt(limit) || 100)
    if(!generators)throw { code: 404, msg: 'not found' }
    return generators
}

async function addGenerator(generator){
    if(!generator)throw { code: 400, msg: 'not a valid generator' }
    const {name, location, sensorsIds} = generator
    const newGenerator = { name, location, sensorsIds };
    const result = await genController.addGenerator(newGenerator)
    if(!result)throw { code: 400, msg: 'something went wrong' }
    return result
}

async function delGenerator(genName){
    if(!genName)throw { code: 400, msg: 'generator name is required' }
    const result = await genController.delGenerator(genName)//name, limit
    if(!result)throw { code: 404, msg: 'not found' }
    return result
}

async function updateGenerator(name, generator){
    if(!name || !generator)throw { code: 400, msg: 'generator and name is required' }
    const upGenerator = {...generator}
    if(upGenerator.dataTableName) delete upGenerator.dataTableName
    const result = await genController.updateGenerator(name, upGenerator)
    if(!result)throw { code: 404, msg: 'not found' }
    return result
}

module.exports = { getGenerator, getGenerators, addGenerator, delGenerator, updateGenerator }