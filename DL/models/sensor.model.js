const mongoose = require('mongoose')

const sensorSchema = new mongoose.Schema({
    sensorType : {
        type : String,
        required : true
    },
    name : {
        type : String,
        unique : true,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    unitOfMeasure : {
        type: String,
        required : true
    },
    normalAnomalyMin : {
        type : Number,
        required : true
    },
    normalAnomalyMax : {
        type : Number,
        required : true
    },
    mildAnomalyMin : {
        type : Number,
        required : true
    },
    mildAnomalyMax : {
        type : Number,
        required : true
    },
    moderateAnomalyMin : {
        type : Number,
        required : true
    },
    moderateAnomalyMax : {
        type : Number,
        required : true
    },
    severeAnomalyMin : {
        type : Number,
        required : true
    },
    severeAnomalyMax : {
        type : Number,
        required : true
    },
    isActive :{
        type : Boolean,
        default : true
    }
})

const sensorModel = mongoose.model('sensor', sensorSchema)

module.exports=sensorModel