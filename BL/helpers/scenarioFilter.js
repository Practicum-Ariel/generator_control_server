const getScenarioId = (time, sensor_type, anomaly) => {
    const timeToEventsNumber = {
        'day': 48,
        'week': 168,
        'month': 720
    }
    return `${timeToEventsNumber[time]}.${sensor_type}.${anomaly}`
}

module.exports = getScenarioId