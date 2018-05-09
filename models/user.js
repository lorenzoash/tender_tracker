const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    favorites: {
        type: [String]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);