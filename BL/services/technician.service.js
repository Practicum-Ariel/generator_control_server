const technicianController = require("../../DL/controllers/technician.controller");
const bcrypt = require("bcrypt"); // ספריה להצפנת סיסמאות
const images = ["/images/profile_1.jpg", "/images/profile_2.jpg", "/images/profile_3.jpg", "/images/profile_4.jpg", "/images/profile_5.jpg"]

async function getAllTechnicians() {
    return await technicianController.read();
}

async function getTechnicianById(idNum) {
    if (!idNum) throw { message: "invalide idNum" }
    return await technicianController.readOne({ idNum });
}

async function doFilters(query) {
    let {filter = {}, sortBy, sortDir, searchIn, searchBy } = query;
    return await technicianController.readFilter(filter , sortBy, sortDir, searchIn, searchBy)
}
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

async function addNewTechnician(body) {
    let { idNum, fullName, phoneNumber, treatmentsId } = body;
     let img = getRandomImage();

    let technician = await getTechnicianById(idNum);
    if (technician) throw { message: "technician is exist" };
    technician = { idNum, fullName, phoneNumber, treatmentsId, password: idNum , img}
    return await technicianController.create(technician)
}

async function updateTechnician(technicianIdNum, newUpdateData) {
    if (!technicianIdNum) {
        throw { message: "invalide technician idNum" };
    }
    const technician = await getTechnicianById(technicianIdNum);
    if (!technician) {
        throw { message: "technician not found" };
    }

    if (newUpdateData.password) {
        // בודקת אם יש סיסמא בנתונים המעודכנים
        const salt = await bcrypt.genSalt(10); // מיצרת סאילט להצפנת הסיסמא
        newUpdateData.password = await bcrypt.hash(newUpdateData.password, salt); // מצפינה את הסיסמא החדשה
    }
    return await technicianController.update({ idNum: technicianIdNum }, newUpdateData);
}

async function deleteTechnician(technicianIdNum) {
    if (!technicianIdNum) {
        throw { message: "invalide technician" };
    }
    let technician = await getTechnicianById(technicianIdNum);
    if (!technician) {
        throw { message: "technician not found" };
    }
    return await technicianController.deleteTechnician({ idNum: technicianIdNum });

}

module.exports = {
    getAllTechnicians, getTechnicianById, doFilters, addNewTechnician, updateTechnician, deleteTechnician,
};
