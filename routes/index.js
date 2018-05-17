const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/user');

router.get('/', function(req, res, next) {
  if (req.user) {
    User.findById(req.user._id)
      .populate('favorites')
      .exec(function(err, user) {
        res.render('index', {
          user: user,
          favorites: JSON.stringify(user.favorites.map(fav => `${fav.code}`))
        });
      });
  } else {
    res.render('index', { user: req.user, favorites: false });
  }
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
