const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const multer = require('multer');
const path = require('path');
const Circular = require('../models/Circular'); // Assuming you have a Mongoose model named Circular
const Admin = require('../models/Admin'); // Assuming you have an Admin model
const Grievance = require('../models/Grievance');


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

router.post('/checksession', async (req, res) => {
  const { userId } = req.body;  
  // Replace with your actual database check logic
  const admin = await Admin.findById(userId);
  console.log(admin);

  if (admin) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin signed up successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    res.json({
      msg: 'Login successful',
      user: {
        id: admin._id,
        name: admin.name,
        type: 'admin'
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const upload = multer({ storage: storage });

router.post('/circulars', upload.single('image'), (req, res) => {
    const { title } = req.body;
    const image = req.file.path;
  
    const newCircular = new Circular({
      title,
      image
    });
  
    newCircular.save()
      .then(circular => res.json(circular))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.get('/circulars', (req, res) => {
    Circular.find()
        .then(circulars => res.json(circulars))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/viewallgrievances', async (req, res) => {
  try {
      const grievances = await Grievance.find();
      res.json(grievances);
  } catch (error) {
      console.error('Error fetching grievances:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

router.post('/respondgrievance', async (req, res) => {
  const { grievanceId, response } = req.body;
  console.log(grievanceId);
  try {
      const updatedGrievance = await Grievance.findByIdAndUpdate(
          grievanceId,
          { response },
          { new: true } // Return the updated document
      );
      if (updatedGrievance) {
          res.json(updatedGrievance);
      } else {
          res.status(404).json({ message: 'Grievance not found' });
      }
  } catch (error) {
      console.error('Error updating response:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
