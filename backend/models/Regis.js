const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegistrationSchema = new Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,

    },
    email: {
        type: String,

        unique: true
    },
    password: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now
    },
});
const Regis = mongoose.model('Regis', RegistrationSchema);
//user.createIndexes();// for not sending same data but its create index so it will remove further
module.exports = Regis;