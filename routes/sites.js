let express = require('express');
let router = express.Router();
let request = ('request');

const rootURL = 'http://ws.geonames.org/countryCodeJSON?';

// req.body.lat & lng dont work, how to designate via click?

// router.get('/', function(req, res) {
//     request(
//         rootURL + 'lat=' + req.body.lat + '&lng=' + req.body.lng + '&username=process.env.GEO_USENAME' // how to make this work
//     )
// });

// pull countryCode from JSON and send to siteUtil client CountryCode