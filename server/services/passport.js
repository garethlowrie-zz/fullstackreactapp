const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

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
