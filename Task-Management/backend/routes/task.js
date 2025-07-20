// backend/routes/task.js

const router = require('express').Router();
const Task = require('../models/task.model');
const auth = require('../middleware/auth'); // We will create this middleware next

// @route   GET /api/tasks
// @desc    Get all tasks for a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newTask = new Task({
      title: title || "New Task", // Provide a default title
      description,
      category,
      user: req.user.id, // Get the user ID from the authenticated request
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// Add this new route handler to backend/routes/task.js

// @route   PUT /api/tasks/:id
// @desc    Update a specific task
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    // Build an object with the fields to update
    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (category) taskFields.category = category;
    if (status) taskFields.status = status;

    // Find the task by its ID
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure the user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update the task and return the new version
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;