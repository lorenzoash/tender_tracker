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
      Count: 10,
      ResponseGroup: "Country"
    },
    function(err, apiRes) {
      if (err) console.log(err);
      res.json(apiRes).status(200);
    }
  );
}

function favorite(req, res) {
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
