const Country = require('./../../models/country');

function countryAPI(req, res) {
  Country.find({}).then(function(country) {
    res.json(country).status(200);
  });
}

module.exports = { countryAPI };
