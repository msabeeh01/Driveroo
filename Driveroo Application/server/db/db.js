require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.URI || 'mongodb://localhost:27017/mean-crud';

mongoose.connect(URI, {useNewUrlParser: true})
        .then(()=>console.log('Connected to MongoDB'))
        .catch(err=>console.log('Error: ', err))

module.exports = mongoose;