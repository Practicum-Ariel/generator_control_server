const express = require('express')
const router = express.Router()

router.get("/test", (req, res) => {
    res.send("test!!!")
})

router.post("/", (req, res) => {
    
})


module.exports = router