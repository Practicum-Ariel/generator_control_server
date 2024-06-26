const mongoose = require('mongoose');

const techVisitSchema = new mongoose.Schema({
  genId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'generator',
    required: true,
  },
  techId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Technician',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  insightId: {
    type: mongoose.SchemaTypes.ObjectId,
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
