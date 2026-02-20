const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
const express = require('express');
const connectDB = require('./connection');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const startServer = async () => {
    try {
        // Init Middleware
        app.use(express.json());
        app.use(cors());

        // Define Routes
        app.use('/api/auth', require('./route/authRoutes'));
        app.use('/api/tasks', require('./route/taskRoutes'));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, async () => {
            console.log(`🚀 Server started on port ${PORT}`);
            // Connect Database
            await connectDB();
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
};

startServer();