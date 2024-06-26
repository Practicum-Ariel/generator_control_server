const sensorFilter = (sensor_type) => {

    const sensorTypes = {
        'temperature': ["t1", "t2", "t3", "t4"],
        'vibration': ["v1", "v2", "v3", "v4"],
        'sound': ["s1", "s2", "s3", "s4"],
        'all': ["t1", "t2", "t3", "t4", "v1", "v2", "v3", "v4", "s1", "s2", "s3", "s4"]
    }
    return sensorTypes[sensor_type]
}
    // switch (sensor_type) {
    //     case 'temperature':
    //         sensor_type = ;
    //         break;
    //     case '':
    //         sensor_type = ;
    //         break;
    //     case '':
    //         sensor_type = ;
    //         break;
    //     case 'all':
    //         sensor_type = ["t1", "t2", "t3", "t4", "v1", "v2", "v3", "v4", "s1", "s2", "s3", "s4"]
    //     default:
    //         throw { code: 500, msg: ("Sensors not good") };
    // }
    // return sensor_type
// }

module.exports = sensorFilter