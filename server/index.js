const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // This must be required before the passport service
require('./services/passport'); // Ensure that our app loads the User configuration

mongoose.connect(keys.mongoURI); // Pass the DB URI to the connection function

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // How long can the cookie exist until expiration
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // Immediately invoke the function exported by the passport

const PORT = process.env.PORT || 5000; // Heroku will inject the port as an environment variable
app.listen(PORT); // Start the express server and listen for incoming traffic on the specific port
