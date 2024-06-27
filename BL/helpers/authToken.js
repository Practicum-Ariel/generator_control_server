const jwt = require('jsonwebtoken');

 const CreateToken = (tech) => {
     const { idNum, _id } = tech;
     const technician = { idNum, _id };
     const options = { expiresIn: '1h' };

    try {
        const token = jwt.sign(technician, process.env.JWT_SECRET, options);
        return token;
    } catch (error) {
        console.error('Error signing JWT:', error);
        throw new Error('Error signing JWT');
    }
}


const TechnicianAuth = (req,res,next) => {
    authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if(err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

module.exports = {TechnicianAuth,CreateToken}


