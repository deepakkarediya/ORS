const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegistrationSchema = new Schema({
   fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
 const Regis = mongoose.model('Regis', RegistrationSchema);
//user.createIndexes();// for not sending same data but its create index so it will remove further
module.exports = Regis;