# Full Stack React App
This application will allow a user to login using Google OAuth.
The user will be able to buy credits using Stripe.
Credits can then be used to send out email surveys to people.
Survey results will be tabulated.

## Set up Heroku & push to Heroku
* Add engines to package.json in /server
```
"engines": {
    "node": "8.11.2",
    "npm": "5.6.0"
  }
```
* Add scripts to package.json in /server
```
"scripts": {
    "start": "node index.js"
  }
```
* Initialize git repo in /server
```
git init
git add .
git commit
```
* Login to heroku
```
heroku login
```
* Create a Heroku app
```
heroku create
```
* Note the two urls -> URL 1 = Your app / URL 2 = Remote git repo to push to
```
Creating app... done, ⬢ arcane-everglades-70269
https://arcane-everglades-70269.herokuapp.com/ | https://git.heroku.com/arcane-everglades-70269.git
```
* In /server folder
```
git push heroku master
```
