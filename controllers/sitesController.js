const awis = require("awis");
require("dotenv").config();
const Country = require("../models/country");
const User = require("../models/user");

const client = awis({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.SECRET_ACCESS_KEY
});

function topTen(req, res) {
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
        req.user.save(function(err) {
          User.findById(req.user._id)
            .populate("favorites")
            .exec(function(err, user) {
              res.json(user).status(200);
            });
        });
      });
    } else {
      //if country exists in your fav list
      //if yes -> delete country from fav list and decrement count
      // if no -> want to add country to fav list to increment count

      let refExists = false;
      req.user.favorites.forEach(function(favoriteRef) {
        if (favoriteRef.equals(country._id)) {
          country.count -= 1;
          req.user.favorites.remove(favoriteRef);
          refExists = true;
        }
      });
      console.log(refExists);
      if (!refExists) {
        country.count += 1;
        req.user.favorites.push(country);
      }

      country.save();
      req.user.save(function(err) {
        User.findById(req.user._id)
          .populate("favorites")
          .exec(function(err, user) {
            res.json(user).status(200);
          });
      });
    }
  });
}

module.exports = {
  topTen,
  favorite
};
