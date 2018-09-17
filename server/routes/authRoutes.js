const passport = require('passport');

const GOOGLE_STRATEGY_IDENTITY = 'google';

module.exports = (app) => {
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

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	app.get('/api/logout', (req, res) => {
		// Logout is attatched to the request object automatically by passport
		req.logout();
		res.send(req.user);
	});
};
