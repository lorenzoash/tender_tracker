const awis = require("awis");
require("dotenv").config();
const Country = require("../models/country");
const User = require("../models/user");

const client = awis({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.SECRET_ACCESS_KEY
});

function topTen(req, res) {
  console.log(req.body);
  client(
    {
      Action: "TopSites",
      CountryCode: req.body.countryCode,
      Start: 1,
      Count: 2,
      ResponseGroup: "Country"
    },
    function(err, apiRes) {
      if (err) console.log(err);
      console.log("Response: ", JSON.stringify(apiRes));
      res.json(apiRes).status(200);
    }
  );
}

function favorite(req, res) {
  //Check if country has a document
  Country.findOne({ code: req.body.code }).then(function(country) {
    if (!country) {
      Country.create(req.body).then(function(country) {
        req.user.favorites.push(country);
        req.user.save();
      });
    } else {
      country.count += 1;
      country.save();
      req.user.favorites.push(country);
      req.user.save();
    }
  });
  //Create a country document
  //Add this country to a user's favorites array
}

module.exports = {
  topTen,
  favorite
};
