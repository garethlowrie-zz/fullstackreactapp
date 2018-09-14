const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./services/passport');

mongoose.connect(keys.mongoURI); // Pass the DB URI to the connection function

const app = express();
require('./routes/authRoutes')(app); // Immediately invoke the function exported by the passport






const PORT = process.env.PORT || 5000; // Heroku will inject the port as an environment variable
app.listen(PORT); // Start the express server and listen for incoming traffic on the specific port
