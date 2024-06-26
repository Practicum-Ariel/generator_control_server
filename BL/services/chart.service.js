// const controller => need to get from someone
const DAY_MS = 1000 * 60 * 60 * 24;
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

    // let d =
    // {
    //     t1: [
    //         { x: 'date', y: 'value' },
    //         { x: 'date', y: 'value' }],
    //     t2: [
    //         { x: 'date', y: 'value' },
    //         { x: 'date', y: 'value' }],
    //     t3: [
    //         { x: 'date', y: 'value' },
    //         { x: 'date', y: 'value' }],
    //     t4: [
    //         { x: 'date', y: 'value' },
    //         { x: 'date', y: 'value' }],
    // }
}

// const timeFilter = (time) => {
//     switch (time) {
//         case 'day':
//             time = getDayBefore()
//             break;
//         case 'week':
//             time = getWeekBefore()
//             break;
//         case 'month':
//             time = getMonthBefore()
//             break;
//         default:
//             throw { code: 500, msg: ("Dates not in right format") };
//     }
//     return time
// }
// const sensorFilter = (sensor_type) => {
//     switch (sensor_type) {
//         case 'temperature':
//             sensor_type = ["t1", "t2", "t3", "t4"];
//             break;
//         case 'vibration':
//             sensor_type = ["v1", "v2", "v3", "v4"];
//             break;
//         case 'sound':
//             sensor_type = ["s1", "s2", "s3", "s4"];
//             break;
//         default:
//             throw { code: 500, msg: ("Sensors not good") };
//     }
//     return sensor_type
// }


// const getDayBefore = () => new Date() - (DAY_MS) // return new Date()

// const getWeekBefore = () => new Date() - (DAY_MS * 7)

// const getMonthBefore = () => new Date() - (DAY_MS * 30)

// const getPastDayDates = () => {
//     const dates = [];
//     const ansDates = []
//     const currentDate = new Date();

//     for (let i = 0; i < 24; i++) {
//         const date = new Date();
//         date.setHours(currentDate.getHours() - i);
//         dates.push(date.toISOString().split('Z')[0]); // Format the date with time as ISO string

//     }
//     ansDates.push(dates[0], dates[dates.length - 1])

//     console.log(ansDates);

//     return ansDates;
// };

// const getPastWeekDates = () => {
//     const dates = [];
//     const ansDates = [];
//     const currentDate = new Date();

//     for (let i = 0; i < 7; i++) {
//         const date = new Date();
//         date.setDate(currentDate.getDate() - i);
//         dates.push(date.toISOString().split('Z')[0]); // Format the date as YYYY-MM-DDTHH:MM:SS
//     }
//     ansDates.push(dates[0], dates[dates.length - 1]);
//     return ansDates;
// };

// const getPastMonthDates = () => {
//     const dates = [];
//     const ansDates = []
//     const currentDate = new Date();

//     for (let i = 0; i < 30; i++) {
//         const date = new Date();
//         date.setDate(currentDate.getDate() - i);
//         dates.push(date.toISOString().split('Z')[0]); // Format the date with time as ISO string
//     }
//     ansDates.push(dates[0], dates[dates.length - 1]);

//     return ansDates;
// };

// const getScenarioId = (time, sensor_type, anomaly) => {
//     const timeToEventsNumber = {
//         'day': 48,
//         'week': 168,
//         'month': 720
//     }
//     return `${timeToEventsNumber[time]}.${sensor_type}.${anomaly}`
// }

module.exports = { getData, getDataForChart };
