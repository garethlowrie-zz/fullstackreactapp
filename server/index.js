const express = require('express');
const app = express();

/**
 * Route Handler associated with the get method
 * This could also be one of [get, post, put, delete, patch]
 *
 */
app.get('/', (req, res) => {
	res.send({ hi: 'there' }) // Sends JSON back and closes the request
});


const PORT = process.env.PORT || 5000; // Heroku will inject the port as an environment variable
app.listen(PORT); // Start the express server and listen for incoming traffic on the specific port
