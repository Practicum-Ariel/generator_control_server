const express = require('express');
const router = express.Router();
const authService = require('../BL/services/auth.service');
const { TechnicianAuth, CreateToken } = require('../BL/helpers/authToken');
const jwt = require('jsonwebtoken');
const { readOne } = require('../DL/controllers/auth.controller');

router.post('/login', async (req, res) => {
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

// router.post('/refresh', TechnicianAuth, async (req, res) => {
//     const { idNum, password } = req.body;
//     const tech = { idNum, password };
//     try {
        
//         res.json({ message: `${idNum} logged in successfully!`},tech,token);
//     } catch (err) {
//         res.status(err.code || 400).json({ error: err.message });
//     }
// });

// version 2-------------------------------------------------------------------
// Assuming you have JWT middleware and CreateToken function properly configured



router.post('/refresh', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { idNum } = decoded; // Extract user identifier from decoded token

        // Fetch user data from database based on idNum (assuming readOne function fetches user by idNum)
        const tech = await readOne({ idNum });

        if (!tech) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Issue a new token with extended expiration
        const newToken = CreateToken(tech);

        res.json({ tech, token: newToken });
    } catch (error) {
        console.error('Error refreshing token:', error.message);
        res.status(403).json({ error: 'Token verification failed' });
    }
});


module.exports = router;
