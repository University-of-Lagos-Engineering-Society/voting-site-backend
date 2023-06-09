const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
require('dotenv').config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI
, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Middleware and other configurations
// parse application/json
app.use(cors());
app.use(bodyParser.json())
// Use the routes
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/nominees', require('./routes/nomineeRoutes'));
app.use('/votes', require('./routes/voteRoutes'));
// Use other routes

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
