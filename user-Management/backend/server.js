const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {
    app.use('/users', userRoutes);
    app.use('/admin', adminRoutes);  // Second route for admin

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(console.error);
