# Full Stack React App
This application will allow a user to login using Google OAuth.
The user will be able to buy credits using Stripe.
Credits can then be used to send out email surveys to people.
Survey results will be tabulated.

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
