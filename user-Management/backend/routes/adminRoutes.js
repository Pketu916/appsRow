const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createAdmin, findAdminByEmail } = require('../models/adminModel');

// Admin Signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAdmin = await findAdminByEmail(email);
        if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        await createAdmin({ email, password: hashedPassword });
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await findAdminByEmail(email);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful', adminId: admin._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
