var express = require("express");
var router = express.Router();
const sites = require("../controllers/sitesController");

/* GET users listing. */
router.post("/topTen", isLoggedIn, sites.topTen);
router.post("/favorites", isLoggedIn, sites.favorite);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
