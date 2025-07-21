const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',                     
  'https://taskmanagementsarthak.netlify.app'   
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  }
};

app.use(cors(corsOptions));


app.use(express.json());


const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const taskRoutes = require('./routes/task');
app.use('/api/tasks', taskRoutes);

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});