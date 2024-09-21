const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    genId: {
        type: String,
        required: true
    },
    sensor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sensor',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    anomaly: {
        type: String,
        required: true,
        enum : ['normal', 'mild', 'moderate', 'severe']
    },
    is_active: {
        type: Boolean,
        default: true
    },

},
    { timestamps: true } // מוסיף createdAt ו-updatedAt אוטומטית

);

const Alert = mongoose.model('alert', alertSchema);

module.exports = Alert;