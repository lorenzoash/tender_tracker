const awis = require('awis');
require('dotenv').config({ path: './../.env'});

const client = awis({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.SECRET_ACCESS_KEY
});

  module.exports = function topTen(countryCode){
    client({
        Action: 'TopSites',
        CountryCode: countryCode,
        Start: 1,
        Count: 10,
        ResponseGroup: 'Country',
      }, function (err, res) {
            if (err) console.log(err);  
            console.log('Response: ', JSON.stringify(res));
      });
  };