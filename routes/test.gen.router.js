const express = require('express'), router = express.Router();
const service = require('../BL/services/generator.service')

router.get('/', async (req, res) => {
    console.log("test-gen")
    try {
        const data = await service.getGeneratorData("gen700")
        console.log("data", data)
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
module.exports = router