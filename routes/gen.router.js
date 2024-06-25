const express = require('express')
const router = express.Router()

const genService = require('../BL/services/generator.service')

// router.get("/test", (req, res) => {
//     res.send("test!!!")
// })

// router.get("/", (req, res) => {
//     res.send("test- 2 💀💀💀💀")
// })

router.post("/", async (req, res) => {
    console.log("gen router - add generator:", req.body)
    try {
        const result = await genService.addGenerator(req.body)
        if(result)res.send(result)
        throw { code: 404, msg: 'not found' }
        //else res.status(400).send({"message": "some error happend"})
    } catch (error) {
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'some error happend')
        //res.status(error.code || 400).json({message: error.message})
        //res.send(error.message)
    }
})

router.put("/edit/:name", async (req, res) => {
    console.log("gen router - update generator:",req.params.name, req.body)
    try {
        const result = await genService.updateGenerator(req.params.name, req.body)
        if(result)res.send(result)
        throw { code: 404, msg: 'not found' }    
        //else res.status(400).send({"message": "some error happend"})
    } catch (error) {
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'some error happend')
        //res.send(error.message)
    }
})

router.get('/get-gen/:name', async (req, res) => {
    console.log("gen router - get generator:", req.params.name)
    try {
        const result = await genService.getGenerator(req.params.name)
        if(result)res.send(result)
        throw { code: 404, msg: 'not found' }   
        //else res.status(400).send({"message": "some error happend"})
    } catch (error) {
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'some error happend')
        // console.log(error);
        // res.send(error.message)
    }
})

router.get('/get-gen/', async (req, res) => {
    console.log("gen router - get many generators:")
    
    //console.log(req.query)
    const {limit} = req.query
    //console.log("limit:", limit);
    try {
        const result = await genService.getGenerators(limit)
        console.log("router result:", result);
        if(result)res.send(result)
        throw { code: 404, msg: 'not found' }   
        //else res.status(400).send({"message": "some error happend"})
    } catch (error) {
        //res.send(error.message)
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'some error happend')
    }
})

router.delete('/del-gen/:name', async (req, res) => {
    console.log("gen router - delete generator:", req.params.name)
    try {
        const result = genService.delGenerator(req.params.name)
        if(result)res.send(result)
        throw { code: 404, msg: 'not found' }
        //else res.status(400).send({"message": "some error happend"})
    } catch (error) {
        //res.send(error.message)
        console.log('error test', error);
        res.status(error.code || 500).send(error.msg || 'some error happend')
    }
})




module.exports = router