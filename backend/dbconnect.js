const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/ORS-APP"

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{console.log("connected to mongodb")})
}
module.exports=connectToMongo;