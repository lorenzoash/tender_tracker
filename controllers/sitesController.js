const awis = require('awis');
require('dotenv').config();

const client = awis({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.SECRET_ACCESS_KEY
});

function topTen(req, res) {
    console.log(req.body)
        client({
            Action: 'TopSites',
            CountryCode: req.body.countryCode,
            Start: 1,
            Count: 2,
            ResponseGroup: 'Country',
        }, function (err, apiRes) {
            if (err) console.log(err);
            console.log('Response: ', JSON.stringify(apiRes));
            res.json(apiRes).status(200)
        });
}

module.exports = {
    topTen
}