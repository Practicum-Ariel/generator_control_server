const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
    insight: {
        type: String,
        required: true
    },
    fault_name: {
        type: String,
        required: true
    },
    level_risk: {
        type: Number,
        required: true,
        enum: [1, 2, 3] // 1 = safe, 2 = average, 3 = critical
    },
    fault_description: {
        type: String,
        required: true
    },
    treatments: {
        type: [String],
        required: true
    },
    based_on_data: {
        type: Map,
        of: String,
        required: true
    },
    trend_analysis: {
        type: Map,
        of: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },

},

    { timestamps: true } // מוסיף createdAt ו-updatedAt אוטומטית

);

const Insight = mongoose.model('insight', insightSchema);

module.exports = Insight;
