const express = require('express')
const router = express.Router()

const chartService = require('../BL/services/chart.service')

/*    
need to get json like that in req.query:
    generator_id
    time: day, week, month
    sensor_type: temperature, sound, vibration
    anomalya: {} => not have to - option
*/

router.get('/:genId/data/', async(req,res) =>{
    try{
        const {time, sensor_type, anomalya} = req.query
        //console.log(req.query, "query");
        //const {generator_id} = req.params
        // console.log("params", req.params)
        const data = await chartService.getData(req.params.genId,time,sensor_type, anomalya)
        res.send(data);
    }
    catch(error){
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'error test')
    }

})
router.get('/all-gen', async(req,res) =>{
    
})

module.exports = router;