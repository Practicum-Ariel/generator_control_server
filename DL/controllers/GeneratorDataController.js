const mongoose = require('mongoose');
const generatorSchema = require('../models/generator.model');

class GeneratorDataController {

    #model;

    constructor(genId) {
        this.genId = genId
    }

    async config(genId) {
        const m = await getModelOfGenID(genId)
        this.#model = m
    }

    create(data) {
        console.log("create: ", data)
        return this.#model.create(data)
    }

    read() {
        console.log("read:", { m: this.#model });
        return this.#model.findOne({ name: this.genId })
    }
}

async function getModelOfGenID(genId) {
    return mongoose.models[genId] || new mongoose.model(genId, generatorSchema)
}
module.exports = GeneratorDataController 