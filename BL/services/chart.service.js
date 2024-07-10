// const controller => need to get from someone
const getController = require('../../DL/controllers/generatorData.controller')
const {getTimeFilter,getSensorFilter,getScenarioId} = require('../helpers/filters')

//for 2 date need to get time = between, and vars min and max. add another case in time
async function getData(generator_id, time, sensor_type, anomalya = 'normal') {

    const scenarioId = getScenarioId(time, sensor_type, anomalya) // TEMP (delete at the end)

    time = getTimeFilter(time);
    sensor_type = getSensorFilter(sensor_type);
    const selectString = sensor_type.join(" ") + " date"
    
    filter = { date: { $gt: time } }
    filter = { scenarioId } //TEMP (delete at the end) //48.temperaure.normal
    const genDataController = await getController(generator_id);
    return await genDataController.read(filter, selectString);
}

async function getDataForChart(generator_id, time, sensor_type, anomalya) {
    let result = await getData(generator_id, time, sensor_type, anomalya)
    let data = {}
    sensor_type = getSensorFilter(sensor_type)
    // let obj = Object.keys(result[0]).slice(3) // dont need for now id and date find what is _doc slice(2)
    sensor_type.forEach(sens => data[sens] = [])
    result.forEach(res => {
        let date1 = res.date;
        for (const i in res) {
            if (sensor_type.includes(i)) {
                //data[i] = []
                data[i].push({ x: date1, y: res[i] })
            }
        }
    })
    const dataForClient = Object.keys(data).map(sens =>{
        return {name:sens, points:data[sens]}
    })
    return dataForClient; 
}


async function getLastData(generator_id) {
    const genDataController = await getController(generator_id);
    // console.log(await genDataController.readLast2({"scenarioId":"live.15.sound.normal"}))
    return await genDataController.readLast2({ "scenarioId": "live.15.sound.normal" });
}

module.exports = { getData, getDataForChart, getLastData };
