const alertController = require("../../DL/controllers/alert.controller");

async function getAllAlerts() {
    return await alertController.read();
}

module.exports = {
    getAllAlerts};