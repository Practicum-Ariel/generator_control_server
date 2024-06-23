const mongoose = require('mongoose')

const generatorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    constructuredAt: {
        type: Date,
        default: Date.now
    },
    sensorsIds: {
        type: Array,
    },
    status: {
        type: String,
    },
    generatorDataId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gen_demo_1',
    },
    insights: {
        type: Array,
    },
    isActive: {
        type: Boolean,
        default: true
    }

})



module.exports = generatorSchema