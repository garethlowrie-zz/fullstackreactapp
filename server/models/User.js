const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema that a user document should conform too.
const userSchema = new Schema({
	googleId: String
});

mongoose.model('users', userSchema); // Set the 'users' model to be userSchema
