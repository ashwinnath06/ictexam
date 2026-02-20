const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4, // Force IPv4
            serverSelectionTimeoutMS: 5000 // Timeout after 5s
        });
        console.log('✅ MongoDB Connected successfully.');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        if (err.message.includes('IP not whitelisted') || err.message.includes('ECONNRESET')) {
            console.error('TIP: This often means your IP is not whitelisted in MongoDB Atlas or there is a network restriction.');
        } else if (err.message.includes('querySrv')) {
            console.error('TIP: This is a DNS issue. The server is trying to resolve the MongoDB SRV record.');
        }
        process.exit(1);
    }
};

module.exports = connectDB;