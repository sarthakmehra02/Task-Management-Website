const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---

// --- THIS IS THE UPDATED CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:3000',                      // For local development
  'https://taskmanagementsarthak.netlify.app'   // Your live frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  }
};

app.use(cors(corsOptions));
// --- END OF CORS CONFIGURATION ---

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