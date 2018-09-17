const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users'); // Fetch the 'users' model out of mongoose

passport.serializeUser((user, done) => {
	done(null, user.id); // This is the unique id in the db, not the Google ID
});

passport.deserializeUser(async (id, done) => {
	try {
		const result = await User.findById(id);
		done(null, result); // This is the data that put inside the cookie, in our case the user id
	}
	catch (e) {
		throw e;
	}
});

// Configure Passport to use the Google Strategy
passport.use(new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, async (accessToken, refreshToken, profile, done) => {
		try {
			const result = await User.findOne({ googleId: profile.id }) //Attempt to find an existing user
			if (!result) {
				const newUser = await new User({
					googleId: profile.id
				}).save();

				done(null, newUser); // Tell passport we are finished creating the new user
			}

			done(null, result); // Tell passport we are finished, pass the existing user

		}
		catch (e) {
			console.log(e);
		}

	}
));
