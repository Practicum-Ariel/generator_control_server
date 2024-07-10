//sagiButa
//ai controller for insight

const Insight = require('../models/insights.model');

// Read all insights by any filter
async function read(filter, select) {
    return await Insight.find(filter, select).lean();
}

// Read one insight by _id or any filter
async function readOne(filter, select) {
    return await Insight.findOne(filter, select).lean();
}

// Create a new insight
async function create(data) {
    const newData = await Insight.create(data);
    return newData.toObject();
}

// Create new many insight
async function createMany(dataArray) {
    const newDocuments = await Insight.insertMany(dataArray);
    return newDocuments.map(doc => doc.toObject());
}


// Update an insight or Delete an insight (soft delete)
async function update(id, data) {
    return await Insight.findByIdAndUpdate(id, data, { new: true }).lean();
}

// Delete an insight (soft delete)
async function del(id) {
    return await Insight.findByIdAndRemove(id).lean();
}

module.exports = { create, createMany, read, readOne, update, del };
