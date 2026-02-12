const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const connectDB = require('./src/config/database');
connectDB();

app.use('/api/auth', require('./src/routes/auth'));\napp.use('/api/articles', require('./src/routes/articles'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/notifications', require('./src/routes/notifications'));

app.use(require('./src/middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const scheduler = require('./src/cron/scheduler');
scheduler.startScheduler();