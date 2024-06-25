const mongoose = require('mongoose');
const generatorSchema = require('../models/generatorData.model');
const generatorController = require('./generator.controller')

class GeneratorDataController {

    #model;
    #genDataName

    constructor(genId) {
        this.genId = genId
    }

    async config(genId) {
        this.genDataName = await generatorDataTableName(genId)
        const currentModel = await getModelOfGenID(this.genDataName)
        this.#model = currentModel
    }

    async create(data) {
        return await this.#model.create(data)
    }

    async read(filter, proj, limit = 1000) {
        return await this.#model.find(filter, proj).limit(limit)
    }

    async readOne(filter, select) {
        return await this.#model.findOne(filter, select)
    }

    async readLast(filter, proj, limit = 100) {
        return await this.#model.findOne(filter, proj).sort({ _id: -1 })
    }

}


async function getModelOfGenID(genDataName) {
    return mongoose.models[genDataName] || new mongoose.model(genDataName, generatorSchema)
}

async function generatorDataTableName(genId) {
    const res = await generatorController.readOne({ _id: genId })
    return res.dataTableName
}

module.exports = async (genId) => {
    const genController = new GeneratorDataController(genId)
    await genController.config(genId)
    return genController
}


