var express = require('express');
var router = express.Router();

const { findAllInstructors, createInstructor } = require('../controllers/instructorsControllers')

/* GET home page. */
router.get('/getInstructors', findAllInstructors);
router.post('/createInstructor', createInstructor);

module.exports = router;
