const express = require('express')
const router = express.Router()

const genService = require('../BL/services/generator.service')

router.post("/", async (req, res) => {
    try {
        const result = await genService.addGenerator(req.body)
        if(result)res.send(result)
        else throw { code: 404, msg: 'not found' }
    } catch (error) {
        res.status(error.code || 500).send(error.msg || 'some error happend')
    }
})

router.put("/edit/:name", async (req, res) => {
    try {
        const result = await genService.updateGenerator(req.params.name, req.body)
        if(result)res.send(result)
        else throw { code: 404, msg: 'not found' }    
    } catch (error) {
        res.status(error.code || 500).send(error.msg || 'some error happend')
    }
})

router.get('/get-gen/:name', async (req, res) => {
    try {
        const result = await genService.getGenerator(req.params.name)
        if(result)res.send(result)
        else throw { code: 404, msg: 'not found' }   
    } catch (error) {
        res.status(error.code || 500).send(error.msg || 'some error happend')
    }
})

router.get('/get-gen/', async (req, res) => {
    const {limit} = req.query
    try {
        const result = await genService.getGenerators(limit)
        if(result)res.send(result)
        else throw { code: 404, msg: 'not found' }   
    } catch (error) {
        res.status(error.code || 500).send(error.msg || 'some error happend')
    }
})

router.delete('/del-gen/:name', async (req, res) => {
    try {
        const result = genService.delGenerator(req.params.name)
        if(result)res.send(result)
        else throw { code: 404, msg: 'not found' }
    } catch (error) {
        res.status(error.code || 500).send(error.msg || 'some error happend')
    }
})




module.exports = router