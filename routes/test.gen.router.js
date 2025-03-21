const express = require('express'), router = express.Router();
const service = require('../BL/services/generator.service')

router.get('/', async (req, res) => {
    console.log("test-gen")
    try {
        const data = await service.getGeneratorData("6678464e815884d6e23a4542")
        if (data) res.send(data)
        else res.status(404).json({ message: "not found" })
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "something went wrong" })
    }
})

router.post('/', async (req, res) => {
    console.log("post data: ", req.body)
    try {
        const result = await service.addGeneratorData(req.body)
        console.log("21 - ", result)
        if (result) res.send(result)
        else res.status(400).send({ "message": "bad request" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }
})

router.delete('/del/:genId', async (req, res) => {
    console.log(`del generator data table, genId: ${req.params.genId}`)
    try {
        // const genName = req.params.genId;
        // console.log(genName);
        const result = await service.deleteGeneratorData(req.params.genId)
        console.log("34 - del result - ", result)
        if (result) res.send(result)
        else res.status(400).send({ "message": "bad request" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }
})
module.exports = router