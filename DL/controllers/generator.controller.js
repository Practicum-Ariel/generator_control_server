const generatorModel = require('../models/generator.model');

// CRUD
async function create(data) {
  return await generatorModel.create(data);
}
async function read(filter, select) {
  return (await generatorModel.find(filter, select)).map(g=>g.toObject());
}
async function readOne(filter, populate) {
  let data = generatorModel.findOne(filter);
  if (populate) data = data.populate({ path: 'sensorsIds' });
  data = await data.exec();
  return data?.toObject();
}

async function readOne2(filter, populate) {
    try {
        let query = generatorModel.findOne(filter);
        if (populate) {
            query = query.populate({ path: 'sensorsIds' });
        }
        const data = await query.exec();
        const result = data ? data.toObject() : null;
        // console.log(result);
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function update(id, data) {
  return await generatorModel.findByIdAndUpdate(id, data);
}
async function del(id) {
  return await update(id, { isActive: false });
}


module.exports = { create, read, readOne, update, del, readOne2 }

