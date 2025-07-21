
const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try {
    console.log("---------------------------------");
    console.log("Step 1: Received registration request with body:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("Validation Failed: Missing fields.");
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    console.log(`Step 2: Checking if user with email ${email} exists...`);
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      console.log("User Exists: A user with this email was found.");
      return res.status(400).json({ msg: 'User with this email already exists.' });
    }

    console.log("Step 3: User does not exist. Creating new user instance...");
    const newUser = new User({
      name,
      email,
      password,
    });

    console.log("Step 4: Attempting to save the new user to the database...");
    const savedUser = await newUser.save();
    console.log("Step 5: User saved successfully. User ID:", savedUser.id);
    
    console.log("Step 6: Creating JWT token...");
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Step 7: Registration successful. Sending token back to client.");
    console.log("---------------------------------");

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
      },
    });

  } catch (err) {
    console.error("!!!!!!!!!! ERROR in /register route !!!!!!!!!!");
    console.error(err);
    console.log("---------------------------------");
    res.status(500).json({ msg: 'Server error during registration.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;