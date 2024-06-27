const getController = require('../../DL/controllers/generatorData.controller');
const {getTimeFilter,getSensorFilter,getScenarioId} = require('../helpers/filters')

async function getAllData(ids, time, sensor_type, anomalya){
    //const generator1Controller = await getController(generator_id1);
    // const generator2Controller = await getController(generator_id2); // not for now
    
    const anomalyaArr = anomalya.split(",")
    const idsArr = ids.split(",")
    const allSensorType = ['temperature','vibration','sound']
    // const scenarioIds = anomalyaArr.map(ano => getScenarioId(time,sensor_type,ano))
    // const scenarioIds = anomalyaArr.map(ano => {
    //     allSensorType.map(type => getScenarioId(time,type,ano))
    // })
    const scenarioIds = anomalyaArr.flatMap(ano => {
        return allSensorType.map(type => getScenarioId(time, type, ano));
    });
    console.log(scenarioIds,"all scenario")
    // const gens = idsArr.map((g, i) => ({id: g, sen: [scenarioIds[i]] }))
    //const gens = scenarioIds.map((s,i) => ({id: idsArr[i%(idsArr.length)], sen: [s] }))    
    
    const gens = idsArr.map((g,i) => ({id: g, sen: allSensorType.map(type => getScenarioId(time, type, anomalyaArr[i])) }))    
    console.log(gens,"gens")

    const getDataPerGen = async ({id, sen: scenarioIds })=>{
        // const scenarioId = getScenarioId(time,sensor_type,anomalya)     
        // time = getTimeFilter(time);
        const sensor_type1 = getSensorFilter(sensor_type);
        const selectString = sensor_type1.join(" ") + " date"
        // console.log(selectString,"select")
        // let filter = { date: { $gt: time } }
        // filter = { scenarioId } //TEMP (delete at the end) //48.temperaure.normal
        const filter = { scenarioId: { $in: scenarioIds } }
        console.log(filter);
        console.log(selectString,"     select")
        const genDataController = await getController(id);
        //return await genDataController.read({filter}, selectString);
        // return scenarioIds;
        
        // gen1
        // const re = await genDataController.read({scenarioId:scenarioIds[0]}, selectString);
        // gen2
        const re = await genDataController.readAll(filter, selectString);
        return { id, data: re}
    }

    const gensData = await Promise.all(gens.map(g => getDataPerGen(g) ))
    return gensData;
}
async function getDataToCompare(ids, time, sensor_type, anomalya){
    const data = getAllData(ids, time, sensor_type,anomalya);
    //console.log(data[0]["data"].length, len)

    return data;
}


module.exports = {getDataToCompare}
