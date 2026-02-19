const mongoose = require('mongoose');

schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('UserData', schema);