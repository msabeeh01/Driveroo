const express = require('express');
const router = express.Router();

const { makeNewRequest, updateStudent, getStudentById } = require('../controllers/studentController');

router.get('/profile', getStudentById);
router.post('/newRequest', makeNewRequest)

router.put('/:id', updateStudent)

module.exports = router;
