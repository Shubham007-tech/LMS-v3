//   Main application file
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const videoRoutes = require('./routes/video');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/category');
const cors = require('cors');





dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests

app.use(cors());

// Routes
app.use('/api/videos', videoRoutes);

// Use auth routes for sign-up and login
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);   

// Database Connection
mongoose.connect(process.env.MONGO_URI)     ///  
.then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database connection error: ', err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
