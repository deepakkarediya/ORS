const express = require('express')
const connectToMongo=require('./dbconnect')
var cors = require('cors')
const app = express()
const port = 8989
connectToMongo();
app.use(express.json());
app.use(cors())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/student',require('./routes/student'));

app.listen(port, () => {
  console.log(`ORS app listening on port http://localhost:${port}`)
})