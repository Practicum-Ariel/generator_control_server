const mongoose = require('mongoose');
const generatorSchema = new mongoose.Schema({})

const createModel = (gen_id) => {
    return mongoose.model("gen300", generatorSchema)
}

module.exports = createModel