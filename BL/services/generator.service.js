
const generatorDataController = require('../../DL/controllers/generatorData.controller')
const generatorController = require('../../DL/controllers/generator.controller')

// only example for tavor
async function getGeneratorData(genId) {
    console.log("service - get generator data, gen_id: ", genId);
    let genController = await generatorDataController(genId)
    const generatorData = await genController.read()
    return generatorData
}

async function readGenerator(genId, populate) {
    generatorController.readOne2({"_id": genId}, populate)
}

module.exports = { getGeneratorData, readGenerator}