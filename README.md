# Full Stack React App
This application will allow a user to login using Google OAuth.
The user will be able to buy credits using Stripe.
Credits can then be used to send out email surveys to people.
Survey results will be tabulated.

## Install nodemon
```
npm install --save nodemon
```
Add dev script to ```package.json```
```
"scripts": {
    "dev": "nodemon index.js"
  }
```

## Set up Heroku & push to Heroku
Add engines to package.json in ```/server```
```
"engines": {
    "node": "8.11.2",
    "npm": "5.6.0"
  }
```
Add scripts to package.json in ```/server```
```
"scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
```
Initialize git repo in ```/server```
```
git init
git add .
git commit
```
Login to heroku
```
heroku login
```
Create a Heroku app
```
heroku create
```
Note the two urls -> URL 1 = Your app / URL 2 = Remote git repo to push to
```
Creating app... done, ⬢ arcane-everglades-70269
https://arcane-everglades-70269.herokuapp.com/ | https://git.heroku.com/arcane-everglades-70269.git
```
In ```/server``` folder
```
git push heroku master
```

## Subsequent Heroku deployments
Inside ```/server```
```
git add .
git commit -am "MSG HERE"
git push heroku master
```

## Userful Heroku command
Debug issues
```
heroku logs
```
Open Heroku site
```
heroku open
```

## Set up Google OAuth for user authentication

1. Install passport in ```/server```
This module has general helpers for handling auth in Express apps.

```
npm install --save passport
```

2. Install passport strategy in ```/server```
Strategy modules are helpers for authenticating for a specific authentication method (e.g. email/password, Google, Facebook)
```
npm install --save passport-google-oauth20
```

3. Import/require the modules in your index.js
```
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
```

4. Tell passport how to use the strategy
```passport.use``` will tell passport to be aware of the Google OAuth Strategy.
```
passport.use(new GoogleStrategy());
```
5. Set up Google Project
Navigate to [Google Dashboard](https://console.developers.google.com/)
* Create A Project
* Enable the ```Google+ API```

6. Generate Google Project Credentials
* Type: ```Web Application```
* Authorized JavaScript origins: ```http://localhost:5000```
* Authorized redirect URIs: ```http://localhost:5000/*```
* Take note of **Client ID**: Public token - this can be shared public.
* Take note of **Client Secret**: Private token - do not share with anyone.

7. Create ```/config/keys.js``` file and export the keys
* Add keys.js to git.ignore file to ensure this sensitive information is not passed up to git.
```
module.exports = {
	googleClientID: 'COPY TO HERE',
	googleClientSecret: 'COPY TO HERE'
};
```
8. Import keys into index.js
```
const keys = require('./config/keys');
```
9. Configure the Google Strategy created earlier
Pass in ```clientId``` and ```clientSecret``` and ```callbackURL```
```
// Configure Passport to use the Google Strategy
passport.use(new GoogleStrategy(
	{
		clientId: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken, refreshTokem, profile, done) => {
		console.log(accessToken)
		console.log(refreshTokem)
		console.log(profile)
		console.log(done)
	}
));
```
9. Set up route handler
This will send the user into the passport flow.
```passport.authenticate``` takes two parameters, first is the strategy identification string, second tells us what we need access to via scope/permissions.
```
// Route that will direct user into the Google OAuth workflow
app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);
```
10. Add callback route 

```
// Callback route after authentication has taken place
app.get(
	'/auth/google/callback',
	passport.authenticate('google')
);
```


11. Create a database
* We will use MongoDB. You can create a new database @ mlab.com
* Create the database.
* Create a user for the database (not read-only)

12. Install mongoose inside the ```server``` directory
```
npm install mongoose --save
```

13. Connect your app to your MongoDB
Put your mongoURI into your ```config/keys``` so that it is not commited to github.
Also update the 
```
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI); // Pass the address to the connection function
```

14. Create a model for each collection
Create a ```/models``` directory inside ```/server``` then create your model e.g. ```/User.js```

```
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema that a user document should conform too.
const userSchema = new Schema({
	googleId: String
});

// Convert the userSchema into a Model that we can work with
mongoose.model('users', userSchema);

```
Then import your model
```
require('./models/User');
```

15. Save user to database
* Modify the callback in the ```passport.js``` file to check if the user already exists with that profile id, if not then create them.
```
// Configure Passport to use the Google Strategy
passport.use(new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, async(accessToken, refreshToken, profile, done) => {
		const result = await User.findOne({ googleId: profile.id }) //Attempt to find an existing user

		if (!result) {
			const newUser = await new User({
				googleId: profile.id
			}).save();

			done(null, newUser); // Tell passport we are finished creating the new user
		}

		done(null, result); // Tell passport we are finished, pass the existing user
	}
));

```

16. Encoding Users
* Define the serializeUser function  which will be called with the user to generate an identifying piece of information.
```
passport.serializeUser((user, done) => {
	done(null, user.id); // This is the unique id in the db, not the Google ID
});
```

* Define the deserializeUser function which takes a cookie and turns it into a user.
```
passport.deserializeUser(async (id, done) => {
	try {
		const result = await User.findById(id);
		done(null, result); // This is the data that put inside the cookie, in our case the user id
	}
	catch (e) {
		throw e;
	}
});
```
