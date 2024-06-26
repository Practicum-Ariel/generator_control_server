const getController = require('../../DL/controllers/generatorData.controller');
const filterForTime = require('../helpers/dateFilter')
const filterForSensors = require('../helpers/sensorTypeFilter')
const filterForScenario = require('../helpers/scenarioFilter')

async function getDataToCompare(generator_id1,generator_id2, time, sensor_type, anomalya){
    const generator1Controller = await getController(generator_id1);
    // const generator2Controller = await getController(generator_id2); // not for now
    const scenarioId = filterForScenario.getScenarioId(time,sensor_type,anomalya)     
    time = filterForTime.timeFilter(time);
    sensor_type = filterForSensors.sensorFilter(sensor_type);



}

module.exports = {getDataToCompare}
