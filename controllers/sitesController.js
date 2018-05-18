require('dotenv').config();
const Country = require('../models/country');
const User = require('../models/user');
const Data = require('../models/data');

function topTen(req, res) {
  Data.find({ countryCode: req.body.countryCode }).then(country =>
    res.status(200).json(country)
  );
}

function favorite(req, res) {
  Country.findOne({ code: req.body.code }).then(function(country) {
    if (!country) {
      Country.create(req.body).then(function(country) {
        req.user.favorites.push(country);
        req.user.save(function(err) {
          User.findById(req.user._id)
            .populate('favorites')
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
          .populate('favorites')
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
