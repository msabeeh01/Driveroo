const { Instructor, Student, User } = require('../models/ModelOne');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get Instructor by ID
const getInstructorById = async (req, res) => {
  const { id } = req.params;

  try {
    const instructor = await Instructor.findById(id);

    if (!instructor) {
      return res.status(404).send({ message: 'Instructor not found' });
    }

    res.send({ name: instructor.name, email: instructor.email });
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

module.exports = {
  getInstructorById,
  getAllInstructors,
  getAllStudents,
};

/*const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();

    if (instructors.length === 0) {
      return res.status(404).json({ message: 'No instructors found' });
    }

    const allInstructors = instructors.map((instructor) => ({
      id: instructor._id,
      username: instructor.username,
      firstname: instructor.firstname,
      lastname: instructor.lastname,
      email: instructor.email,
    }));

    res.status(200).json({ instructors: allInstructors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

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
*/
