const generatorDataController = require('../../DL/controllers/generatorData.controller')
const generatorController = require('../../DL/controllers/generator.controller')
const { IoReturnDownBack } = require('react-icons/io5')

// only example for tavor
async function getGeneratorData(genId) {
    console.log("service - get generator data, gen_id: ", genId)
    let genController = await generatorDataController(genId)
    const generatorData = await genController.read()
    return generatorData
}

async function readGenerator(genId, populate) {
    return generatorController.readOne2({ "_id": genId }, populate)
}

async function _getFullGenerators(genId) {
    let genController = await generatorDataController(genId)
    const generatorLastData = await genController.readLast()
    return Boolean(generatorLastData.length)
}

async function getGenerators(query) {
    const generators = await generatorController.read(query, 'name location status') // the string is for select fields from the object

    // return only generators with data + deals with async function within Array.map
    const generatorsWithDataPromises = generators.map(async (gen) => {
        const hasData = await _getFullGenerators(gen._id)
        return hasData ? gen : null
    })

    const generatorsWithData = await Promise.all(generatorsWithDataPromises)

    // Filter out null values
    return generatorsWithData.filter(gen => gen !== null)
    // return await Promise.all(generators.filter(gen => _getFullGenerators(gen._id)))
}

async function doPagination(rows, pageNum, ref) {
    let startIndex = (pageNum - 1) * rows
    let genController = await generatorDataController(ref)
    const dataForPage = await genController.readWithSkip({}, { data: 1, scenarioId: 1 }, rows, startIndex)
    // let dataForPage = await generatorDataController.readWithSkip()
    return dataForPage
}

module.exports = { getGeneratorData, getGenerators, readGenerator, doPagination }

