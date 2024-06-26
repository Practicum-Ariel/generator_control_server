const { read, readOne, create, update, del } = require('../../DL/controllers/insight.controller');

// === BL-FUNCTIONS ===

async function getAll(filter, select) {

    return await read(filter, select);
}
async function getInsight(filter) {

    return await readOne(filter);
}
async function createInsight(dataArray) {
    // אם הנתונים הם מערך, הכנס כל תובנה בנפרד למסד הנתונים
    if (Array.isArray(dataArray)) {
        const results = [];
        for (const data of dataArray) {
            const result = await create(data);
            results.push(result);
        }
        return results;
    } else {
        // אם זה לא מערך, הכנס רק את התובנה היחידה
        return await create(dataArray);
    }
}

async function updateInsight(id, data) {

    return await update(id, data);
}

async function deleteInsight(id) {

    return await del(id);
}

module.exports = { createInsight, getInsight, getAll, updateInsight, deleteInsight };