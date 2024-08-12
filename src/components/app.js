const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signupdata')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define Mongoose schemas and models
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
});
const Contact = mongoose.model('Contact', contactSchema);

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Route to handle contact form submissions
app.post('/submit-contact', async (req, res) => {
  try {
    const { name, email, address, city } = req.body;
    const newContact = new Contact({ name, email, address, city });
    await newContact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to handle signup form submissions
app.post('/api/signup', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle login requests
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a token (you might want to add a secret key and expiration)
    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
