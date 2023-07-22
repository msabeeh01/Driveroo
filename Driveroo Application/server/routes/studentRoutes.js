const express = require('express');
const router = express.Router();

const {makeNewRequest} = require('../controllers/studentController');

router.post('/newRequest', makeNewRequest)

module.exports = router;