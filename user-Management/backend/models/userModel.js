const { getDB } = require('../db');

async function createUser(user) {
    const db = getDB();
    return await db.collection('users').insertOne(user);
}

async function getAllUsers() {
    const db = getDB();
    return await db.collection('users').find().toArray();
}

module.exports = { createUser, getAllUsers };
