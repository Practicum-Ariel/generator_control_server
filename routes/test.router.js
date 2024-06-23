const express = require('express')
const router = express.Router()


router.all('/', (req, res) => {
   try {
      res.send('test')
   } catch (error) {
      console.log('error test', error);
      res.status(error.status || 500).send(error)
   }
})

module.exports = router