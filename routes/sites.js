var express = require('express');
var router = express.Router();
const sites = require('../controllers/sitesController')

/* GET users listing. */
router.post('/topTen', sites.topTen);

module.exports = router;
