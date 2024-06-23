const mongoose = require('mongoose')
const genSchema = require('../generator.model')


const generatorModel = mongoose.model('gen700', genSchema)

module.exports = generatorModel


