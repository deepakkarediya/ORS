const mongoose = require('mongoose');
const { Schema } = mongoose;
const addcollegeSchema = new Schema({
    //foreign key
    regis:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Regis'
    },
    collegename:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true 
    },
    city:{
        type: String,
        required: true
    },    
    state:{
        type: String,
        required: true
    },
    mobileno:{
        type: String,
        required: true
    },
       date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('addcollege', addcollegeSchema);