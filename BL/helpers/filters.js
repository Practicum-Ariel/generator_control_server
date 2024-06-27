const DAY_MS = 1000 * 60 * 60 * 24;
const dot = {
    'day': 1,
    'week': 7,
    'month': 30
}
const getTimeFilter = (time) => new Date() - (DAY_MS * dot[time])

const getSensorFilter = (sensor_type) => {
    const sensorTypes = {
        'temperature': ["t1", "t2", "t3", "t4"],
        'vibration': ["v1", "v2", "v3", "v4"],
        'sound': ["s1", "s2", "s3", "s4"],
        'all': ["t1", "t2", "t3", "t4", "v1", "v2", "v3", "v4", "s1", "s2", "s3", "s4"]
    }
    return sensorTypes[sensor_type]
}

const getScenarioId = (time, sensor_type, anomaly) => {
    const timeToEventsNumber = {
        'day': 48,
        'week': 168,
        'month': 720
    }
    return `${timeToEventsNumber[time]}.${sensor_type}.${anomaly}`
}

 module.exports = {getTimeFilter,getScenarioId, getSensorFilter}