const mongoose = require('mongoose');
const generatorSchema = new mongoose.Schema({})

const createModel = (gen_id) => {
    return mongoose.model("gen400", generatorSchema)
}

module.exports = createModel


// const generatorModel = mongoose.model(`generstor${gen_id}`, generatorSchema)
// module.exports = generatorModel