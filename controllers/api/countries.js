const Country = require('./../../models/country');

function countryAPI(req, res) {
  Country.find({}).then(function(countries) {
    res.json(countries.sort(function(countryOne, countryTwo){
      return countryTwo.count - countryOne.count;
    })).status(200);
  });
}

module.exports = { countryAPI };
