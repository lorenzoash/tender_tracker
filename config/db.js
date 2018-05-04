const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION_URI);

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (err) => {
    console.error(`Database error: ${err}`);
});