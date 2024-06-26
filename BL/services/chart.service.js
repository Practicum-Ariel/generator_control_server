// const controller => need to get from someone
const getController = require('../../DL/controllers/generatorData.controller')
const filterForTime = require('../helpers/dateFilter')
const filterForSensors = require('../helpers/sensorTypeFilter')
const filterForScenario = require('../helpers/scenarioFilter')

//for 2 date need to get time = between, and vars min and max. add another case in time
async function getData(generator_id, time, sensor_type, anomalya = 'normal') {
    const scenarioId = filterForScenario.getScenarioId(time, sensor_type, anomalya) // TEMP (delete at the end)
    time = filterForTime.timeFilter(time);
    sensor_type = filterForSensors.sensorFilter(sensor_type);
    const selectString = sensor_type.join(" ")
    let select = selectString + " date"
    filter = { date: { $gt: time } }
    filter = { scenarioId } //TEMP (delete at the end) //48.temperaure.normal
    const genDataController = await getController(generator_id);
    return await genDataController.read(filter, select);
}
async function getDataForChart(generator_id, time, sensor_type, anomalya) {
    let result = await getData(generator_id, time, sensor_type, anomalya)
    let data = {}
    sensor_type = filterForSensors.sensorFilter(sensor_type)
    let obj = Object.keys(result[0]).slice(3) // dont need for now id and date find what is _doc slice(2)
    obj.forEach(e => {
        data[e] = [];
    });
    // let obj = Object.keys(result[0])
    // obj.forEach(e => { 
    //     data[e] = []; 
    // });
    result.forEach(res => {
        let date1 = res.date;
        for (const i in res) {
            if (sensor_type.includes(i)) {
                //data[i] = []
                data[i].push({ x: date1, y: res[i] })
            }
        }
    })
    const myKeys = Object.keys(data);
    const myValues = Object.values(data);
    // console.log(myKeys,"keys")
    // console.log(myValues,"values")
    // const dataForClient = []
    // for (let i=0; i<myKeys.length; i++)(
    //     dataForClient[i] = {name:myKeys[i], points:myValues[i]}
    // )
    const dataForClient = Object.keys(data).map(sens =>{
        return {name:sens, points:data[sens]}
    })
    //console.log(dataForClient,"data");
    return dataForClient; 
}



module.exports = { getData, getDataForChart };
