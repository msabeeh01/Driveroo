const express = require('express');
const router = express.Router();

const { signupStudent, signupInstructor, login } = require('../controllers/loginController')

const { getAllInstructors, getAllStudents } = require('../controllers/instructorsControllers');

// auth/*
router.post('/signupStudent', signupStudent);
router.post('/signupInstructor', signupInstructor);
router.get('/instructors', getAllInstructors); // get all instructors
router.get('/students', getAllStudents); // get all students
// login routes
router.post('/login', login);

module.exports = router;