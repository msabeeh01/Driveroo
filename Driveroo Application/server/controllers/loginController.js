// controllers/InstructorController.js

const Instructor = require('../models/Instructor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Other controller functions...

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const instructor = await Instructor.findOne({ email });

        if (!instructor) {
            return res.status(404).send({ message: 'Instructor not found' });
        }

        const match = await bcrypt.compare(password, instructor.password);

        if (!match) {
            return res.status(401).send({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ _id: instructor._id, role: instructor.role }, 'YOUR_SECRET_KEY');

        res.send({ token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
