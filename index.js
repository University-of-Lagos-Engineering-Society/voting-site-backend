const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');

// Set up Handlebars
app.engine('handlebars', engine({ defaultLayout: false, helpers: {
    serialNumber: (index) => index + 1
  }}));
app.set('view engine', 'handlebars');
app.set('views', './views');

dotenv.config()
require('dotenv').config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI
, {
  autoIndex: true,
});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Middleware and other configurations
// parse application/json
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use the routes
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/nominees', require('./routes/nomineeRoutes'));
app.use('/vote', require('./routes/voteRoutes'));
// Use other routes

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
