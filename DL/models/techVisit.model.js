const { text } = require('express');
const mongoose = require('mongoose');

const techVisitSchema = new mongoose.Schema({
  genId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'generator',
    required: true,
  },
  techId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'technician',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  insightId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'insight',
    required: true,  // TODO - delete
  },
  text: {
    type: String,
  },
  checklist: [
    {
      title: { type: String },
      value: { type: String }, // TODO - any - mixin
    },
  ],
  type: {
    type: String,
    enum: ['day', 'month', 'week', 'insight', 'general'],
  },
});

const techVisitModel = mongoose.model('techVisit', techVisitSchema);

module.exports = techVisitModel;
