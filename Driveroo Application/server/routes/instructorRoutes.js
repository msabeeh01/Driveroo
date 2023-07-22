const {getAllInstructors, getInstructorById, updateInstructor} = require('../controllers/instructorsControllers');

const express = require('express');
const router = express.Router();

// /instructor/*
router.get('/instructors', getAllInstructors); // get all instructors
router.get('/:token', getInstructorById); // get instructor by id')

router.put('/:token', updateInstructor); // update instructor by id

module.exports = router;