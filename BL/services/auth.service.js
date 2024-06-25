const { readOne } = require("../../DL/controllers/auth.controller");
const bcrypt = require("bcrypt");
const CreateToken = require("../helpers/authToken");

async function login(idNum, password) {
    // check if idNum and password exist
    if (!idNum || !password) {
        throw { code: 400, message: "All fields are required" };
    }

    // check if idNum (technician) already exists in the database
    const tech = await readOne({ idNum });
    if (!tech) {
        throw { code: 404, message: "User not found" };
    }

    // check if password is correct
    console.log(tech.password);
    console.log(password);
    const isMatch = await bcrypt.compare(password, tech.password);
    console.log(isMatch);
    if (!isMatch) {
        throw { code: 401, message: "Invalid credentials" };
    }

    // generate JWT token
    const token = CreateToken(tech);

    return { tech, token };
}

module.exports = { login };
