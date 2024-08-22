const generatorDataController = require('../../DL/controllers/generatorData.controller')
const generatorController = require('../../DL/controllers/generator.controller')

// only example for tavor
async function getGeneratorData(genId) {
    console.log("service - get generator data, gen_id: ", genId)
    let genController = await generatorDataController(genId)
    const generatorData = await genController.read()
    return generatorData
}

async function getOneGenerator(genId, populate) {
    return await generatorController.readOne({name : genId}, populate)
}

async function readGenerator(genId, populate) {
    return generatorController.readOne2({ "_id": genId }, populate)
}

async function _getFullGenerators(genId) {
    let genController = await generatorDataController(genId)
    const generatorLastData = await genController.readLastOne()
    return Boolean(generatorLastData.length)
}

async function getAllGenerators(filter = {}) {
    let generators = await generatorController.read({ ...filter }, 'name location status lastUpdate insights') // the string is for select fields from the object

    generators = generators.map(async (gen) => {
        let controller = await generatorDataController(gen._id)
        let lastOneData = await controller.readLastOne()
        if (lastOneData) {
            let { t1, t2, t3, t4, s1, s2, s3, s4, v1, v2, v3, v4 } = lastOneData
            const tempAvg = (t1 + t2 + t3 + t4) / 4
            const vibAvg = (v1 + v2 + v3 + v4) / 4
            const soundAvg = (s1 + s2 + s3 + s4) / 4

            return { ...gen, tempAvg, vibAvg, soundAvg }
        }
        return { ...gen, message: 'No information from sensors' }
    })
    return await Promise.all(generators) // because from generators.map I get a lot of promises
}

// async function getGeneratorsWithLastData(filter = {}) {
//     if (!filter.status) filter.status = 'available'
//     const generators = await generatorController.read({ ...filter, isActive: true }, 'name location status lastUpdate') // the string is for select fields from the object

//     switch (filter.status) {
//         case 'available':
//             const generatorsWithLastDataPromises = generators.map(async (gen) => {
//                 let controller = await generatorDataController(gen._id)
//                 let lastOneData = await controller.readLastOne()
//                 if (lastOneData) {
//                     let { t1, t2, t3, t4, s1, s2, s3, s4, v1, v2, v3, v4 } = lastOneData
//                     const tempAvg = (t1 + t2 + t3 + t4) / 4
//                     const vibAvg = (v1 + v2 + v3 + v4) / 4
//                     const soundAvg = (s1 + s2 + s3 + s4) / 4

//                     return { ...gen, tempAvg, vibAvg, soundAvg }
//                 }
//                 return { ...gen, message: 'No information from sensors' }
//             })

//             return await Promise.all(generatorsWithLastDataPromises)
//         case 'repair':
//         case 'off':
//             return generators
//         default:
//             return generators;
//     }
// }

async function doPagination(rows, pageNum, ref) {
    let startIndex = (pageNum - 1) * rows
    let genController = await generatorDataController(ref)
    const dataForPage = await genController.readWithSkip({}, { data: 1, scenarioId: 1 }, rows, startIndex)
    // let dataForPage = await generatorDataController.readWithSkip()
    return dataForPage
}

async function addLastUpdateToAllGen() {
    
    let allGen = await generatorController.read()
    let startDate = new Date(2024, 6, 22);
    let endDate = new Date();
    for(gen of allGen){
        await generatorController.update(gen._id, {lastUpdate : (new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())))})
    }
    return true
}

module.exports = { getGeneratorData, getAllGenerators, readGenerator, doPagination, getOneGenerator, addLastUpdateToAllGen }