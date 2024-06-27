const mongoose = require('mongoose');

const techVisitSchema = new mongoose.Schema({
  genId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'generator',
    required: true,
  },
  techId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  insightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'insight',
  },
  text: {
    type: String,
  },
  checklist: [
    {
      title: { type: String },
      value: { type: mongoose.Schema.Types.Mixed }, // type = any
    },
  ],
  type: {
    type: String,
    enum: ['day', 'month', 'week', 'insight', 'general'],
  },
});

const techVisitModel = mongoose.model('TechVisit', techVisitSchema);

module.exports = techVisitModel;
