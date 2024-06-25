const express = require('express');
const router = express.Router();
const authService = require('../BL/services/auth.service');

router.post('/login', async (req, res) => {
    const { idNum, password } = req.body;
    try {
        const { tech, token } = await authService.login(idNum, password);
        res.json({ message: `${idNum} logged in successfully!`, token });
    } catch (err) {
        res.status(err.code || 400).json({ error: err.message });
    }
});

module.exports = router;
