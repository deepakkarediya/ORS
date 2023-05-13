const express = require('express')
const connectToMongo=require('./dbconnect')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const port = 8989
connectToMongo();
app.use(express.json());
app.use(cors())
app.use("/uploads",express.static('uploads'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/student',require('./routes/student'));
app.use('/api/marksheet',require('./routes/marksheet'));
app.use('/api/college',require('./routes/college'));
app.use('/api/role',require('./routes/role'));

app.listen(port, () => {
  console.log(`ORS app listening on port http://localhost:${port}`)
})