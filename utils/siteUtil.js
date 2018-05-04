const awis = require('awis');
require('dotenv').config({ path: './../.env'});

const client = awis({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.SECRET_ACCESS_KEY
});

client({
    Action: 'TopSites',
    CountryCode: 'PE',
    Start: 1,
    Count: 100,
    ResponseGroup: 'Country'
  }, function (err, res) {
        if (err) console.log(err);  
        console.log('Response: ', JSON.stringify(res));
  });

