const express = require('express')
const router = express.Router()

const chartService = require('../BL/services/chart.service')
const generatorService = require('../BL/services/generator.service')

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
        const data = await chartService.getDataForChart(req.params.genId,time,sensor_type, anomalya)
        res.send(data);
    }
    catch(error){
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'error test')
    }

})

router.get('/:genId/sensors/', async(req,res) =>{
    try{
        const sensors = await generatorService.readGenerator(req.params.genId, true)
        // console.log(sensors)
        res.send(sensors.sensorsIds);
    }
    catch(error){
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'error test')
    }
})

router.get('/:genId/', async(req,res) =>{
    try{
        const generator = await generatorService.getOneGenerator(req.params.genId)
        res.send(generator);
    }
    catch(error){
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'error test')
    }
})


router.get('/all-gen', async(req,res) => {
    try {
        const {status} = req.query
        const generators = await generatorService.getGeneratorsWithLastData({status})
        res.send(generators)
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
    
})


router.get('/pagination', async (req, res) => {
    try {
        const { rows, pageNumber, ref } = req.query;
        const data = await generatorService.doPagination(parseInt(rows), parseInt(pageNumber), ref);
        res.send(data);
    } catch (err) {
        console.log(err)
        res.status(err.code || 500).send(err.message);
    }   
});

module.exports = router;