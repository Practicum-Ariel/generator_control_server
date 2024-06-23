
const GeneratorDataController = require('../../DL/controllers/GeneratorDataController')

async function getGeneratorData(genId) {
    console.log("service - get generator data, gen_id: ", genId);
    const genController = new GeneratorDataController(genId)
    await genController.config(genId)
    const generatorData = await genController.read()
    return generatorData
}

async function addGeneratorData(data) {
    //create table
    console.log("service - add generation data", data);
    const genController = new GeneratorDataController(data.name)
    await genController.config(data.name)
    const result = await genController.create(data)
    return result
}

module.exports = { getGeneratorData, addGeneratorData }