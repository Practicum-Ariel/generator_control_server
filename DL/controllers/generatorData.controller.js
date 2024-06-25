const mongoose = require('mongoose');
const generatorDataModel = require('../models/generatorData.model');
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

    create(data) {
        return this.#model.create(data)
    }

    async read(filter, proj, limit = 1000) {
        return await this.#model.find(filter, proj).limit(limit)
    }

    async readOne(filter, select) {
        return await this.#model.findOne(filter, select)
    }

    async readLast( limit = 1) {
        let last= this.#model.find().sort({ date: -1 }).limit(limit)
        return await last.exec()
    }

}


async function getModelOfGenID(genDataName) {
    return mongoose.models[genDataName] || new mongoose.model(genDataName, generatorDataModel)
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


