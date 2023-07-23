const {getAllInstructors, getInstructorById, updateInstructor, getAllRequests} = require('../controllers/instructorsControllers');

const express = require('express');
const router = express.Router();

// /instructor/*
router.get('/instructors', getAllInstructors); // get all instructors
router.get('/getInstructor', getInstructorById); // get instructor by id')
router.get('/requests', getAllRequests )

router.put('/:token', updateInstructor); // update instructor by id

module.exports = router;