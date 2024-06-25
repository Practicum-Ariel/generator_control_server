// version1------------------------------------------------------------

// Function to generate a JWT
const jwt = require('jsonwebtoken');
const generateJWT = async(user, res, next) => {
    // JWT payload containing user information
    const payload = {
      userID: user.idNum,
      username: user.fullName,
    };
  
    // JWT options: expiresIn specifies the token's expiration time (e.g., 1 hour)
    const options = {
      expiresIn: '1h',
    };
  
    // Generate and return the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    res.send(`this is a token: ${token}`); // Return the token;
    next()
  }

  module.exports = generateJWT