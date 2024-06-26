const express = require('express')
const router = express.Router()

const compareService = require('../BL/services/compare.service');

router.get('/', async(req,res) => {
    try {
        const {ids, time, sensor_type, anomalya} = req.query;
        const data = await compareService.getDataToCompare(genId1,genId2,time,sensor_type,anomalya);
        res.send('OK');
    }
    catch (error){
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'error test');
    }

})

module.exports = router