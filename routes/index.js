const express = require('express');
const router = express.Router();
router.use('/weather', require('./weather'));
module.exports = router;
