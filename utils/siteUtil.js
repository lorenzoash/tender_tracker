const awis = require('awis');
require('dotenv').config({ path: './../.env'});

const client = awis({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.SECRET_ACCESS_KEY
});



client({
    Action: 'TopSites',
    CountryCode: 'ZW', // insert lat+long data pulled and converted into country code here, need action for data input
    Start: 1,
    Count: 10,
    ResponseGroup: 'Country',
  }, function (err, res) {
        if (err) console.log(err);  
        console.log('Response: ', JSON.stringify(res));
  });

