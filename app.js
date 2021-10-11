const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path:'./Config/config.env'})
const app = express()
require('./startUp/routes')(app);
require('./startUp/db')()
require('./startUp/validation')()
require('./startUp/config')()


const port = process.env.PORT || process.env.PORT_NUMBER;
app.listen(port,()=>{
    console.log(`Your App Will Be Listening On The Given Port Number ${port}...`)
})