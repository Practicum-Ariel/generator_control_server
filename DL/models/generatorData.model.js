const mongoose = require('mongoose')


const generatorDataSchema = new mongoose.Schema({
    scenarioId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    {
        strict: false
    }

)

module.exports = generatorDataSchema