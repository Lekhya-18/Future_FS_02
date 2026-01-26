const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');
dotenv.config();

const seed = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    if (adminExists) {
        console.log('Admin already exists');
        process.exit();
    }
    await Admin.create({
        email: 'admin@example.com',
        password: 'password123'
    });
    console.log('Admin seeded: admin@example.com / password123');
    process.exit();
};
seed();