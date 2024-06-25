const express = require('express')
const router = express.Router()


router.all('/', (req, res, next) => {
   try {
      res.send('test')
   } catch (error) {
      console.log('error test', error);
      res.status(error.code || 500).send(error.msg || 'error test')
   }
})

module.exports = router