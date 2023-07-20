const express = require('express');
const router = express.Router();

const { signupStudent, signupInstructor, login } = require('../controllers/loginController')

// auth/*
router.post('/signupStudent', signupStudent);
router.post('/signupInstructor', signupInstructor);

// login routes
router.post('/login', login);

module.exports = router;