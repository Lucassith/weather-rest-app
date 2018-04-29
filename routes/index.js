var express = require('express');
var router = express.Router();
router.use('/weather', require('./weather'));
module.exports = router;
