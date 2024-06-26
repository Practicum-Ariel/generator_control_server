const express = require('express');
const router = express.Router();
const authService = require('../BL/services/auth.service');


router.post('/login',async (req, res) => {
    const { idNum, password } = req.body;
    const technician = { idNum, password };
    try {
        const { tech, token } = await authService.login(technician);
        console.log(tech)
        res.json({ message: `${idNum} logged in successfully!`, token, tech });
    } catch (err) {
        res.status(err.code || 400).json({ error: err.message });
    }
});

module.exports = router;
