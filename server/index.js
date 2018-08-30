const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

const GOOGLE_STRATEGY_IDENTITY = 'google';

// Configure Passport to use the Google Strategy
passport.use(new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken, refreshTokem, profile, done) => {
		console.log(accessToken)
		console.log(refreshTokem)
		console.log(profile)
		console.log(done)
	}
));

// Route that will direct user into the Google OAuth workflow
app.get(
	'/auth/google',
	passport.authenticate(GOOGLE_STRATEGY_IDENTITY, {
		scope: ['profile', 'email']
	})
);

// Callback route after authentication has taken place
app.get(
	'/auth/google/callback',
	passport.authenticate(GOOGLE_STRATEGY_IDENTITY)
);

const PORT = process.env.PORT || 5000; // Heroku will inject the port as an environment variable
app.listen(PORT); // Start the express server and listen for incoming traffic on the specific port
