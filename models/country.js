const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let countrySchema = new Schema({
    code: String,
    name: String,
    count: Number,
}, {
        timestamps: true
    })

module.exports = mongoose.model('Country', countrySchema);