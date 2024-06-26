const sensorFilter = (sensor_type) => {
    switch (sensor_type) {
        case 'temperature':
            sensor_type = ["t1", "t2", "t3", "t4"];
            break;
        case 'vibration':
            sensor_type = ["v1", "v2", "v3", "v4"];
            break;
        case 'sound':
            sensor_type = ["s1", "s2", "s3", "s4"];
            break;
        case 'all':
            sensor_type = ["t1", "t2", "t3", "t4", "v1", "v2", "v3", "v4", "s1", "s2", "s3", "s4"]    
        default:
            throw { code: 500, msg: ("Sensors not good") };
    }
    return sensor_type
}

module.exports = {sensorFilter}