const mongoose = require('mongoose');
const generatorSchema = require('../models/generatorData.model');
const generatorController = require('./GeneratorController')

class GeneratorDataController {

    #model;
    #genDataName

    constructor(genId) {
        this.genId = genId
        // todo: genId >> generatorDataTableName
    }

    async config(genId) {
        this.genDataName = await generatorDataTableName(genId)
        const currentModel = await getModelOfGenID(this.genDataName)
        this.#model = currentModel
    }

    create(data) {
        return this.#model.create(data)
    }

    read(filter, proj, limit = 100) {
        return this.#model.find(filter, proj).limit(limit)
    }

    readOne(filter, select) {
        return this.#model.findOne(filter, select)
    }

    readLast(filter, proj, limit = 100) {
        return this.#model.findOne(filter, proj).sort({ _id: -1 })
    }

}


async function getModelOfGenID(genDataName) {
    return mongoose.models[genDataName] || new mongoose.model(genDataName, generatorSchema)
}

async function generatorDataTableName(genId) {
    const res = await generatorController.readOne({ _id: genId })
    return res.dataTableName
}

module.exports = GeneratorDataController


