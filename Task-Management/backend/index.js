// backend/index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---
// We define all our routes here, one after the other.

// User Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Task Routes
const taskRoutes = require('./routes/task');
app.use('/api/tasks', taskRoutes);

// --- DATABASE CONNECTION ---
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => console.error("MongoDB connection error:", err));


// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});