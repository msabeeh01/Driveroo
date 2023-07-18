const mongoose = require('../db/db');

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Test', TestSchema);