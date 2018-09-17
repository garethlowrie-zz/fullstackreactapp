const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema that a user document should conform too.
const userSchema = new Schema({
	googleId: String
});

// Convert the userSchema into a Model that we can work with
mongoose.model('users', userSchema);
