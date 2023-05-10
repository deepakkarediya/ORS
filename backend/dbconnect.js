const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/ORS-APP"

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
}
module.exports=connectToMongo;