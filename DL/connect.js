const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URI

const connect = async () => {
  try {
    mongoose.connect(MONGO_URL)
      .then(() => console.log('#### DB connect ####'))
  }
  catch (err) {
    console.log('####### ERROR #######\n', err);
  }
}


module.exports = { connect }
