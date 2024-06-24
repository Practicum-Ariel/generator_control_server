// const controller => need to get from someone
const DAY_MS = 1000 * 60 * 60 * 24;
const getController = require('../../DL/controllers/generatorData.controller')

async function getData( generator_id, time, sensor_type, anomalya = {} ) {
    switch (time) {
        case 'day':
            time = getDayBefore()
            break;
        case 'week':
            time = getWeekBefore()
            break;
        case 'month':
            time = getMonthBefore()
            break;
        default:
            throw { code: 500, msg: ("Dates not in right format") };
    }
    switch (sensor_type) {
        case 'temperature':
            sensor_type = "t1 t2 t3 t4";
            break;
        case 'vibration':
            sensor_type = "s1 s2 s3 s4"
            break;
        case 'volume':
            sensor_type = "v1 v2 v3 v4"
            break;
        default:
            throw { code: 500, msg: ("Sensors not good") };
    }
    let select = sensor_type + " date"
    filter = {date:{$gt:'2024-05-23T21:00:00.000+00:00'}} //{$gt:'',&lt:''}
    
    console.log("gen:", generator_id);
    //filter = {scenarioId:'168.temperature.normal'}//getSenIdOfEti() // delete at the end
    const genDataController = await getController(generator_id);
    return await genDataController.read(filter, select);    
}   


const getDayBefore = () => new Date() - (DAY_MS) // return new Date()

const getWeekBefore = () => new Date() - (DAY_MS*7)

const getMonthBefore = () => new Date() - (DAY_MS*30)

const getPastDayDates = () => {
    const dates = [];
    const ansDates = []
    const currentDate = new Date();

    for (let i = 0; i < 24; i++) {
        const date = new Date();
        date.setHours(currentDate.getHours() - i);
        dates.push(date.toISOString().split('Z')[0]); // Format the date with time as ISO string

    }
    ansDates.push(dates[0], dates[dates.length - 1])

    console.log(ansDates);

    return ansDates;
};
getPastDayDates()
const getPastWeekDates = () => {
    const dates = [];
    const ansDates = [];
    const currentDate = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() - i);
        dates.push(date.toISOString().split('Z')[0]); // Format the date as YYYY-MM-DDTHH:MM:SS
    }
    ansDates.push(dates[0], dates[dates.length - 1]);
    return ansDates;
};

const getPastMonthDates = () => {
    const dates = [];
    const ansDates = []
    const currentDate = new Date();

    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() - i);
        dates.push(date.toISOString().split('Z')[0]); // Format the date with time as ISO string
    }
    ansDates.push(dates[0], dates[dates.length - 1]);

    return ansDates;
};


module.exports = {getData};
