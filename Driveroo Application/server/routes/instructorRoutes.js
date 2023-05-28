var express = require('express');
var router = express.Router();

const instructorsControllers = require('../controllers/instructorsControllers');

/* GET home page. */
router.get('/getInstructors', instructorsControllers.sendInstructors);

module.exports = router;
