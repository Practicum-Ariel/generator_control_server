const mongoose = require('mongoose')
const sensor = require('./sensor.model')
const Insight = require('./insights.model')

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
    sensorsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sensor' }],
    dataTableName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'repair', 'off'],
        default: 'available'
    },
    insights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'insight' }],
    lastUpdate: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const generatorModel = mongoose.model('generator', generatorSchema)

module.exports = generatorModel