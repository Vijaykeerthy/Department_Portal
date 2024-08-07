const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to match your frontend URL
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/departmentportal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const studentRoutes = require('./routes/student');
app.use('/api/student', studentRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);




app.post('/api/check-admin-session', async (req, res) => {
  const { userId } = req.body;

  // Replace with your actual database check logic
  const admin = await database.findAdminById(userId);

  if (admin) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
