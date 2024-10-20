const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const Student = require('../models/Student');
const Grievance = require('../models/Grievance');



router.post('/checksession', async (req, res) => {
  const { userId } = req.body;

  // Replace with your actual database check logic
  const student = await Student.findById(userId);

  if (student) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

router.post('/signup', async (req, res) => {
  const { name, rollNumber, email, group, password } = req.body;

  // Check if all fields are provided
  if (!name || !rollNumber || !email || !password || !group) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if email already exists
    const existingStudentByEmail = await Student.findOne({ email });
    if (existingStudentByEmail) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Check if roll number already exists
    const existingStudentByRollNumber = await Student.findOne({ rollNumber });
    if (existingStudentByRollNumber) {
      return res.status(400).json({ message: 'Roll number already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new Student({
      name,
      rollNumber,
      email,
      group,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student signed up successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const rollnoFirstTwoDigits = student.rollNumber.toString().slice(0, 2);
      res.json({
      msg: 'Login successful',
      user: {
        id: student._id,
        name: student.name,
        type: 'student',
        studentgroup: student.group,
        year: rollnoFirstTwoDigits
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// router.post('/postgrievances', async (req, res) => {
//   try {
//     const { title, description, studentId } = req.body;

//     // Create a new grievance
//     const newGrievance = new Grievance({
//       title,
//       description,
//       studentId,
//       postedDate: new Date(),
//       status: '',
//     });
    
//     console.log("new added");
//     // Save the grievance to the database
//     const savedGrievance = await newGrievance.save();

//     res.status(201).json(savedGrievance);
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving grievance', error });
//   }
// });


router.post('/postgrievances', async (req, res) => {
  try {
    const { title, description, studentId } = req.body;

    // Call the toxicity analysis API
    const toxicityApiUrl = 'https://toxicity-analysis-api.onrender.com/toxicityanalysis';

    // Make a GET request to the toxicity analysis API with the description as a query parameter
    const toxicityResponse = await axios.get(toxicityApiUrl, {
      params: {
        text: description
      }
    });

    // Extract toxicity results
    const { toxicity_results } = toxicityResponse.data;

    // Check if the text contains toxicity based on the provided results
    const isToxic = 
      toxicity_results["Prob (Identity Hate)"] > 0.5 ||
      toxicity_results["Prob (Insult)"] > 0.5 ||
      toxicity_results["Prob (Obscene)"] > 0.5 ||
      toxicity_results["Prob (Severe Toxic)"] > 0.5 ||
      toxicity_results["Prob (Threat)"] > 0.5 ||
      toxicity_results["Prob (Toxic)"] > 0.5;

    if (isToxic) {
      // Toxicity detected, do not save the grievance
      console.log('Toxicity detected in the description:', toxicity_results);
      return res.status(400).json({ message: 'Toxic content detected in the description. Please modify your input.' });
    } else {
      console.log('No toxicity detected in the description.');
    

    // Call the sentiment analysis API
    const sentimentApiUrl = 'https://sentiment-analysis-api-tjyg.onrender.com/sentimentanalysis';

    // Make a GET request to the sentiment analysis API with the description as a query parameter
    const sentimentResponse = await axios.get(sentimentApiUrl, {
      params: {
        text: description
      }
    });

    // Extract sentiment classification (positive, negative, etc.)
    const { sentiment_classification } = sentimentResponse.data;

    // Print the sentiment analysis result
    console.log('Sentiment Analysis Result:', sentimentResponse.data);

    // Create a new grievance with the status set to the sentiment classification
    const newGrievance = new Grievance({
      title,
      description,
      studentId,
      postedDate: new Date(),
      status: sentiment_classification, // Set the status based on the sentiment analysis result
    });

    // Save the grievance to the database
    const savedGrievance = await newGrievance.save();

    // Send a success message along with the saved grievance and sentiment analysis result
    res.status(201).json({
      message: "Grievance saved successfully and it wasn't toxic.",
      grievance: savedGrievance,
      sentiment: sentimentResponse.data // Optionally include sentiment analysis result in the response
    });
  }
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ message: 'Error processing request', error });
  }

});


router.get('/viewgrievances', async (req, res) => {
  try {
    const { studentId } = req.query;
    const grievances = await Grievance.find({ studentId: studentId });
    res.json(grievances);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

module.exports = router;
