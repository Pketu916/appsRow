const { getDB } = require('../db');

async function createAdmin(admin) {
    const db = getDB();
    return await db.collection('admins').insertOne(admin);
}

async function findAdminByEmail(email) {
    const db = getDB();
    return await db.collection('admins').findOne({ email });
}

module.exports = { createAdmin, findAdminByEmail };
