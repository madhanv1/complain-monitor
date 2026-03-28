const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Set debug flags
console.log("Environment Config Loaded:");
console.log("MongoURI:", process.env.MONGO_URI ? "Set (Hidden)" : "Not Set");
console.log("JWT_SECRET Length:", process.env.JWT_SECRET ? process.env.JWT_SECRET.length : "Not Set");

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"].filter(Boolean),
  credentials: true
}));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', require('./routes/data'));
app.use('/api/rules', require('./routes/rules'));

// Port listening removed for Vercel serverless deployment
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;
