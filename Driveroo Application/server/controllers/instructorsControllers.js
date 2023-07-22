const { Instructor, Student, User } = require('../models/ModelOne');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get Instructor by ID
const getInstructorById = async (req, res) => {
  const { token } = req.params;
  const { _id } = await jwt.verify(token, process.env.JWTSECRET);

  try {
    const instructor = await User.findById(_id);

    if (!instructor) {
      return res.status(404).send({ message: 'Instructor not found' });
    }

    res.send({ instructor });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ isStudent: false }); //change to Instructor.find if not using isStudent

    if (instructors.length === 0) {
      return res.status(404).json({ message: 'No instructors found' });
    }

    const allInstructors = instructors.map((instructor) => ({
      id: instructor._id,
      username: instructor.username,
      firstname: instructor.firstname,
      lastname: instructor.lastname,
      email: instructor.email,
      biography: instructor.biography,
      hours: instructor.hours,
    }));

    res.status(200).json({ instructors: allInstructors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ isStudent: true }); //change to Student.find if not using isStudent

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    const allStudents = students.map((student) => ({
      id: student._id,
      username: student.username,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
    }));

    res.status(200).json({ students: allStudents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateInstructor = async (req, res) => {
  const { token } = req.params;
  const { _id } = await jwt.verify(token, process.env.JWTSECRET);
  const { username, firstname, lastname, email, biography } = req.body;

  try {
    const updatedInstructor = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          username: username || undefined,
          firstname: firstname || undefined,
          lastname: lastname || undefined,
          email: email || undefined,
          biography: biography || undefined,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedInstructor) {
      return res.status(404).send({ message: 'Instructor not found' });
    }

    res.send({ instructor: updatedInstructor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = {
  getInstructorById,
  getAllInstructors,
  getAllStudents,
  updateInstructor
};