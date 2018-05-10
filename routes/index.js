const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    User.findById(req.user._id)
      .populate('favorites')
      .exec(function(err, user) {
        res.render('index', { user: user });
      });
  } else {
    res.render('index', { user: req.user });
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
