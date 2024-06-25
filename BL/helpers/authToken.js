const jwt = require('jsonwebtoken');

const CreateToken = (tech) => {
    const { idNum, password } = tech;
    const technician = { idNum, password };
    const options = { expiresIn: '1h' };

    try {
        const token = jwt.sign(technician, process.env.JWT_SECRET, options);
        return token;
    } catch (error) {
        console.error('Error signing JWT:', error);
        throw new Error('Error signing JWT');
    }
}

module.exports = CreateToken;
