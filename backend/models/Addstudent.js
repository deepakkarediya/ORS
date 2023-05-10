const mongoose = require('mongoose');
const { Schema } = mongoose;
const StudentSchema = new Schema({
    //foreign key
    regis:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Regis'
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true
    },
    
    mobileNo:{
        type: String,
        required: true
    },
    collegeId:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('student', StudentSchema);