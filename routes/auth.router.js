// // version1------------------------------------------------------------
// /*const express = require('express');
// const router = express.Router();
// const authService = require('../BL/services/auth.service');
// const generateJWT = require('../BL/helpers/authToken');


// router.use(generateJWT)

// router.post('/login', async (req, res) => {
//     const { idNum, password } = req.body;

//     try {
//         const token = await authService.login(idNum, password);
//         res.send(idNum + ' logged in successfully! \n' + password);
//     } catch (err) {
//         res.status(err.code || 400).send(err.message);
//     }
// })

// module.exports = router*/


// // version2------------------------------------------------------------
// /*const express = require('express');
// const router = express.Router();
// const authService = require('../BL/services/auth.service');
// const generateJWT = require('../BL/helpers/authToken');

// router.post('/login', async (req, res) => {
//   const { idNum, password } = req.body;

//   try {
//     // Authenticate user
//     const user = await authService.login(idNum, password);

//     // Generate JWT
//     const token = generateJWT(user);

//     // Send the token back to the client
//     res.json({ token, message: `${idNum} logged in successfully!` });
//   } catch (err) {
//     res.status(err.code || 400).json({ error: err.message });
//   }
// });

// module.exports = router;*/

// // version 3------------------------------------------------------------
// // auth.router.js
// const express = require('express');
// const router = express.Router();
// const authService = require('../BL/services/auth.service');

// router.post('/login',generateJWT, async (req, res) => {
//     const { idNum, password } = req.body;

//     try {
//         const token = await authService.login(idNum, password);
//         res.send({ message: `${idNum} logged in successfully!`, token });
//     } catch (err) {
//         res.status(err.code || 400).send(err.message);
//     }
// });

// module.exports = router;


// version4------------------------------------------------------------
// auth.router.js
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

