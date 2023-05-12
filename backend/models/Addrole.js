const mongoose = require('mongoose');
const { Schema } = mongoose;
const addroleSchema = new Schema({
    //foreign key
    regis:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Regis'
    },
    rolename:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true 
    },
   
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('addrole', addroleSchema);