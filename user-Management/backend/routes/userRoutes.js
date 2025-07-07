const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

// Get all users
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a user
router.post('/', async (req, res) => {
    const { name, age, email, mobile_number } = req.body;
    if (!name || !age || !email || !mobile_number) {
        return res.status(400).json({ message: 'All fields required' });
    }
    try {
        const db = getDB();
        const result = await db.collection('users').insertOne({ name, age, email, mobile_number });
        res.json({ id: result.insertedId, name, age, email, mobile_number });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, email, mobile_number } = req.body;
    try {
        const db = getDB();
        await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, age, email, mobile_number } }
        );
        res.json({ id, name, age, email, mobile_number });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = getDB();
        await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
