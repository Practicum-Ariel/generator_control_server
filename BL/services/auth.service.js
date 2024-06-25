// // version1----------------------------
//  const { readOne } = require("../../DL/controllers/technician.controller");
//  const bcrypt = require("bcrypt"); // ספריה להצפנת סיסמאו
//  async function login(idNum, password) {
//      //check if idNum and password exist
//      if (!idNum || !password) {
//          throw { code: 400, message: "missing idNum or password  || All fields are required" };
     
//      //check if idNum already exist in database
//      const tech = await readOne({ idNum });
//      if (!tech) {
//          throw { code: 404, message: "idNum not found || user not found" };
     
//      //check if password is correct
//      /*const isMatch = await bcrypt.compare(password, tech.password);
//      if (!isMatch) {
//          throw { code: 401, message: "password is incorrect" };
//      }*/
//      //return tech;  
//  }
// }}
// module.exports = {login}


// version2---------------------------
// auth.service.js
const { readOne } = require("../../DL/controllers/technician.controller");
const bcrypt = require("bcrypt");
const generateJWT = require('../helpers/authToken');

async function login(idNum, password) {
    if (!idNum || !password) {
        throw { code: 400, message: "All fields are required" };
    }

    const tech = await readOne({ idNum });
    if (!tech) {
        throw { code: 404, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, tech.password);
    if (!isMatch) {
        throw { code: 401, message: "Password is incorrect" };
    }

    const token = generateJWT(tech);
    return { tech, token };
}

module.exports = { login };
