const mongoose = require('mongoose')
module.exports = function(){
    mongoose.connect(process.env.DATABASE)
        .then(()=>{console.log("Database Connected to MongoDB...")})
        .catch(()=>{console.log("Error...! Database Not Connected...")})
}