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
        enum: ['available', 'repair', 'off'],
        default: 'available'
    },
    insights: {
        type: Array,
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const generatorModel = mongoose.model('generator', generatorSchema)

module.exports = generatorModel