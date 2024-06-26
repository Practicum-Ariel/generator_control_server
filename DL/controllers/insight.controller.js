const Insight = require('../models/insights.model');

// Create a new insight
async function create(data) {
    return await Insight.create(data);
}
// Create multiple insights
async function createMany(dataArray) {
    return await Insight.insertMany(dataArray);
}

// Read all insights by any filter
async function read(filter, select) {
    return await Insight.find(filter, select);
}

// Read one insight by _id or any filter
async function readOne(filter) {
    const data = await Insight.findOne(filter);
    return data ? data.toObject() : null;
}

// Update an insight
async function update(id, data) {
    return await Insight.findByIdAndUpdate(id, data, { new: true });
}

// Delete an insight (soft delete)
async function del(id) {
    return await Insight.findByIdAndUpdate(id, { is_active: false }, { new: true });
}

module.exports = { create, createMany, read, readOne, update, del };
