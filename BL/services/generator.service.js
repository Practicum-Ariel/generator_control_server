
const generatorDataController = require('../../DL/controllers/generatorData.controller')

async function getGeneratorData(genId) {
    console.log("service - get generator data, gen_id: ", genId);
    let genController = await generatorDataController(genId)
    const generatorData = await genController.read()
    return generatorData
}

module.exports = { getGeneratorData}