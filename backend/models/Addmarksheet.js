const mongoose = require('mongoose');
const { Schema } = mongoose;
const addmarksheetSchema = new Schema({
    //foreign key
    regis:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Regis'
    },
    name:{
        type: String,
        required: true
    },
    rollno:{
        type: String,
        required: true
    },
    physics:{
        type: String,
        required: true 
    },
    chemistry:{
        type: String,
        required: true
    },
    
    maths:{
        type: String,
        required: true
    },
   
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('addmarksheet', addmarksheetSchema);