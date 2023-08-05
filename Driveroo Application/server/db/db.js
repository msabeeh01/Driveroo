require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.URI || '';

mongoose.connect(URI, { useNewUrlParser: true, ignoreUndefined: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log('Error: ', err))

module.exports = mongoose;
