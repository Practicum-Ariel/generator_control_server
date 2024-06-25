const mongoose = require('mongoose')

async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI).then(() => console.log("#### db connected ####"))
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {connect}