const db = require('mongoose');
const model = db.Schema;

const userdataModel = new model({
    name: String,
    email: String,
    password: String
});

const userdata = db.model('Userdata', userdataModel);

module.exports = userdata;