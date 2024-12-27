const express = require('express');
const multer = require('multer');
const Course = require('../models/Course');
const router = express.Router();

// Multer setup for image uploads
const upload = multer({ dest: 'uploads/' });

// Create a new course
router.post('/courses', upload.single('image'), async (req, res) => {
  const { title, price } = req.body;
  const course = new Course({
    title,
    price,
    image: req.file ? req.file.filename : '',
  });
  await course.save();
  res.status(201).json(course);
});

// Read all courses
router.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});


// Update a course
router.put('/courses/:id', upload.single('image'), async (req, res) => {
  const { title, price } = req.body;
  const updateData = { title, price };
  if (req.file) updateData.image = req.file.filename;

  const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updatedCourse);
});

// Delete a course
router.delete('/courses/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Course deleted successfully' });
});

module.exports = router;
