const express = require('express');
const router = express.Router();
const country = require('../controllers/api/countries');

router.get('/allCountries', country.countryAPI);

module.exports = router;
