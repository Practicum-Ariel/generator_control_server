//sagiButa
//ai service for insight

const { read, readOne, create, update, del } = require('../../DL/controllers/insight.controller');

// === BL-FUNCTIONS ===

// --- GETS ALL &
async function getAllInsights(filter, sort, skip, limit, select) {
    return await read(filter, sort, skip, limit, select);
}

// --- GET ONE FUNCTION ---
async function getOneInsight(filter, select) {
    filter = { _id: filter }
    return await readOne(filter, select);
}

// ---CREATE A NEW INSIGHTS OR ONES---
async function createInsight(dataArray) {
    // אם הנתונים הם מערך, הכנס כל תובנה בנפרד למסד הנתונים
    if (dataArray.length > 0) {
        const results = [];
        for (const data of dataArray) {
            console.log("arr", dataArray);
            const result = await create(data);
            results.push(result);
        }
        return results;
    } else {
        // אם זה לא מערך, הכנס רק את התובנה היחידה
        return await create(dataArray);
        console.log("one".dataArray);
    }
}

// --- UPDATE INFORMATION VALUES OR SOFT DLETED (ISACTIVE:FALSE) ---
async function updateInsight(id, data) {
    return await update(id, data);
}

// ---DELETED  AN INSIGHT ---
async function deleteInsight(id) {
    return await del(id);
}

module.exports = { createInsight, getOneInsight, getAllInsights, updateInsight, deleteInsight };